"use client";

import { useActionState, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from '../../lib/actions.js'
export default function EventForm() {

  const [state, FormAction, isPending] = useActionState(createEvent, null); 
  const [startDate , setStartDate] = useState(); 
  const [endDate , setEndDate] = useState(); 

  return (
    <div className="max-w-xl p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Create a New Event</h2>
      <form action={FormAction}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            name="description"
            required
          />
        </div>

        <div className="flex justify-between">
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700">
              Start Date
            </label>
            <DatePicker
              id="startDate"
              name="start_date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700">
              End Date
            </label>
            <DatePicker
              id="endDate"
              name="end_date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={isPending ?  `w-full bg-blue-500 text-white p-2 rounded opacity-50 cursor-not-allowed`: `w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600`}
            disabled={isPending}
          >
            Create Event
          </button>
        </div>
      </form>



    </div>
  );
}
