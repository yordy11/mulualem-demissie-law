import Link from "next/link";
import { HelpCircle, Mail, Phone, MapPin, FileQuestion, ArrowLeft } from "lucide-react";

export default function SupportPage() {
  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div>
          <h1
            className="text-2xl lg:text-3xl font-bold text-[#111827]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Admin Portal Support &amp; Help Desk
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            System documentation, practice management guidance, and technical assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Practice Support */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#B8860B] flex items-center justify-center">
              <FileQuestion size={20} />
            </div>
            <h2
              className="text-base font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Intake &amp; Case Workflow
            </h2>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              When a client books a consultation via the public website, a record is automatically placed in <strong>Consultation Requests</strong>. From there, you can approve, contact, or convert the inquiry into an active Case File.
            </p>
          </div>

          {/* Card 2: Contact Admin Support */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center">
              <Mail size={20} />
            </div>
            <h2
              className="text-base font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Technical &amp; Office Contacts
            </h2>
            <div className="space-y-2 text-xs text-[#4B5563]">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#B8860B]" />
                <a href="mailto:mulualemdm66@gmail.com" className="hover:underline">
                  mulualemdm66@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#B8860B]" />
                <span>+251 917 117 939 / 0909 838 013</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin size={13} className="text-[#B8860B] shrink-0 mt-0.5" />
                <span>Lideta Sub-City, Lideta, Merkato Mall, 1st Floor, Office No. 134, Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
