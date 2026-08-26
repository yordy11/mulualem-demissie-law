"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, MoreVertical, Briefcase } from "lucide-react";

interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  practiceArea: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | "ON_HOLD";
  dateOpened: string;
}

const initialCases: CaseItem[] = [
  {
    id: "1",
    caseNumber: "CS-2024-001",
    title: "Sterling Commercial Lease Litigation",
    client: "Marcus Sterling",
    practiceArea: "Civil Litigation",
    status: "IN_PROGRESS",
    dateOpened: "Oct 12, 2024",
  },
  {
    id: "2",
    caseNumber: "CS-2024-002",
    title: "Vance Tech Shareholder Restructuring",
    client: "Eleanor Vance",
    practiceArea: "Corporate & Commercial Law",
    status: "OPEN",
    dateOpened: "Oct 18, 2024",
  },
  {
    id: "3",
    caseNumber: "CS-2024-003",
    title: "Addis Real Estate Acquisition & Title Clearance",
    client: "Sophia Chen",
    practiceArea: "Property & Real Estate",
    status: "OPEN",
    dateOpened: "Oct 20, 2024",
  },
  {
    id: "4",
    caseNumber: "CS-2024-004",
    title: "Commercial Supply Agreement Review",
    client: "David Roth",
    practiceArea: "Contract Law",
    status: "IN_PROGRESS",
    dateOpened: "Oct 15, 2024",
  },
  {
    id: "5",
    caseNumber: "CS-2024-005",
    title: "Senior Executive Employment Agreement",
    client: "Tadesse Wondimu",
    practiceArea: "Employment & Labour Law",
    status: "CLOSED",
    dateOpened: "Sep 28, 2024",
  },
];

function CaseStatusBadge({ status }: { status: CaseItem["status"] }) {
  if (status === "OPEN") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-blue-50 text-blue-700 border border-blue-200 uppercase">
        OPEN
      </span>
    );
  }
  if (status === "IN_PROGRESS") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-amber-50 text-amber-700 border border-amber-200 uppercase">
        IN PROGRESS
      </span>
    );
  }
  if (status === "ON_HOLD") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-purple-50 text-purple-700 border border-purple-200 uppercase">
        ON HOLD
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-gray-50 text-gray-600 border border-gray-200 uppercase">
      CLOSED
    </span>
  );
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>(initialCases);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState("ALL");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = filterArea === "ALL" || c.practiceArea === filterArea;
    return matchesSearch && matchesArea;
  });

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
              Cases Management
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Active and historical legal matters across all practice areas.
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

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-[#E5E7EB]">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by case title, client, or reference number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#0C0E1C]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#0C0E1C] bg-white"
            >
              <option value="ALL">All Practice Areas</option>
              <option value="Civil Litigation">Civil Litigation</option>
              <option value="Contract Law">Contract Law</option>
              <option value="Corporate & Commercial Law">Corporate &amp; Commercial</option>
              <option value="Property & Real Estate">Property &amp; Real Estate</option>
              <option value="Employment & Labour Law">Employment &amp; Labour</option>
            </select>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F3F4F6]">
                  <th className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    CASE REF &amp; TITLE
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    CLIENT
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    PRACTICE AREA
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    DATE OPENED
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                      No cases found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F9FAFB] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-50 rounded text-gray-600 mt-0.5">
                            <Briefcase size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                              {item.caseNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs font-medium text-[#111827]">
                        {item.client}
                      </td>
                      <td className="px-4 py-4 text-xs text-[#4B5563]">
                        {item.practiceArea}
                      </td>
                      <td className="px-4 py-4">
                        <CaseStatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-4 text-xs text-[#6B7280]">
                        {item.dateOpened}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          className="p-1.5 text-[#9CA3AF] hover:text-[#111827] rounded hover:bg-gray-100 transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
