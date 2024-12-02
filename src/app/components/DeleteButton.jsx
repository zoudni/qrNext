"use client";

import { useActionState } from "react";
import { deleteEvent } from "../../lib/actions";

export default function DeleteButton({ id }) {
  const [error, action, isPending] = useActionState(deleteEvent, null);

  return (
    <button
      className="font-medium text-red-600 dark:text-red-500 hover:underline"
      onClick={() =>{ 
        action(id);
      }}
    >
      Delete
    </button>
  );
}
