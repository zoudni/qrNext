import postgres from 'postgres';
import { NextResponse } from 'next/server';

    // Connect to the PostgreSQL database using the Neon connection URL
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

export async function getEvents(userId) {
  try {

    // Query the events table to fetch all events
    const rows = await sql`
      SELECT id, user_id, title, description, start_date, end_date, created_at, updated_at
      FROM events
      WHERE user_id = ${userId} 
      ORDER BY start_date DESC
    `;
    console.log(rows); 
    return rows;
  }
    catch(error){ 
      console.error("Error fetching events:",error); 
      return NextResponse.json(error)
    }
}


export async function getQrInfo(event_id) {
  try {

    // Query the events table to fetch all events
    const rows = await sql`
      SELECT *
      FROM qr_codes
      WHERE event_id = ${event_id} 
      ORDER BY id DESC
    `;
    console.log(rows); 
    return rows;
  }
    catch(error){ 
      console.error("Error fetching qr info :",error); 
      return NextResponse.json(error)
    }
  }