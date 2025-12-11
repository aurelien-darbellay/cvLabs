import { useEffect, useState } from "react";

export function LoadingSpinner() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse opacity-75"></div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading CV data
        </h2>
        <p className="text-gray-600 mb-4">Please be patient</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-lg font-mono text-gray-700">{seconds}s</span>
        </div>
      </div>
    </div>
  );
}
