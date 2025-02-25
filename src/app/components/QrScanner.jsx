"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import './styles/scanner.css';
export default function QrScanner({ onRead }) {
  const [validationStatus, setValidationStatus] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 150, height: 150 },
      fps: 5,
      rememberLastUsedCamera: false,
      cameraId: "back-camera",
      videoConstraints: { facingMode: { exact: "environment" } },
    });

    async function onScanSuccess(decodedText) {
      setIsScanning(false);
      scanner.pause();
    
      const url = new URL(decodedText);
      const token = url.searchParams.get('token');
    
      try {
        console.log("Fetching validation for token:", token);
    
        const response = await fetch(`/api/qr/validate?token=${token}`, {
          headers: {
            'Accept': 'application/json', // Explicitly request JSON response
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
      //  console.log("API Response:", data);
    
        setValidationStatus({
          success: data.valid,
          message: data.message,
        });
      } catch (error) {
        console.error("Error during fetch:", error);
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
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        {validationStatus && (
          <div
            className={`flex items-center p-4 rounded-lg ${
              validationStatus.success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {validationStatus.success ? (
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            ) : (
              <XCircleIcon className="h-8 w-8 text-red-500" />
            )}
            <span className="ml-2">{validationStatus.message}</span>
          </div>
        )}
      </div>

      <div id="reader" className="w-full"></div>

      {!isScanning && (
        <button
          onClick={resetScanner}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Scan Another Code
        </button>
      )}
    </div>
  );
}
