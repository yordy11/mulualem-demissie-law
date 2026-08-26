"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Larger Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group py-2"
            >
              <div className="relative h-16 sm:h-18 md:h-20 w-72 sm:w-84 md:w-96">
                <Image
                  src="/attorney-logo.png"
                  alt="MULUALEM DEMISSIE ZERIHUN - Lawyer and Attorney"
                  fill
                  className="object-contain object-left scale-105 origin-left"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-bold tracking-wider text-[#374151] hover:text-[#111827] transition-colors relative group py-1 uppercase"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#111827] group-hover:w-full transition-all duration-200" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 bg-[#0C0E1C] text-white text-xs font-bold tracking-wider rounded-none hover:bg-black transition-colors uppercase cursor-pointer"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Book a Consultation
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#111827]"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-[#E5E7EB] space-y-3 bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-2 text-sm font-semibold text-[#111827] hover:text-[#B8860B] transition-colors uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#0C0E1C] text-white text-xs font-bold tracking-wider uppercase cursor-pointer"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
