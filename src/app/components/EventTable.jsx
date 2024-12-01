import { getEvents } from "../../lib/data.js";
import { auth } from '@clerk/nextjs/server'
export default async function EventTable() {

  const { userId } = await auth();   
  const events = await getEvents(userId); 
    // Function to format the date to a readable format
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      return formattedDate.toDateString(); // Format as per your needs (e.g., "MM/DD/YYYY")
    };
  return (
    <div>
      {events.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Event Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Starting Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Ending Date
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {event.title}
                  </th>
                  <td className="px-6 py-4">{event.description}</td>
                  <td className="px-6 py-4">{formatDate(event.start_date)}</td> {/* Format start date */}
                  <td className="px-6 py-4">{formatDate(event.end_date)}</td> {/* Format end date */}
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}
