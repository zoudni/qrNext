"use client";

import { useActionState, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../../../lib/actions.js";

export default function EventForm() {
  const [state, FormAction, isPending] = useActionState(createEvent, null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow-md ">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        {"Create a New Event"}
      </h2>
      <form action={FormAction} className="mb-6">
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <DatePicker
              id="startDate"
              name="start_date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              wrapperClassName="w-full"
              calendarClassName="z-10"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Date
            </label>
            <DatePicker
              id="endDate"
              name="end_date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              wrapperClassName="w-full"
              calendarClassName="z-10"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-lg transition-all duration-200 ${
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          }`}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
