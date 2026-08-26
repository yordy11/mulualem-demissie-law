import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-3xl font-bold text-[#111827] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          At Mulalem Demissie Legal Counsel, we respect your privacy and are committed to protecting all client communications and personal information in accordance with strict legal ethics and applicable privacy regulations.
        </p>
      </main>
      <Footer />
    </div>
  );
}
