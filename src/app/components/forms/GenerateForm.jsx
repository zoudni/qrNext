"use client";
import { useActionState } from "react";
import { generateQrInfo } from "../../../lib/actions.js";
import { useParams } from "next/navigation";

export default function   GenerateForm() {
  let { event_id } = useParams();

  const [data, Generate, isPending] = useActionState(generateQrInfo, null);

  return (
    <div className="w-96">
    <form action={Generate}>
      <input type="hidden" name="event_id" value={event_id} />

      <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">
            Amount of QR codes:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      
      <button
        type="submit"
        className={
          isPending
            ? `w-full bg-blue-500 text-white p-2 rounded opacity-50 cursor-not-allowed`
            : `w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600`
        }
        disabled={isPending}
      >
        Generate
      </button>
    </form>

    </div>
  );
}
