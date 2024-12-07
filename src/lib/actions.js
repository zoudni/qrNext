'use server';
import postgres from 'postgres';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { error } from 'console';


//sql connection  
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });


export async function createEvent(previousState, formData) {
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


    const [result] = await sql`
      INSERT INTO events (user_id, title, description, start_date, end_date, created_at, updated_at)
      VALUES (${userId}, ${title}, ${description}, ${start_date}, ${end_date}, NOW(), NOW())
      RETURNING id, title, description, start_date, end_date, created_at, updated_at
    `;

    console.log('SQL Insert Result:', result);

    revalidatePath("/Home/events");
    return {
      ...result,
      start_date: result.start_date.toISOString(),
      end_date: result.end_date.toISOString(),
      created_at: result.created_at.toISOString(),
      updated_at: result.updated_at.toISOString(),
    };
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw new Error('Failed to create event');
  }
}



export async function deleteEvent(previousState ,id) {

  try{ 

    await sql`DELETE FROM events WHERE id = ${id};`;
   
    revalidatePath("/Home/events");

  }catch(error){ 
    console.error("Error in Delete event: " , error); 
    throw new Error('Faild to delete event')
  }
  
}


export async function generateQrInfo( previousState, formData ) {

  const amount = formData.get("amount");
  const event_id = formData.get("event_id");

  console.log(amount + " " + event_id); 

  try{
    // Validate inputs
    if (!event_id || !amount || amount <= 0) {
       throw error({ error: 'Invalid input' }, { status: 400 });
    }
    // Insert multiple QR codes
    await sql`
      INSERT INTO qr_codes (event_id, code, active)
      SELECT 
        ${event_id}, 
        gen_random_uuid()::TEXT, 
        TRUE
      FROM 
        generate_series(1, ${amount});
    `;

    revalidatePath(`/Home/events/${event_id}`)

  }catch(error){ 
    console.error("Error in generating QR info: ", error); 
    throw new Error("Faild To Generate QR Info"); 
  }
}