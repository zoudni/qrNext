"use server";

import { getAllQR, getQrInfo } from "../../lib/data.js";
import GenerateSingleCodeBtn from "./buttons/GenerateSingleCode.jsx";
import DownloadAllQRCodesButton from "./DownloadAllQRCodesButton";
import Pagination from "./pagination";

export default async function QrInfo({ event_id, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  const { data: QrInfo, total } = await getQrInfo(event_id, limit, offset);
  const allQR = await getAllQR(event_id); 
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {QrInfo.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <DownloadAllQRCodesButton qrInfos={allQR} />

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Event ID</th>
                <th scope="col" className="px-6 py-3">QR Code</th>
                <th scope="col" className="px-6 py-3">Activity</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {QrInfo.map((qrInfo) => (
                <tr
                  key={qrInfo.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {qrInfo.event_id}
                  </th>
                  <td className="px-6 py-4">{qrInfo.code}</td>
                  <td className="px-6 py-4">
                    {qrInfo.active ? (
                      <div className="bg-green-400 w-5 h-5 rounded-full"></div>
                    ) : (
                      <div className="bg-red-600 w-5 h-5 rounded-full"></div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <GenerateSingleCodeBtn token={qrInfo.code} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      ) : (
        <p>No QrInfos available.</p>
      )}
    </div>
  );
}
