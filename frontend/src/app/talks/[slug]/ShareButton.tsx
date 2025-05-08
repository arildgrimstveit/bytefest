"use client";

import { useState, useEffect } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure component is mounted on client to safely access window object
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const urlToCopy = window.location.href;
      try {
        await navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy URL: ", err);
        // Optionally, provide user feedback for error
      }
    }
  };

  if (!isClient) {
    // Render a placeholder or null on the server/during hydration
    // to avoid accessing window object prematurely.
    // The actual button will render once isClient is true.
    return (
      <div className="w-6 h-6 bg-gray-200 animate-pulse rounded"></div> // Placeholder
    );
  }

  return (
    <button
      onClick={handleShare}
      className="text-[#2A1449] p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
      aria-label={copied ? "Link kopiert!" : "Kopier lenke"}
      title={copied ? "Link kopiert!" : "Kopier lenke"}
    >
      {copied ? (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
      )}
    </button>
  );
} 