'use client'
import { addMessage, getMessagesByUserAndConversation } from "@/app/Utils/DataServices";
import { IMessage } from "@/app/Utils/Interfaces";
import { useEffect, useState } from "react";

const MessagesPage = ({ userId, conversationId }: { userId: number; conversationId: number }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const loadMessages = async () => {
    const data = await getMessagesByUserAndConversation(userId, conversationId);
    setMessages(data);
  };

  const handleSend = async () => {
    const message: IMessage = {
      id: 0,
      userId,
      conversationId,
      message: newMessage,
      dateSent: new Date().toISOString()
    };
    await addMessage(message);
    setNewMessage("");
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, [userId, conversationId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Messages</h2>
      <div className="border p-2 h-64 overflow-y-auto my-4">
        {messages.map((msg) => (
          <div key={msg.id} className="my-2">
            <div className="text-sm text-gray-500">{msg.dateSent}</div>
            <div className="text-base">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
