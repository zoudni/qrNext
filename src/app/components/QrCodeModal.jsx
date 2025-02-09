"use client";

export default function QrCodeModal({ isOpen, onClose, qrImage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Generated QR Code</h2>
        <div className="flex justify-center">
          <img 
            src={qrImage} 
            alt="QR Code" 
            className="mb-4 w-full max-w-[250px] sm:max-w-[300px]" 
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
