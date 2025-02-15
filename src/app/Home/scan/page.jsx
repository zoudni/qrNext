"use client";
import { useState } from "react";
import QrScanner from "../../components/QrScanner";

export default function ScanPage() {
  const [loading, setLoading] = useState(false);

  const handleQrCodeRead = () => {
    setLoading(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <QrScanner onRead={handleQrCodeRead} setLoading={setLoading} />
      )}
    </div>
  );
}
