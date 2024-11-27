import React from "react";
import { jsPDF } from "jspdf";

const DownloadPdf = ({ lastGeneratedUser, src}) => {

  const downloadPDF = () => {
    if (!lastGeneratedUser ) {
      console.error("Missing data or QR code for PDF generation.");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("User QR Code", 10, 10); // Add title
    pdf.addImage(src, "PNG", 10, 20, 80, 80); // Add QR code image to the PDF
    pdf.text(`Name: ${lastGeneratedUser.name}`, 10, 110); // Add user name
    pdf.text(`Surname: ${lastGeneratedUser.surname}`, 10, 120); // Add user surname
    pdf.save("QRCode.pdf"); // Download PDF
  };


  return (
    <>
      <button
        type="button"
        className="bg-green-500 rounded-lg p-4 font-bold text-slate-100"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </>
  );
};

export default DownloadPdf;
