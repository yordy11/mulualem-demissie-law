import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, Award, Compass } from "lucide-react";

export default function AboutPage() {
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
          About The Attorney
        </p>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          MULUALEM DEMISSIE ZERIHUN
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Text overview */}
          <div className="lg:col-span-7 space-y-6">
            <p
              className="text-base sm:text-lg text-[#374151] leading-relaxed"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Mulualem Demissie Zerihun is a lawyer and attorney committed to providing professional, strategic, and client-focused legal representation. His approach emphasizes careful legal analysis, clear communication, confidentiality, integrity, and practical legal solutions tailored to each client&apos;s circumstances.
            </p>

            <div className="pt-4 flex gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#0C0E1C] text-white text-xs font-bold tracking-widest rounded-none hover:bg-black transition-colors uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Discuss Your Case
              </Link>
              <Link
                href="/practice-areas"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-[#111827] text-[#111827] text-xs font-bold tracking-widest rounded-none hover:bg-[#111827] hover:text-white transition-colors uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Practice Areas
              </Link>
            </div>
          </div>

          {/* Attorney Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 border border-[#E5E7EB] shadow-md">
              <Image
                src="/attorney-photo.jpg"
                alt="Mulualem Demissie Zerihun - Lawyer and Attorney"
                fill
                className="object-cover object-top"
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="pt-12 border-t border-[#E5E7EB]">
          <h2
            className="text-2xl font-bold text-[#111827] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Core Values &amp; Principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Integrity */}
            <div className="p-6 border border-[#E5E7EB] bg-white rounded-xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B8860B] mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3
                className="text-base font-bold text-[#111827] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Integrity
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Professional and ethical conduct in every matter.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="p-6 border border-[#E5E7EB] bg-white rounded-xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B8860B] mb-4">
                <Lock size={20} />
              </div>
              <h3
                className="text-base font-bold text-[#111827] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Confidentiality
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Respect for client privacy and sensitive legal information.
              </p>
            </div>

            {/* Professionalism */}
            <div className="p-6 border border-[#E5E7EB] bg-white rounded-xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B8860B] mb-4">
                <Award size={20} />
              </div>
              <h3
                className="text-base font-bold text-[#111827] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Professionalism
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Clear, responsible, and client-focused legal service.
              </p>
            </div>

            {/* Strategic Counsel */}
            <div className="p-6 border border-[#E5E7EB] bg-white rounded-xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B8860B] mb-4">
                <Compass size={20} />
              </div>
              <h3
                className="text-base font-bold text-[#111827] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Strategic Counsel
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Careful analysis and practical legal solutions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
