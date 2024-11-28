import postgres from 'postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the event data from the request body
    const { title, description, start_date, end_date, user_id } = await request.json();

    // Connect to the PostgreSQL database using the Neon connection URL
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    // Insert the new event into the events table
    const result = await sql`
      INSERT INTO events (user_id, title, description, start_date, end_date, created_at, updated_at)
      VALUES (${user_id}, ${title}, ${description}, ${start_date}, ${end_date}, NOW(), NOW())
      RETURNING id, title, description, start_date, end_date, created_at, updated_at
    `;

    // Return the newly created event
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" });
  }
}
