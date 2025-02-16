// import postgres from 'postgres';
import { Pool } from 'pg'; 
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';

const pool = new Pool ({ 
  connectionString: process.env.DATABASE_URL,
  ssl:{rejectUnauthorized: false}
}); 

export async function GET(request) {
  const client = await pool.connect();
  const headersList = headers();
  const isApiRequest = headersList.get('accept')?.includes('application/json');

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    const { userId } = await auth();

    if (!userId) {
      // For API requests (from QR scanner)
      if (isApiRequest) {
        return NextResponse.json({
          valid: false,
          message: 'Please sign in to validate QR codes'
        });
      }
      // For direct URL access
      return NextResponse.redirect(
        new URL(`/scan?token=${token}`, request.url)
      );
    }

    const result = await client.query(`
      SELECT qr.code, qr.active, qr.id, e.user_id
      FROM qr_codes qr
      JOIN events e ON e.id = qr.event_id
      WHERE qr.code = $1;
    `, [token]);

    const qrCode = result.rows[0];

    if (!qrCode) {
      if (isApiRequest) {
        return NextResponse.json({
          valid: false,
          message: 'Invalid QR code'
        });
      }
      return NextResponse.redirect(
        new URL('/scan/result?status=error&message=Invalid QR code', request.url)
      );
    }

    if (qrCode.user_id !== userId) {
      if (isApiRequest) {
        return NextResponse.json({
          valid: false,
          message: 'Unauthorized access'
        });
      }
      return NextResponse.redirect(
        new URL('/scan/result?status=error&message=You are not authorized to validate this QR code', request.url)
      );
    }

    if (!qrCode.active) {
      if (isApiRequest) {
        return NextResponse.json({
          valid: false,
          message: 'This QR code has already been used'
        });
      }
      return NextResponse.redirect(
        new URL('/scan/result?status=error&message=This QR code has already been used', request.url)
      );
    }

    // Deactivate the QR code
    await client.query(`
      UPDATE qr_codes 
      SET active = FALSE 
      WHERE id = $1
    `, [qrCode.id]);

    console.log("User ID:", userId); // Check if user ID is retrieved
    console.log("Token:", token); // Check if token is retrieved
    console.log("QR Code Result:", qrCode); // Check if QR code is found

    if (isApiRequest) {
      return NextResponse.json({
        valid: true,
        message: 'QR code validated successfully'
      });
    }
    return NextResponse.redirect(
      new URL('/scan/result?status=success&message=QR code validated successfully', request.url)
    );

  } catch(error) {
    console.error('Validation error:', error);
    if (isApiRequest) {
      return NextResponse.json({
        valid: false,
        message: 'An error occurred while validating'
      });
    }
    return NextResponse.redirect(
      new URL('/scan/result?status=error&message=An error occurred while validating', request.url)
    );
  } finally {
    client.release();
  }
}
