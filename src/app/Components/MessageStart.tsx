'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/Utils/DataServices';
import { Button } from 'flowbite-react';

interface StartConversationButtonProps {
  targetUserId: string;
}

const StartConversationButton: React.FC<StartConversationButtonProps> = ({ targetUserId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("UserId");
    setCurrentUserId(storedId);
  }, []);

  const handleStartConversation = async () => {
    const token = getToken();
    if (!token || !currentUserId) {
      alert("You must be logged in.");
      return;
    }

    try {
      const res = await fetch('/api/conversations/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userA: currentUserId,
          userB: targetUserId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/messages/${data.conversationId}`);
      } else {
        alert(data.message || "Failed to start conversation.");
      }
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };

  if (currentUserId === targetUserId) return null;

  return (
    <Button
      onClick={handleStartConversation}
      className="rounded-full h-8 bg-green-200 hover:bg-green-400 text-black dark:bg-green-100 dark:hover:bg-green-200"
    >
      Message
    </Button>
  );
};

export default StartConversationButton;
