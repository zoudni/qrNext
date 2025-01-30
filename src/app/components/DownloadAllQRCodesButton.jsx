"use client";

import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function DownloadAllQRCodesButton({ qrInfos }) {
  const downloadAllQRCodes = async () => {
    if (qrInfos.length === 0) {
      console.error("No QR codes available to generate PDF.");
      return;
    }

    const pdf = new jsPDF();

    for (let i = 0; i < qrInfos.length; i++) {
      const qrInfo = qrInfos[i];
      const qrCodeImage = await QRCode.toDataURL(qrInfo.code);

      if (i !== 0) {
        pdf.addPage();
      }

      pdf.setFontSize(16);
      pdf.text(`QR Code for Event ID: ${qrInfo.event_id}`, 10, 10);
      pdf.addImage(qrCodeImage, "PNG", 10, 20, 80, 80);
    }

    pdf.save("AllQRCodes.pdf");
  };

  return (
    <button
      onClick={downloadAllQRCodes}
      className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      Download All QR Codes as PDF
    </button>
  );
}
