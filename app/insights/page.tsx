import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";

const articles = [
  {
    id: "1",
    title: "Understanding Your Rights Before Signing a Contract",
    category: "Contract Law",
    date: "Legal Editorial",
    summary:
      "A comprehensive review of standard contractual provisions, obligations, and risk mitigation strategies prior to signing binding agreements.",
  },
  {
    id: "2",
    title: "What to Do When a Contractual Dispute Arises",
    category: "Dispute Resolution",
    date: "Legal Editorial",
    summary:
      "Strategic legal steps and dispute assessment methods when one party fails to adhere to contractual promises.",
  },
  {
    id: "3",
    title: "Why Legal Advice Matters Before Starting a Business",
    category: "Corporate Law",
    date: "Legal Editorial",
    summary:
      "Fundamental legal considerations regarding commercial structuring, shareholder agreements, and corporate governance.",
  },
  {
    id: "4",
    title: "Common Issues to Consider When Reviewing a Contract",
    category: "Contract Law",
    date: "Legal Editorial",
    summary:
      "Identifying ambiguous language, liability caps, termination clauses, and jurisdiction provisions in commercial contracts.",
  },
  {
    id: "5",
    title: "Understanding Civil Dispute Resolution",
    category: "Civil Litigation",
    date: "Legal Editorial",
    summary:
      "An overview of court proceedings, mediation options, and pre-litigation negotiation protocols.",
  },
  {
    id: "6",
    title: "When Should You Consult a Lawyer?",
    category: "Legal Counsel",
    date: "Legal Editorial",
    summary:
      "Recognizing critical moments when early legal intervention prevents long-term liability and financial exposure.",
  },
];

export default function InsightsPage() {
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
          Publications &amp; Perspectives
        </p>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Legal Insights
        </h1>

        <p
          className="text-sm sm:text-base text-[#4B5563] max-w-2xl mb-12"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Analysis, guidance, and strategic commentary on contract law, corporate governance, property matters, and dispute resolution.
        </p>

        {/* 6 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="p-8 border border-[#E5E7EB] bg-white rounded-none flex flex-col justify-between hover:border-[#111827] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-4">
                  <span className="font-semibold uppercase tracking-wider text-[#B8860B]">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h2
                  className="text-lg font-bold text-[#111827] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F3F4F6]">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#111827] hover:text-[#B8860B] transition-colors uppercase tracking-wider inline-flex items-center gap-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Consult Attorney <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mandatory Legal Disclaimer */}
        <div className="mt-16 p-6 bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#4B5563] leading-relaxed">
          <p className="font-bold text-[#111827] uppercase tracking-wider mb-1.5">
            Legal Disclaimer
          </p>
          <p>
            The information provided on this website is for general informational purposes only and does not constitute legal advice or establish an attorney-client relationship.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
