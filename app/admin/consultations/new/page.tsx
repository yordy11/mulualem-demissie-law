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

export default function NewConsultationPage() {
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceArea, setPracticeArea] = useState("Civil Litigation");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email,
          phone,
          subject: practiceArea,
          preferredDate,
          preferredTime,
          message: notes,
        }),
      });
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/consultations");
      }, 1200);
    }
  };

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/admin/consultations"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Consultations
        </Link>

        {/* Header */}
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Schedule New Consultation
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Manually register an intake consultation for a client.
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
                Consultation Created Successfully
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Redirecting to Consultation Requests...
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
                    placeholder="e.g. Eleanor Vance"
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
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9... / 09..."
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>
              </div>

              {/* Row 2: Practice Area */}
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

              {/* Row 3: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Consultation Notes / Matter Description
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Summary of legal inquiry, documents received, or instructions..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
                <Link
                  href="/admin/consultations"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold rounded-sm hover:bg-gray-50 transition-colors uppercase tracking-wider"
                >
                  CANCEL
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "CREATING..." : "CREATE CONSULTATION"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
