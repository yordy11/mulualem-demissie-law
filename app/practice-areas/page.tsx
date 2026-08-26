import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  Scale,
  FileText,
  Building2,
  Home as HomeIcon,
  Briefcase,
  Users,
} from "lucide-react";

const practiceAreasList = [
  {
    title: "Civil Litigation",
    description:
      "Professional legal representation and guidance concerning civil disputes, claims, and legal proceedings.",
    icon: Scale,
  },
  {
    title: "Contract Law",
    description:
      "Legal assistance with reviewing, drafting, interpreting, and negotiating contracts and agreements.",
    icon: FileText,
  },
  {
    title: "Corporate & Commercial Law",
    description:
      "Legal guidance for businesses and organizations concerning commercial matters, agreements, transactions, and corporate legal needs.",
    icon: Building2,
  },
  {
    title: "Property & Real Estate",
    description:
      "Legal assistance concerning property transactions, ownership matters, leases, agreements, and property-related disputes.",
    icon: HomeIcon,
  },
  {
    title: "Employment & Labour Law",
    description:
      "Legal guidance concerning employment relationships, workplace matters, employment agreements, and labour-related disputes.",
    icon: Briefcase,
  },
  {
    title: "Dispute Resolution",
    description:
      "Professional assistance with negotiation, mediation, settlement discussions, and other appropriate methods of resolving disputes.",
    icon: Users,
  },
];

export default function PracticeAreasPage() {
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
          Legal Services
        </p>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Practice Areas
        </h1>

        <p
          className="text-sm sm:text-base text-[#4B5563] max-w-2xl mb-12"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Comprehensive, client-focused legal representation tailored to high-net-worth individuals and corporate organizations in Addis Ababa and beyond.
        </p>

        {/* 6 Practice Area Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreasList.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="p-8 border border-[#E5E7EB] bg-white rounded-none flex flex-col justify-between hover:border-[#111827] transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mb-6">
                    <Icon size={22} />
                  </div>

                  <h2
                    className="text-xl font-bold text-[#111827] mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {area.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F3F4F6]">
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#111827] hover:text-[#B8860B] transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Discuss Matter &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
