
import { getQrInfo } from "../../lib/data.js";
import GenerateSingleCodeBtn from "../components/buttons/GenerateSingleCode.jsx"
export default async function QrInfo({event_id, setQRLink}) {
  const QrInfo = await getQrInfo(event_id);
  
  return (
    <div>
      {QrInfo.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Event ID 
                </th>
                <th scope="col" className="px-6 py-3">
                  QR Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Activity
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {QrInfo.map((QrInfo) => (
                <tr
                  key={QrInfo.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {QrInfo.event_id}
                  </th>
                  <td className="px-6 py-4">{QrInfo.code}</td>
                  <td className="px-6 py-4">{QrInfo.active ? <div className="bg-green-400 w-5 h-5 rounded-full"></div> : <div className="bg-red-600 w-5 h-5 rounded-full"></div>}</td>
                  <td className="px-6 py-4">
                    <GenerateSingleCodeBtn token={QrInfo.code} setQRLink={setQRLink}/>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No QrInfos available.</p>
      )}
    </div>
  );
}
