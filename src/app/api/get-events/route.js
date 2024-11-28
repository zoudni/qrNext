// app/api/get-events/route.js

import postgres from 'postgres';

export async function GET() {
  try {
    // Connect to the PostgreSQL database using the Neon connection URL
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    // Query the events table to fetch all events
    const rows = await sql`
      SELECT id, user_id, title, description, start_date, end_date, created_at, updated_at
      FROM events
      ORDER BY start_date DESC
    `;

    // Return the rows as a JSON response
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching events:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Failed to fetch events', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
