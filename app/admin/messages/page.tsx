"use client";

import { useState } from "react";
import { MessageSquare, Mail, Search, CheckCircle2, Clock, Trash2 } from "lucide-react";

interface MessageItem {
  id: string;
  sender: string;
  email: string;
  phone: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}

const initialMessages: MessageItem[] = [
  {
    id: "1",
    sender: "Eleanor Vance",
    email: "e.vance@example.com",
    phone: "+251 911 234 567",
    subject: "Follow-up regarding Shareholder Agreement Clauses",
    preview:
      "Good afternoon Attorney Mulualem, I reviewed the drafts and had a question regarding section 4 on transfer restrictions...",
    date: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    sender: "Marcus Sterling",
    email: "m.sterling@example.com",
    phone: "+251 922 345 678",
    subject: "Additional Documentation for Lease Dispute",
    preview:
      "Attached are the signed receipt copies and communication logs from the landlord for your case preparation...",
    date: "Yesterday",
    unread: true,
  },
  {
    id: "3",
    sender: "Sophia Chen",
    email: "s.chen@example.com",
    phone: "+251 933 456 789",
    subject: "Property Deed Transfer Clarification",
    preview:
      "Thank you for the guidance during yesterday's meeting. We will bring the original title deeds on Monday morning...",
    date: "Oct 22, 2024",
    unread: false,
  },
  {
    id: "4",
    sender: "David Roth",
    email: "d.roth@example.com",
    phone: "+251 944 567 890",
    subject: "Contract Review Fee Schedule Confirmation",
    preview:
      "We confirm the terms of engagement and have authorized payment as outlined in the retainer schedule...",
    date: "Oct 21, 2024",
    unread: false,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(
    initialMessages[0]
  );
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
            Communications received via website inquiries and direct client portals.
          </p>
        </div>

        {/* 2-Column Split: Message List (1/2) + Reading Pane (1/2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Messages List */}
          <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
            {/* Search Box */}
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

            {/* List */}
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
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">
                    {msg.preview}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Message Detail Pane */}
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 shadow-xs">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header info */}
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
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-[#B8860B] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                      <span>&bull;</span>
                      <span>{selectedMessage.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(selectedMessage.id)}
                      className="p-2 text-gray-500 hover:text-black rounded hover:bg-gray-100 transition-colors"
                      title="Toggle read status"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-red-500 hover:text-red-700 rounded hover:bg-red-50 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                  <p>{selectedMessage.preview}</p>
                  <p>
                    Please let us know your availability for a follow-up consultation at your Lideta office or by telephone.
                  </p>
                </div>

                {/* Quick Reply Form */}
                <div className="pt-6 border-t border-[#F3F4F6] space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Quick Email Reply
                  </h3>
                  <textarea
                    rows={3}
                    placeholder={`Reply directly to ${selectedMessage.email}...`}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C]"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => alert(`Reply sent to ${selectedMessage.email}`)}
                      className="px-6 py-2 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      SEND REPLY
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-400 text-sm">
                Select a message to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
