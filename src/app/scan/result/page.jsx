"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function ValidationResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const token = searchParams.get("token");

  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn && token) {
      router.push("/scan");
    }
  }, [isLoaded, isSignedIn, token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">QR Code Validation Result</h1>
        <div
          className={`flex items-center p-4 rounded-lg ${
            status === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {status === "success" ? (
            <CheckCircleIcon className="h-8 w-8 text-green-500 flex-shrink-0" />
          ) : (
            <XCircleIcon className="h-8 w-8 text-red-500 flex-shrink-0" />
          )}
          <span
            className={`ml-3 ${
              status === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </span>
        </div>

        {status === "success" && (
          <button
            onClick={() => router.push("/Home/scan")}
            className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Scan Another Code
          </button>
        )}
      </div>
    </div>
  );
}
