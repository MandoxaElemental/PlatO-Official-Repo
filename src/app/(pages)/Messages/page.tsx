'use client';
import React, { useState } from 'react';

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
};

type Chat = {
  userId: string;
  username: string;
  messages: Message[];
};

const initialChats: Chat[] = [
  {
    userId: 'alice',
    username: 'Alice',
    messages: [
      { id: 1, sender: 'Alice', text: 'Hey! How are you?', time: '10:30 AM', isMe: false },
      { id: 2, sender: 'Me', text: 'I’m good, you?', time: '10:32 AM', isMe: true },
    ],
  },
  {
    userId: 'bob',
    username: 'Bob',
    messages: [
      { id: 1, sender: 'Bob', text: 'Yo!', time: '9:00 AM', isMe: false },
      { id: 2, sender: 'Me', text: 'Hey Bob!', time: '9:05 AM', isMe: true },
    ],
  },
];

const Messages = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatIndex, setActiveChatIndex] = useState<number>(0);
  const [input, setInput] = useState<string>('');

  const activeChat = chats[activeChatIndex];

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: activeChat.messages.length + 1,
      sender: 'Me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    const updatedChats = chats.map((chat, index) =>
      index === activeChatIndex
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setInput('');
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li
              key={chat.userId}
              className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${
                index === activeChatIndex ? 'bg-gray-300 font-bold' : ''
              }`}
              onClick={() => setActiveChatIndex(index)}
            >
              {chat.username}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-col flex-1">
        {/* Header */}
        <div className="border-b border-slate-300 p-4 text-xl font-semibold text-center">
          {activeChat.username}
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow ${
                  msg.isMe
                    ? 'bg-blue-200 text-black rounded-br-none'
                    : 'bg-gray-200 text-black rounded-bl-none'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-[0.7rem] text-right mt-1 opacity-70">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-300 py-3 px-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Messages;
