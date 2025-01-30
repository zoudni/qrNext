import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Pool } from 'pg';

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const DATABASE_URL = process.env.DATABASE_URL;

  // Ensure the required environment variables are present
  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  if (!DATABASE_URL) {
    throw new Error('Error: Please add DATABASE_URL to .env or .env.local');
  }

  // Create a new Pool instance for PostgreSQL
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Add this if your database requires SSL
  });

  // Create a new Svix instance with the secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers from the request
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If headers are missing, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get the request payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify the webhook payload
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Handle the event
  const { id, email_addresses, first_name, last_name } = evt.data; // Adjust based on the structure of the Clerk webhook payload
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const userId = id; // Clerk's user ID
    const email = email_addresses[0]?.email_address; // First email address

    try {
      // Insert the new user into the database using parameterized query
      const client = await pool.connect();
      try {
        await client.query(
          `
          INSERT INTO users (user_id, email)
          VALUES ($1, $2)
          ON CONFLICT (user_id) DO NOTHING
          `,
          [userId, email]
        );
        console.log(`New user added with ID: ${userId}`);
      } catch (error) {
        console.error('Error inserting new user:', error);
        return new Response('Error inserting new user', { status: 500 });
      } finally {
        client.release(); // Release the connection back to the pool
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
      return new Response('Error connecting to the database', { status: 500 });
    }
  }

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  return new Response('Webhook received', { status: 200 });
}
