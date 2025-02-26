import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Handle GET request for QR validation
export async function GET(request) {
  const client = await pool.connect();
  const headersList = await headers();
  const isApiRequest = headersList.get('accept')?.includes('application/json');

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    const { userId } = await auth();
    if (!userId) {
      return isApiRequest 
        ? NextResponse.json({ valid: false, message: 'Please sign in to validate QR codes' })
        : NextResponse.redirect(new URL(`/scan?token=${token}`, request.url));
    }

    const result = await client.query(`
      SELECT qr.event_id, qr.code, qr.active, qr.id, e.user_id
      FROM qr_codes qr
      JOIN events e ON e.id = qr.event_id
      WHERE qr.code = $1;
    `, [token]);

    const qrCode = result.rows[0];

    if (!qrCode) {
      return isApiRequest 
        ? NextResponse.json({ valid: false, message: 'Invalid QR code' })
        : NextResponse.redirect(new URL('/scan/result?status=error&message=Invalid QR code', request.url));
    }

    if (qrCode.user_id !== userId) {
      return isApiRequest 
        ? NextResponse.json({ valid: false, message: 'Unauthorized access' })
        : NextResponse.redirect(new URL('/scan/result?status=error&message=You are not authorized to validate this QR code', request.url));
    }

    if (!qrCode.active) {
      return isApiRequest 
        ? NextResponse.json({ valid: false, message: 'This QR code has already been used' })
        : NextResponse.redirect(new URL('/scan/result?status=error&message=This QR code has already been used', request.url));
    }

    // Deactivate the QR code
    await client.query(`UPDATE qr_codes SET active = FALSE WHERE id = $1`, [qrCode.id]);

    return isApiRequest 
      ? NextResponse.json({ valid: true, message: 'QR code validated successfully' })
      : NextResponse.redirect(new URL('/scan/result?status=success&message=QR code validated successfully', request.url));

  } catch (error) {
    console.error('Validation error:', error);
    return isApiRequest 
      ? NextResponse.json({ valid: false, message: 'An error occurred while validating' })
      : NextResponse.redirect(new URL('/scan/result?status=error&message=An error occurred while validating', request.url));
  } finally {
    client.release();
  }
}
