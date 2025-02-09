"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function QrScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [validationStatus, setValidationStatus] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: window.innerWidth < 600 ? 200 : 250,
        height: window.innerWidth < 600 ? 200 : 250,
      },
      fps: 5,
    });

    async function onScanSuccess(decodedText) {
      setIsScanning(false);
      scanner.pause();

      try {
        const url = new URL(decodedText);
        const token = url.searchParams.get('token');

        if (!token) {
          setValidationStatus({
            success: false,
            message: "Invalid QR code format",
          });
          return;
        }

        const response = await fetch(`/api/qr/validate?token=${token}`);
        const data = await response.json();

        setValidationStatus({
          success: data.valid,
          message: data.message,
        });
      } catch (error) {
        setValidationStatus({
          success: false,
          message: "Error validating QR code",
        });
      }
    }

    scanner.render(onScanSuccess, (error) => {
      console.warn("QR scanning error:", error);
    });

    return () => {
      scanner.clear();
    };
  }, []);

  const resetScanner = () => {
    setIsScanning(true);
    setValidationStatus(null);
    setScanResult(null);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        {validationStatus && (
          <div
            className={`flex items-center p-4 rounded-lg ${
              validationStatus.success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {validationStatus.success ? (
              <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            ) : (
              <XCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            )}
            <span className="ml-2 text-sm sm:text-base">{validationStatus.message}</span>
          </div>
        )}
      </div>

      <div id="reader" className="w-full max-w-full overflow-hidden rounded-lg"></div>

      {!isScanning && (
        <button
          onClick={resetScanner}
          className="mt-4 w-full bg-blue-500 text-white p-2 sm:p-3 rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          Scan Another Code
        </button>
      )}
    </div>
  );
}
