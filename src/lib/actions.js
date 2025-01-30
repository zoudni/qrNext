'use server';

import { Pool } from 'pg';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Function to create an event
export async function createEvent(previousState, formData) {
  const client = await pool.connect();
  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const start_date_raw = formData.get('start_date');
    const end_date_raw = formData.get('end_date');
    const { userId } = await auth();

    console.log('Received Data:', { title, description, start_date_raw, end_date_raw, userId });

    if (!title || !description || !start_date_raw || !end_date_raw || !userId) {
      throw new Error('Missing required fields');
    }

    const start_date = new Date(start_date_raw);
    const end_date = new Date(end_date_raw);

    if (isNaN(start_date) || isNaN(end_date)) {
      throw new Error('Invalid date format');
    }

    const result = await client.query(
      `
      INSERT INTO events (user_id, title, description, start_date, end_date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, title, description, start_date, end_date, created_at, updated_at
      `,
      [userId, title, description, start_date, end_date]
    );

    console.log('SQL Insert Result:', result.rows[0]);

    revalidatePath("/Home/events");

    return {
      ...result.rows[0],
      start_date: result.rows[0].start_date.toISOString(),
      end_date: result.rows[0].end_date.toISOString(),
      created_at: result.rows[0].created_at.toISOString(),
      updated_at: result.rows[0].updated_at.toISOString(),
    };
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw new Error('Failed to create event');
  } finally {
    client.release();
  }
}

// Function to delete an event
export async function deleteEvent(previousState, id) {
  const client = await pool.connect();
  try {
    await client.query(`DELETE FROM events WHERE id = $1`, [id]);
    revalidatePath("/Home/events");
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    throw new Error('Failed to delete event');
  } finally {
    client.release();
  }
}

// Function to generate QR codes
export async function generateQrInfo(previousState, formData) {
  const client = await pool.connect();
  try {
    const amount = parseInt(formData.get("amount"), 10);
    const event_id = formData.get("event_id");

    console.log(`Generating ${amount} QR codes for event ID: ${event_id}`);

    if (!event_id || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid input');
    }

    await client.query(
      `
      INSERT INTO qr_codes (event_id, code, active)
      SELECT $1, gen_random_uuid()::TEXT, TRUE
      FROM generate_series(1, $2)
      `,
      [event_id, amount]
    );

    revalidatePath(`/Home/events/${event_id}`);
  } catch (error) {
    console.error("Error in generating QR info:", error);
    throw new Error("Failed to generate QR Info");
  } finally {
    client.release();
  }
}
