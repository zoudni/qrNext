import QrScanner from "../../components/QrScanner";

export default function ScanPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
      <QrScanner />
    </div>
  );
}
