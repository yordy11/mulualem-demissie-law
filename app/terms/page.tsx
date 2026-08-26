import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-3xl font-bold text-[#111827] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          The materials on this website are provided for general informational purposes only and do not constitute formal legal advice. Viewing this website or submitting a contact inquiry does not establish an attorney-client relationship.
        </p>
      </main>
      <Footer />
    </div>
  );
}
