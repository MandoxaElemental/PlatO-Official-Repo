"use client";
import React, { useEffect, useState } from "react";

const Premium = () => {
  const [isGuest, setIsGuest] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const storedUsername = localStorage.getItem("Username");

    setIsGuest(token === "guest-token" || storedUsername === "Guest");
    setUsername(storedUsername || "Unknown");

    // Check if user has been upgraded to premium in this session
    const premiumStatus = localStorage.getItem("IsPremium") === "true";
    setIsPremium(premiumStatus);

    setIsLoaded(true);
  }, []);

  const handleUpgrade = () => {
    if (isGuest) return;
    localStorage.setItem("IsPremium", "true");
    setIsPremium(true);
    alert("You are now a Premium Member!");
  };

  return (
    <div className="pt-10 px-5 w-full">
      <div className="border-b border-slate-300 p-2 text-2xl font-semibold text-center">
        Premium
      </div>

      {!isLoaded ? (
        <div className="text-center mt-5 text-gray-600">Loading...</div>
      ) : (
        <div className="mt-4 text-center">
          <p className="mb-2 text-lg">Welcome, <strong>{username}</strong></p>
          <p className="mb-4">
            Status:{" "}
            <span className={isPremium ? "text-green-600" : "text-red-600"}>
              {isPremium ? "Premium Member" : "Free Member"}
            </span>
          </p>

          {isGuest ? (
            <div className="text-red-500 mt-4">
              🚫 Guest accounts cannot upgrade to Premium.
            </div>
          ) : !isPremium ? (
            <button
              onClick={handleUpgrade}
              className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
            >
              Upgrade to Premium
            </button>
          ) : (
            <div className="mt-4 text-lg text-green-600">
              ✅ Enjoy your premium benefits!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Premium;
