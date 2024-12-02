'use server';
import postgres from 'postgres';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

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

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

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

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    await sql`DELETE FROM events WHERE id = ${id};`;
   
    revalidatePath("/Home/events");

  }catch(error){ 
    console.error("Error in Delete event: " , error); 
    throw new Error('Faild to delete event')
  }
  
}