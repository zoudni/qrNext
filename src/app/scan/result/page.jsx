export default function ValidationResultPage({ searchParams }) {
  const { status, message } = searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">QR Code Validation Result</h1>
        <div
          className={`p-4 rounded-lg ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
