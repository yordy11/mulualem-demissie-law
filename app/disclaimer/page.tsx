import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-3xl font-bold text-[#111827] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Legal Disclaimer
        </h1>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          Attorney Advertising. Prior results do not guarantee a similar outcome. Please do not send confidential or sensitive information through online forms until an attorney-client engagement letter is executed.
        </p>
      </main>
      <Footer />
    </div>
  );
}
