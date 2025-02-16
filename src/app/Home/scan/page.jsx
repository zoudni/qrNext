"use client";
import { useState } from "react";
import QrScanner from "../../components/QrScanner";

export default function ScanPage() {
  const [loading, setLoading] = useState(false);

  const handleQrCodeRead = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">QR Code Scanner</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
          <p className="text-lg">Processing QR Code...</p>
        </div>
      ) : (
        <QrScanner onRead={handleQrCodeRead} setLoading={setLoading} />
      )}
    </div>
  );
}
