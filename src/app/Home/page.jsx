"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchEvents } from "../../lib/data.js";

export default function Home() {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/Home`);
      return;
    }

    if (isSignedIn) {
      fetchEvents()
        .then((data) => setEvents(data))
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
      <h1>This is the Home Page</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}
