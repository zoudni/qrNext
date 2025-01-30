"use client";

export default function QrCodeModal({ isOpen, onClose, qrImage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Generated QR Code</h2>
        <img src={qrImage} alt="QR Code" className="mb-4" />
        <button
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
