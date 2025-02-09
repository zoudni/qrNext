import QrScanner from "../../components/QrScanner";

export default function ScanPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
        QR Code Scanner
      </h1>
      <div className="max-w-xl mx-auto">
        <QrScanner />
      </div>
    </div>
  );
}
