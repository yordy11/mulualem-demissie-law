"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Eye, CheckCircle2, Clock, XCircle, Trash2 } from "lucide-react";

export interface ConsultationRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  subject: string;
  status: "PENDING" | "APPROVED" | "CONTACTED" | "COMPLETED" | "CANCELLED";
}

export const initialConsultationsData: ConsultationRow[] = [
  {
    id: "1",
    name: "Eleanor Vance",
    email: "e.vance@example.com",
    phone: "+251 911 234 567",
    date: "Oct 24, 2024",
    subject: "Corporate & Commercial Law",
    status: "PENDING",
  },
  {
    id: "2",
    name: "Marcus Sterling",
    email: "m.sterling@example.com",
    phone: "+251 922 345 678",
    date: "Oct 23, 2024",
    subject: "Civil Litigation",
    status: "APPROVED",
  },
  {
    id: "3",
    name: "Sophia Chen",
    email: "s.chen@example.com",
    phone: "+251 933 456 789",
    date: "Oct 22, 2024",
    subject: "Property & Real Estate",
    status: "COMPLETED",
  },
  {
    id: "4",
    name: "David Roth",
    email: "d.roth@example.com",
    phone: "+251 944 567 890",
    date: "Oct 21, 2024",
    subject: "Contract Law",
    status: "PENDING",
  },
];

export function StatusBadge({ status }: { status: ConsultationRow["status"] }) {
  if (status === "PENDING") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#F3F4F6] text-[#4B5563] uppercase border border-[#E5E7EB]">
        PENDING
      </span>
    );
  }
  if (status === "APPROVED") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#FEF3C7] text-[#92400E] uppercase border border-[#FDE68A]">
        APPROVED
      </span>
    );
  }
  if (status === "CONTACTED") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#EFF6FF] text-[#1E40AF] uppercase border border-[#BFDBFE]">
        CONTACTED
      </span>
    );
  }
  if (status === "CANCELLED") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#FEF2F2] text-[#991B1B] uppercase border border-[#FECACA]">
        CANCELLED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#F3F4F6] text-[#6B7280] uppercase border border-[#E5E7EB]">
      COMPLETED
    </span>
  );
}

export default function ConsultationTable({
  limit,
  showViewAll = true,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const [data, setData] = useState<ConsultationRow[]>(initialConsultationsData);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const displayData = limit ? data.slice(0, limit) : data;

  const updateStatus = (id: string, newStatus: ConsultationRow["status"]) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setActiveMenuId(null);
  };

  const deleteRow = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-visible">
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
        <h2
          className="text-xl font-bold text-[#111827]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Consultation Requests
        </h2>
        {showViewAll && (
          <Link
            href="/admin/consultations"
            className="text-xs font-bold text-[#111827] underline underline-offset-4 hover:text-[#B8860B] transition-colors uppercase tracking-wider"
          >
            VIEW ALL
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F3F4F6]">
              <th className="px-6 py-3.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                NAME
              </th>
              <th className="px-4 py-3.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                DATE
              </th>
              <th className="px-4 py-3.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                SUBJECT
              </th>
              <th className="px-4 py-3.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-4 py-3.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6]">
            {displayData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F9FAFB] transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-[#111827]">
                    {row.name}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{row.email}</p>
                </td>
                <td className="px-4 py-4 text-xs font-medium text-[#4B5563]">
                  {row.date}
                </td>
                <td className="px-4 py-4 text-xs font-medium text-[#111827]">
                  {row.subject}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-4 text-center relative">
                  <button
                    onClick={() =>
                      setActiveMenuId(activeMenuId === row.id ? null : row.id)
                    }
                    className="p-1.5 text-[#9CA3AF] hover:text-[#111827] rounded hover:bg-gray-100 transition-colors"
                    aria-label="Actions"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Dropdown Action Menu */}
                  {activeMenuId === row.id && (
                    <div className="absolute right-6 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-xl py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                        Change Status
                      </div>
                      <button
                        onClick={() => updateStatus(row.id, "APPROVED")}
                        className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2 text-left"
                      >
                        <CheckCircle2 size={13} className="text-amber-600" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(row.id, "CONTACTED")}
                        className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-800 flex items-center gap-2 text-left"
                      >
                        <Clock size={13} className="text-blue-600" />
                        Mark Contacted
                      </button>
                      <button
                        onClick={() => updateStatus(row.id, "COMPLETED")}
                        className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2 text-left"
                      >
                        <CheckCircle2 size={13} className="text-gray-500" />
                        Mark Completed
                      </button>
                      <button
                        onClick={() => updateStatus(row.id, "CANCELLED")}
                        className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 text-left"
                      >
                        <XCircle size={13} className="text-red-500" />
                        Cancel Request
                      </button>

                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 text-left font-medium"
                      >
                        <Trash2 size={13} />
                        Delete Request
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
