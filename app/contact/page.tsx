"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, CheckCircle2, ExternalLink } from "lucide-react";

const practiceAreas = [
  "Civil Litigation",
  "Contract Law",
  "Corporate & Commercial Law",
  "Property & Real Estate",
  "Employment & Labour Law",
  "Dispute Resolution",
];

const googleMapsUrl =
  "https://www.google.com/maps/place/Mulualem+Damissie+attorney+and+consultant+at+law+law/@9.0063465,38.7315822,17z/data=!3m1!4b1!4m6!3m5!1s0x164b87e84f1a8003:0x3fa25d85b5c1bdf0!8m2!3d9.0063465!4d38.7315822!16s%2Fg%2F11xd2mp3n0?entry=ttu";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceArea, setPracticeArea] = useState("Civil Litigation");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      }
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Header Tag */}
        <p
          className="text-xs md:text-sm font-semibold tracking-wider mb-3 uppercase"
          style={{
            color: "#C59B27",
            fontFamily: "var(--font-serif)",
          }}
        >
          Get In Touch
        </p>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Contact Legal Counsel
        </h1>

        <p
          className="text-sm sm:text-base text-[#4B5563] max-w-2xl mb-12"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Please reach out directly or submit a consultation request. All inquiries are treated with strict confidentiality.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-8 bg-[#F9FAFB] p-8 border border-[#E5E7EB] rounded-xs">
              <div>
                <h2
                  className="text-xl font-bold text-[#111827] mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  MULUALEM DEMISSIE ZERIHUN
                </h2>
                <p className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider">
                  Lawyer and Attorney
                </p>
              </div>

              <div className="space-y-6 text-sm text-[#374151]">
                {/* Office Location Box */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE68A]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                      Office Location
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#4B5563]">
                      Lideta Sub-City, Lideta
                      <br />
                      Merkato Mall, 1st Floor, Office No. 134
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-[#B8860B] hover:text-[#92400E] underline underline-offset-4 uppercase tracking-wider transition-colors"
                    >
                      <Image
                        src="/google-maps-icon.png"
                        alt="Google Maps Pin"
                        width={16}
                        height={16}
                        className="object-contain shrink-0"
                        unoptimized
                      />
                      <span>View on Google Maps</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-gray-200">
                  <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE68A]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:mulualemdm66@gmail.com"
                      className="text-xs sm:text-sm text-[#111827] hover:text-[#B8860B] underline underline-offset-2 transition-colors"
                    >
                      mulualemdm66@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-gray-200">
                  <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 mt-0.5 border border-[#FDE68A]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                      Phone
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <a
                        href="tel:+251917117939"
                        className="block text-[#111827] hover:text-[#B8860B] transition-colors font-medium"
                      >
                        +251 917 117 939
                      </a>
                      <a
                        href="tel:0909838013"
                        className="block text-[#111827] hover:text-[#B8860B] transition-colors font-medium"
                      >
                        0909 838 013
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Box */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#0C0E1C] text-white p-5 rounded-xs border border-black hover:bg-black transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform p-1.5">
                    <Image
                      src="/google-maps-icon.png"
                      alt="Google Maps"
                      width={22}
                      height={22}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D4A843]">
                      Google Maps Location
                    </p>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Merkato Mall, 1st Floor, Office 134
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#D4A843] transition-colors">
                  <span className="hidden sm:inline">Get Directions</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Consultation Request Form */}
          <div className="lg:col-span-7 p-8 border border-[#E5E7EB] bg-white">
            <h2
              className="text-2xl font-bold text-[#111827] mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Request a Consultation
            </h2>
            <p className="text-xs text-[#6B7280] mb-6">
              Complete the form below to arrange a formal legal consultation.
            </p>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3 bg-[#F0FDF4] p-6 border border-[#BBF7D0]">
                <CheckCircle2 size={48} className="text-[#16A34A]" />
                <h3
                  className="text-xl font-bold text-[#111827]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Consultation Request Received
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm">
                  Thank you, {fullName}. Attorney <strong>Mulualem Demissie Zerihun</strong> will review your legal matter and reach out promptly.
                </p>
              </div>
            ) : (
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
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
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
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
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
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
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
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
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
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
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
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Brief Description of Legal Matter
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief overview of your legal inquiry..."
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0C0E1C] focus:ring-1 focus:ring-[#0C0E1C]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#0C0E1C] text-white text-xs font-bold rounded-none hover:bg-black transition-colors uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {isSubmitting ? "Submitting..." : "REQUEST CONSULTATION"}
                  </button>
                </div>

                <p className="text-[11px] text-gray-500 text-center italic pt-1">
                  Submitting this form does not create an attorney-client relationship.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
