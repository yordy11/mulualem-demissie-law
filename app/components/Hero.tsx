"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ConsultationModal from "./ConsultationModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* Left Content Column (6 cols on lg) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Tagline */}
              <p
                className="text-xs md:text-sm font-semibold tracking-wider mb-4"
                style={{
                  color: "#C59B27",
                  fontFamily: "var(--font-serif)",
                }}
              >
                Legal Excellence &amp; Editorial Precision
              </p>

              {/* Main Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] leading-[1.2] mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Experienced Legal Counsel.
                <br />
                Trusted Representation.
              </h1>

              {/* Subtitle / Paragraph */}
              <p
                className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-xl mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Providing sophisticated, strategic legal solutions for
                high-net-worth individuals and corporate entities with
                uncompromising integrity and quiet confidence.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 bg-[#0C0E1C] text-white text-xs font-bold tracking-widest rounded-none hover:bg-black transition-colors uppercase cursor-pointer"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Discuss Your Case
                </button>
                <Link
                  href="/practice-areas"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-[#111827] text-[#111827] text-xs font-bold tracking-widest rounded-none hover:bg-[#111827] hover:text-white transition-colors uppercase text-center"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Explore Practice Areas
                </Link>
              </div>
            </div>

            {/* Right Image Column (6 cols on lg) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[1.15/1] overflow-hidden bg-gray-100 border border-[#E5E7EB] shadow-md">
                <Image
                  src="/attorney-photo.jpg"
                  alt="Mulualem Demissie Zerihun - Lawyer and Attorney"
                  fill
                  className="object-cover object-top"
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Floating Stat Badge Card */}
                <div className="absolute bottom-0 left-0 bg-white border border-[#E5E7EB] p-5 shadow-lg max-w-[220px]">
                  <p
                    className="text-lg font-bold text-[#111827]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    15+ Years
                  </p>
                  <p
                    className="text-xs text-[#4B5563] mt-0.5"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Editorial Legal Authority
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
