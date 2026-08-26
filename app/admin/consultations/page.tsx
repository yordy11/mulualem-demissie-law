"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import ConsultationTable from "../components/ConsultationTable";

export default function ConsultationsPage() {
  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Consultation Requests
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Client requests submitted via the website booking form and direct inquiries.
            </p>
          </div>

          <Link
            href="/admin/consultations/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors tracking-widest uppercase self-start sm:self-auto cursor-pointer"
          >
            <Plus size={15} />
            NEW CONSULTATION
          </Link>
        </div>

        {/* Full Consultation Requests Table */}
        <ConsultationTable showViewAll={false} />
      </div>
    </main>
  );
}
