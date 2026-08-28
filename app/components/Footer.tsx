import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const navigationLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const googleMapsUrl =
  "https://www.google.com/maps/place/Mulualem+Damissie+attorney+and+consultant+at+law+law/@9.0063465,38.7315822,17z/data=!3m1!4b1!4m6!3m5!1s0x164b87e84f1a8003:0x3fa25d85b5c1bdf0!8m2!3d9.0063465!4d38.7315822!16s%2Fg%2F11xd2mp3n0?entry=ttu";

export default function Footer() {
  return (
    <footer className="bg-[#080A12] text-white pt-16 pb-20 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 - Brand & Logo */}
          <div className="space-y-5">
            <div className="bg-white p-3 rounded-sm inline-block shadow-md">
              <div className="relative h-14 w-64 sm:w-72">
                <Image
                  src="/attorney-logo.png"
                  alt="MULUALEM DEMISSIE ZERIHUN - Lawyer and Attorney"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <h2
              className="text-base font-bold tracking-wider uppercase pt-1"
              style={{
                color: "#D4A843",
                fontFamily: "var(--font-serif)",
              }}
            >
              MULUALEM DEMISSIE ZERIHUN
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              © 2024 Mulualem Demissie Zerihun. All rights reserved. Legal
              excellence through editorial precision.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                color: "#D4A843",
                fontFamily: "var(--font-serif)",
              }}
            >
              Navigation
            </h3>
            <ul className="space-y-3.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#D1D5DB] hover:text-white transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Offices & Contact Details */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                color: "#D4A843",
                fontFamily: "var(--font-serif)",
              }}
            >
              Offices &amp; Contact
            </h3>
            <div className="text-xs text-[#D1D5DB] space-y-4 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#1F2937] text-[#D4A843] flex items-center justify-center shrink-0 mt-0.5 border border-[#374151]">
                  <MapPin size={14} />
                </div>
                <div>
                  <p>
                    Lideta Sub-City, Lideta, Merkato Mall
                    <br />
                    1st Floor, Office No. 134
                    <br />
                    Addis Ababa, Ethiopia
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-bold hover:underline transition-colors"
                    style={{ color: "#D4A843" }}
                  >
                    <Image
                      src="/google-maps-icon.png"
                      alt="Google Maps Location Pin"
                      width={14}
                      height={14}
                      className="object-contain shrink-0"
                      unoptimized
                    />
                    <span>View on Google Maps</span>
                    <ExternalLink size={11} className="opacity-80" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-7 h-7 rounded-full bg-[#1F2937] text-[#D4A843] flex items-center justify-center shrink-0 border border-[#374151]">
                  <Mail size={13} />
                </div>
                <a
                  href="mailto:mulualemdm66@gmail.com"
                  className="hover:underline transition-colors"
                  style={{ color: "#D4A843" }}
                >
                  mulualemdm66@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="w-7 h-7 rounded-full bg-[#1F2937] text-[#D4A843] flex items-center justify-center shrink-0 mt-0.5 border border-[#374151]">
                  <Phone size={13} />
                </div>
                <div className="space-y-1">
                  <a
                    href="tel:+251917117939"
                    className="block hover:text-white transition-colors"
                  >
                    +251 917 117 939
                  </a>
                  <a
                    href="tel:+251909838013"
                    className="block hover:text-white transition-colors"
                  >
                    +251 909 838 013
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
