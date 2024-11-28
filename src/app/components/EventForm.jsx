// components/EventForm.js
"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    const eventData = {
      user_id: user.id, // Replace with actual user ID if needed (e.g., from authentication)
      title,
      description,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };

    try {
      const response = await fetch("/api/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }

      const result = await response.json();
      alert(`Event created: ${result.title}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <div className="mb-4 ">
            <label htmlFor="startDate" className="block text-gray-700">
              Start Date
            </label>
            <DatePicker
              id="startDate"
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
