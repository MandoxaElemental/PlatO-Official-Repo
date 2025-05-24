'use client';
import React, { useEffect, useState } from 'react';
import { IUserData } from '@/app/Utils/Interfaces';
import { getUserInfoByUsername, updateUserItem } from '@/app/Utils/DataServices';

const Premium = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('Token') || '';
    const storedUsername = localStorage.getItem('Username') || 'Guest';

    setToken(storedToken);
    setUsername(storedUsername);
    setIsGuest(storedToken === 'guest-token' || storedUsername === 'Guest');

    if (storedToken !== 'guest-token' && storedUsername !== 'Guest') {
      getUserInfoByUsername(storedUsername)
        .then((data: IUserData) => {
          setUserData(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleUpgrade = async () => {
    if (!userData || isGuest) return;

    const updatedUser: IUserData = {
      ...userData,
      premiumMember: true,
    };

    const success = await updateUserItem(updatedUser, token);

    if (success) {
      setUserData(updatedUser);
      alert('🎉 You are now a Premium Member!');
    } else {
      alert('❌ Failed to upgrade to Premium.');
    }
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
          <p className="mb-2 text-lg">
            Welcome, <strong>{username}</strong>
          </p>
          <p className="mb-4">
            Status:{' '}
            <span
              className={
                userData?.premiumMember ? 'text-green-600' : 'text-red-600'
              }
            >
              {userData?.premiumMember ? 'Premium Member' : 'Free Member'}
            </span>
          </p>

          <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4 text-center">Membership Benefits</h2>
  <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="text-lg font-bold mb-2 text-green-700">🌟 Premium Members</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>🚫 Ad-Free Experience</li>
        <li>📈 Priority in Recipe Feed</li>
        <li>🎖️ Premium Badge on Profile & Posts</li>
        <li>📊 Advanced Analytics (Views, Likes, Saves)</li>
        <li>👩‍🍳 Real-time Recipe Collaboration</li>
        <li>📰 Weekly Premium Newsletter</li>
        <li>🔓 Access to Exclusive Recipes & Videos</li>
        <li>📌 Pin Recipes to Your Profile</li>
      </ul>
    </div>
    <div className="p-4 border rounded-lg shadow bg-gray-50">
      <h3 className="text-lg font-bold mb-2 text-slate-700">🙋 Free Members</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>📹 Post Videos & Pictures</li>
        <li>📖 Share & Save Recipes</li>
        <li>❤️ Like & Rate Recipes</li>
        <li>👥 Follow Users & Comment on Posts</li>
        <li>🔍 Access All Public Recipes</li>
      </ul>
    </div>
  </div>
</div>


          {isGuest ? (
            <div className="text-red-500 mt-4">
              🚫 Guest accounts cannot upgrade to Premium.
            </div>
          ) : !userData?.premiumMember ? (
            <button
              onClick={handleUpgrade}
              className="mt-4 px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
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
