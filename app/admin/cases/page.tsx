"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Briefcase } from "lucide-react";

export interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  practiceArea: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | "ON_HOLD";
  dateOpened: string;
}

export default function CasesPage() {
  const [cases] = useState<CaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Legal Cases &amp; Matters
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Active litigation files, corporate retainers, and advisory matters.
            </p>
          </div>

          <Link
            href="/admin/cases/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors tracking-widest uppercase self-start sm:self-auto cursor-pointer"
          >
            <Plus size={15} />
            NEW CASE
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-[#E5E7EB]">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by matter title, client name, or case number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#0C0E1C]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs sm:text-sm border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:border-[#0C0E1C]"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Table / Empty State */}
        {filteredCases.length > 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#F3F4F6]">
                    <th className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      CASE / MATTER
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      CLIENT
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      PRACTICE AREA
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                      DATE OPENED
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#111827]">{c.title}</p>
                        <p className="text-xs text-[#6B7280] font-mono mt-0.5">{c.caseNumber}</p>
                      </td>
                      <td className="px-4 py-4 text-xs text-[#4B5563] font-medium">{c.client}</td>
                      <td className="px-4 py-4 text-xs text-[#111827]">{c.practiceArea}</td>
                      <td className="px-4 py-4 text-xs text-[#6B7280]">{c.dateOpened}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <Briefcase size={22} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">No active cases filed yet</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Create and manage client litigation, contract, and advisory matter files.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/cases/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm uppercase tracking-wider hover:bg-black transition-colors"
              >
                <Plus size={14} />
                Create First Case
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
