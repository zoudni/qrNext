"use client";

import { useState } from "react";
import QrCodeModal from "../QrCodeModal";
import QRCode from "qrcode";

export default function GenerateSingleCodeBtn({ token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrImage, setQrImage] = useState("");

  async function generateQRCode(token) {
    try {
      const link = `http://localhost:3000/api/qr/validate?token=${token}`;
      const qrCodeImage = await QRCode.toDataURL(link);
      return qrCodeImage;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  }

  async function handleClick() {
    const qrCodeImage = await generateQRCode(token);
    if (qrCodeImage) {
      setQrImage(qrCodeImage);
      setIsModalOpen(true);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="underline text-blue-300 hover:text-blue-100"
      >
        Generate Code
      </button>
      <QrCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrImage={qrImage}
      />
    </>
  );
}
