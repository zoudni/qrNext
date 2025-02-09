import { getEvents } from "../../lib/data.js";
import { auth } from "@clerk/nextjs/server";
import DeleteButton from "./DeleteButton.jsx";
import Link from "next/link.js";

export default async function EventTable() {
  const { userId } = await auth();
  const events = await getEvents(userId);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Event Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">
                  End Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    <Link 
                      href={`/Home/events/${event.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {event.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                    {event.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(event.start_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                    {formatDate(event.end_date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton id={event.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          No events available.
        </div>
      )}
    </div>
  );
}
