import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";

const Scanner = () => {
  const expectedData = {
    id: "1732314326976",
    name: "zain",
    surname: "kara",
  };

  const [scannedData, setScannedData] = useState(null); // Holds parsed QR data
  const [scannerInstance, setScannerInstance] = useState(null); // Holds scanner instance

  useEffect(() => {
    // Initialize the scanner
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    // Render the scanner with success and error handlers
    scanner.render(onSuccess, onError);

    // Store scanner instance in state
    setScannerInstance(scanner);

    return () => {
      // Clean up scanner instance when the component unmounts
      scanner.clear();
    };

    function onSuccess(decodedText) {
      try {
        // Parse the scanned text as JSON
        const parsedData = JSON.parse(decodedText);

        // Validate the data and update state
        setScannedData(parsedData);

        // Optionally, clear the scanner after success
        scanner.clear();
      } catch (err) {
        console.error("Error parsing QR code:", err);
      }
    }

    function onError(err) {
      console.warn("QR scanning error:", err);
    }
  }, []);

  return (
    <div className="p-4">
      {/* If scanned data matches expected data, show success */}
      {scannedData && scannedData.id === expectedData.id ? (
        <div className="text-green-500 font-bold">
          Success:
          <p>ID: {scannedData.id}</p>
          <p>Name: {scannedData.name}</p>
          <p>Surname: {scannedData.surname}</p>
        </div>
      ) : (
        // Otherwise, show the scanner
        <div id="reader" className="w-full"></div>
      )}
    </div>
  );
};

export default Scanner;
