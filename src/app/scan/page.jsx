export default function ScanPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
        QR Code Scanner
      </h1>
      <p className="text-lg text-center mb-8">
        To validate QR codes, you need to be a registered user of our platform.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="/sign-up"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </a>
        <a
          href="/sign-in"
          className="bg-gray-100 text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
