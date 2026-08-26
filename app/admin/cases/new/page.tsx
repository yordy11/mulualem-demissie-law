"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const practiceAreas = [
  "Civil Litigation",
  "Contract Law",
  "Corporate & Commercial Law",
  "Property & Real Estate",
  "Employment & Labour Law",
  "Dispute Resolution",
];

const caseStatuses = ["OPEN", "IN_PROGRESS", "ON_HOLD", "CLOSED"];

export default function NewCasePage() {
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [practiceArea, setPracticeArea] = useState("Civil Litigation");
  const [caseDescription, setCaseDescription] = useState("");
  const [caseStatus, setCaseStatus] = useState("OPEN");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/cases");
      }, 1200);
    }, 600);
  };

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/admin/cases"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Cases
        </Link>

        {/* Header */}
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Create New Case File
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Register a new client legal matter into the firm management system.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-xs">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center space-y-3 bg-[#F0FDF4] p-6 border border-[#BBF7D0] rounded-lg">
              <CheckCircle2 size={48} className="text-[#16A34A]" />
              <h2
                className="text-xl font-bold text-[#111827]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Case File Created Successfully
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Redirecting to Cases management...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Client Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Marcus Sterling"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9..."
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>
              </div>

              {/* Row 2: Case Title & Practice Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Case Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    placeholder="e.g. Sterling Commercial Lease Litigation"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Practice Area *
                  </label>
                  <select
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  >
                    {practiceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Status & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Case Status *
                  </label>
                  <select
                    value={caseStatus}
                    onChange={(e) => setCaseStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  >
                    {caseStatuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Date Opened *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Case Description / Legal Summary
                </label>
                <textarea
                  rows={4}
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  placeholder="Detailed context and notes regarding legal proceedings, claims, and representation plan..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
                <Link
                  href="/admin/cases"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-sm hover:bg-gray-50 transition-colors uppercase tracking-wider"
                >
                  CANCEL
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "CREATING..." : "CREATE CASE"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
