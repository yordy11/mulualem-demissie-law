"use client";

import { useState } from "react";
import { MessageSquare, Mail, Search, CheckCircle2, Trash2 } from "lucide-react";

export interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Client Messages &amp; Inquiries
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Communications received via website contact forms and direct inquiries.
          </p>
        </div>

        {/* 2-Column Split or Empty State */}
        {messages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Messages List */}
            <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-[#F3F4F6]">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#0C0E1C]"
                  />
                </div>
              </div>

              <div className="divide-y divide-[#F3F4F6] max-h-[600px] overflow-y-auto">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage?.id === msg.id
                        ? "bg-[#F3F4F6]"
                        : "hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {msg.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#B8860B] shrink-0" />
                        )}
                        <p
                          className={`text-sm ${
                            msg.unread ? "font-bold text-[#111827]" : "font-medium text-[#4B5563]"
                          }`}
                        >
                          {msg.sender}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {msg.date}
                      </span>
                    </div>

                    <p
                      className={`text-xs ${
                        msg.unread ? "font-semibold text-[#111827]" : "text-[#4B5563]"
                      } truncate`}
                    >
                      {msg.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Message Detail Pane */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 shadow-xs">
              {selectedMessage ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between border-b border-[#F3F4F6] pb-5">
                    <div>
                      <h2
                        className="text-xl font-bold text-[#111827]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2">
                        <span className="font-semibold text-gray-900">
                          From: {selectedMessage.sender}
                        </span>
                        <span>&bull;</span>
                        <span>{selectedMessage.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRead(selectedMessage.id)}
                        className="p-2 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition-colors"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 text-red-500 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                    <p>{selectedMessage.preview}</p>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-gray-400 text-sm">
                  Select an inquiry to view details.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <MessageSquare size={22} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">Inbox is all clear</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Client messages submitted via the website contact form will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
