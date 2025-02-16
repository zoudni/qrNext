"use client";

import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function DownloadAllQRCodesButton({ qrInfos, spacing = 30 }) {
  const downloadAllQRCodes = async () => {
    if (qrInfos.length === 0) {
      console.error("No QR codes available to generate PDF.");
      return;
    }

    const pdf = new jsPDF();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const qrCodeSize = 25;
    const startX = 10;
    const startY = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < qrInfos.length; i++) {
      const qrInfo = qrInfos[i];
      const link = `${baseUrl}/api/qr/validate?token=${qrInfo.code}`;
      const qrCodeImage = await QRCode.toDataURL(link);

      pdf.setFontSize(10);
      // pdf.text(
      //   `QR Code for Event ID: ${qrInfo.event_id}`,
      //   currentX,
      //   currentY - 5
      // );

      pdf.addImage(
        qrCodeImage,
        "PNG",
        currentX,
        currentY,
        qrCodeSize,
        qrCodeSize
      );

      currentX += qrCodeSize + spacing;

      if (currentX + qrCodeSize > pageWidth) {
        currentX = startX;
        currentY += qrCodeSize + spacing;
      }

      if (currentY + qrCodeSize > pageHeight) {
        pdf.addPage();
        currentX = startX;
        currentY = startY;
      }
    }

    pdf.save("AllQRCodes.pdf");
  };

  return (
    <button
      onClick={downloadAllQRCodes}
      className="my-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      Download All QR Codes as PDF
    </button>
  );
}
