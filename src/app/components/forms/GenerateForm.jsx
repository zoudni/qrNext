'use client'
import { useActionState } from "react";
import { generateQrInfo } from "../../../lib/actions.js";
import { useParams } from "next/navigation";


export default function GenerateForm(){ 

    let { event_id } = useParams(); 

    const [data, action, isPending] = useActionState(generateQrInfo, null);
    const generateWithId = action.bind(event_id); 

    return(
           <form action={generateWithId}>
          <label htmlFor="amount">Amount of QR codes:</label>
          <input type="hidden" name="event_id" value={event_id} />
          <input type="number" id="amount" name="amount" />
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
    ); 
}