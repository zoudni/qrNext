import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Function to fetch events for a user
export async function getEvents(userId) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT id, user_id, title, description, start_date, end_date, created_at, updated_at
      FROM events
      WHERE user_id = $1
      ORDER BY start_date DESC
      `,
      [userId]
    );

 //   console.log("Fetched Events:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function getQrInfo(event_id, limit = 10, offset = 0) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT *
      FROM qr_codes
      WHERE event_id = $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3
      `,
      [event_id, limit, offset]
    );

    const totalResult = await client.query(
      `
      SELECT COUNT(*) FROM qr_codes WHERE event_id = $1
      `,
      [event_id]
    );

    return {
      data: result.rows,
      total: parseInt(totalResult.rows[0].count, 10), // Get total number of records
    };
  } catch (error) {
    console.error("Error fetching QR info:", error);
    return { data: [], total: 0 };
  } finally {
    client.release();
  }
}



// Function to fetch QR info for an event
export async function getAllQR(event_id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT *
      FROM qr_codes
      WHERE event_id = $1
      ORDER BY id DESC
      `,
      [event_id]
    );

    console.log("Fetched QR Codes:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching QR info:", error);
    return NextResponse.json({ error: "Failed to fetch QR info" }, { status: 500 });
  } finally {
    client.release();
  }
}
