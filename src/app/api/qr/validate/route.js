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
  
    // If user is not signed in, redirect
    if (!userId) {
      return NextResponse.redirect(new URL('/?redirect=qr/validate', request.url));
    }
    // Validate the QR code and retrieve the associated event and user_id
    const result = await client.query(`
      SELECT qr.code, qr.active, e.user_id
      FROM qr_codes qr
      JOIN events e ON e.id = qr.event_id
      WHERE qr.code = $1 AND qr.active = TRUE;
    `, [token]);

    const qrCode = result.rows[0]; 
  
    if (!qrCode) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired QR code.' },
        { status: 400 }
      );
    }
  
    // Check if the signed-in user is the event owner
    if (qrCode.user_id !== userId) {
      return NextResponse.json(
        { valid: false, message: 'Unauthorized access. This event is not yours.' },
        { status: 403 }
      );
    }
  
    // If valid and user owns the event, proceed
    return NextResponse.json({ valid: true, message: 'QR code validated successfully.' });
  } catch(error) {

    return NextResponse.json({error:"internal server error"}, { status: 500}); 
  } finally{ 
    client.release(); 

  }


}
