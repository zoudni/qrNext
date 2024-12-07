import postgres from 'postgres';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  const { userId } = await auth();

  // If user is not signed in, redirect
  if (!userId) {
    return NextResponse.redirect('http://localhost:3000/?redirect=qr/validate');
  }
  // Validate the QR code and retrieve the associated event and user_id
  const [qrCode] = await sql`
    SELECT qr.code, qr.active, e.user_id
    FROM qr_codes qr
    JOIN events e ON e.id = qr.event_id
    WHERE qr.code = ${token} AND qr.active = TRUE;
  `;

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
}
