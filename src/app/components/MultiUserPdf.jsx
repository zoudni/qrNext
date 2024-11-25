import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";


const MultiUserPdf = ({user}) => {


  const downloadMultiUserPDF = () => {
    if (user.length === 0) {
      console.error("No users available to generate PDF.");
      return;
    }

    const pdf = new jsPDF();

    user.forEach((currentUser, index) => {
      // Generate a QR code for the current user
      const text = JSON.stringify(currentUser);
      QRCode.toDataURL(text)
        .then((url) => {
          if (index !== 0) {
            pdf.addPage(); // Add a new page for all but the first user
          }

          pdf.setFontSize(16);
          pdf.text("User QR Code", 10, 10); // Add title
          pdf.addImage(url, "PNG", 10, 20, 80, 80); // Add QR code image to the PDF
          pdf.text(`Name: ${currentUser.name}`, 10, 110); // Add user name
          pdf.text(`Surname: ${currentUser.surname}`, 10, 120); // Add user surname

          // Check if this is the last user and save the PDF
          if (index === user.length - 1) {
            pdf.save("UsersQRCode.pdf"); // Save the PDF file
          }
        })
        .catch((err) =>
          console.error(
            `Error generating QR Code for ${currentUser.name}:`,
            err
          )
        );
    });
  };
  return (
    <>
      <button
        type="button"
        className="bg-purple-500 rounded-lg p-4 font-bold text-slate-100 mt-3 "
        onClick={downloadMultiUserPDF}
      >
        Download Multi-User PDF
      </button>
    </>
  );
};

export default MultiUserPdf;
