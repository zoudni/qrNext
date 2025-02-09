// import postgres from 'postgres';
import { Pool } from 'pg'; 
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';


const pool = new Pool ({ 
  connectionString: process.env.DATABASE_URL,
  ssl:{rejectUnauthorized: false}
}); 

export async function GET(request) {
  const client = await pool.connect();

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({
        valid: false,
        message: 'Please sign in to validate QR codes'
      });
    }

    const result = await client.query(`
      SELECT qr.code, qr.active, qr.id, e.user_id
      FROM qr_codes qr
      JOIN events e ON e.id = qr.event_id
      WHERE qr.code = $1;
    `, [token]);

    const qrCode = result.rows[0];

    if (!qrCode) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid QR code'
      });
    }

    if (qrCode.user_id !== userId) {
      return NextResponse.json({
        valid: false,
        message: 'Unauthorized access'
      });
    }

    if (!qrCode.active) {
      return NextResponse.json({
        valid: false,
        message: 'This QR code has already been used'
      });
    }

    // Deactivate the QR code
    await client.query(`
      UPDATE qr_codes 
      SET active = FALSE 
      WHERE id = $1
    `, [qrCode.id]);

    return NextResponse.json({
      valid: true,
      message: 'QR code validated successfully'
    });
  } catch(error) {
    return NextResponse.json({
      valid: false,
      message: 'An error occurred while validating'
    });
  } finally {
    client.release();
  }
}
