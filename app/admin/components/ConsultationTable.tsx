"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  RefreshCw,
  Loader2,
} from "lucide-react";

export interface ConsultationRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  subject: string;
  status: "PENDING" | "APPROVED" | "CONTACTED" | "COMPLETED" | "CANCELLED";
}

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
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#F0FDF4] text-[#166534] uppercase border border-[#BBF7D0]">
      COMPLETED
    </span>
  );
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ConsultationTable({
  limit,
  showViewAll = true,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const [data, setData] = useState<ConsultationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/consultations", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: ConsultationRow[] = json.data.map((item: {
          id: string;
          name: string;
          email: string;
          phone?: string;
          date?: string;
          createdAt?: string;
          subject?: string;
          practiceArea?: string;
          status?: string;
        }) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          date: formatDate(item.date || item.createdAt || new Date().toISOString()),
          subject: item.subject || item.practiceArea || "General Inquiry",
          status: (item.status as ConsultationRow["status"]) || "PENDING",
        }));
        setData(mapped);
      } else {
        setError("Failed to load consultations.");
      }
    } catch {
      setError("Network error — could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

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
          {data.length > 0 && (
            <span className="ml-2 text-xs font-bold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full border border-[#FDE68A]">
              {data.filter((d) => d.status === "PENDING").length} NEW
            </span>
          )}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchConsultations}
            className="p-1.5 text-gray-400 hover:text-[#111827] rounded hover:bg-gray-100 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          {showViewAll && (
            <Link
              href="/admin/consultations"
              className="text-xs font-bold text-[#111827] underline underline-offset-4 hover:text-[#B8860B] transition-colors uppercase tracking-wider"
            >
              VIEW ALL
            </Link>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16 gap-2 text-gray-400 text-sm">
          <Loader2 size={18} className="animate-spin" />
          <span>Loading consultations...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-sm text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchConsultations}
            className="px-4 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md hover:bg-red-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
          <p className="text-sm font-semibold text-gray-700">No consultations yet</p>
          <p className="text-xs text-gray-400">
            New requests from the website will appear here automatically.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && displayData.length > 0 && (
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
                    <p className="text-sm font-semibold text-[#111827]">{row.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{row.email}</p>
                    {row.phone && (
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{row.phone}</p>
                    )}
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

                    {activeMenuId === row.id && (
                      <div className="absolute right-6 mt-1 w-44 bg-white border border-[#E5E7EB] rounded-lg shadow-xl py-1.5 z-30 text-left">
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
                          className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-800 flex items-center gap-2 text-left"
                        >
                          <CheckCircle2 size={13} className="text-green-600" />
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
      )}
    </div>
  );
}
