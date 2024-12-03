import postgres from 'postgres';
import { NextResponse } from 'next/server';


export async function getEvents(userId) {
  try {
    // Connect to the PostgreSQL database using the Neon connection URL
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

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
