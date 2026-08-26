"use client";

import { useState } from "react";
import { X, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const practiceAreas = [
  "Civil Litigation",
  "Contract Law",
  "Corporate & Commercial Law",
  "Property & Real Estate",
  "Employment & Labour Law",
  "Dispute Resolution",
];

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceArea, setPracticeArea] = useState("Civil Litigation");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          subject: practiceArea,
          preferredDate,
          preferredTime,
          message: description,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFullName("");
          setEmail("");
          setPhone("");
          setPracticeArea("Civil Litigation");
          setPreferredDate("");
          setPreferredTime("");
          setDescription("");
        }, 2500);
      }
    } catch {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center space-y-3">
            <CheckCircle2 size={52} className="text-[#16A34A] animate-bounce" />
            <h3
              className="text-2xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Consultation Requested
            </h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Thank you, {fullName}. Attorney <strong>Mulualem Demissie Zerihun</strong> will review your legal matter and contact you promptly.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-[#B8860B] mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                MULUALEM DEMISSIE ZERIHUN
              </p>
              <h3
                className="text-2xl font-bold text-[#111827]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Book a Consultation
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Lideta Sub-City, Lideta, Merkato Mall, 1st Floor, Office No. 134, Addis Ababa, Ethiopia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 9... / 09..."
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Practice Area *
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                >
                  {practiceAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Brief Description of Legal Matter
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief overview of your legal inquiry..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-none hover:bg-black transition-colors uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {isSubmitting ? "Submitting..." : "REQUEST CONSULTATION"}
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center italic pt-1">
                Submitting this form does not create an attorney-client relationship.
              </p>

              <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between text-[11px] text-gray-500 gap-2">
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-[#B8860B]" />
                  +251 917 117 939 / 0909 838 013
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-[#B8860B]" />
                  mulualemdm66@gmail.com
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
