"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Calendar, MessageSquare, Folder, Plus } from "lucide-react";
import StatCard from "./components/StatCard";
import ConsultationTable from "./components/ConsultationTable";
import UpcomingCard from "./components/UpcomingCard";

export default function AdminDashboardPage() {
  const [requestCount, setRequestCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/consultations", { cache: "no-store" });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setRequestCount(json.data.length);
        }
      } catch {
        // Default
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <main className="p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Welcome, Mulualem Demissie Zerihun
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Here is what&apos;s happening with your legal practice today.
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

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="NEW REQUESTS"
            value={loading ? "..." : String(requestCount)}
            subtitle={requestCount === 0 ? "Inbox up to date" : `${requestCount} active inquiries`}
            subtitleColor={requestCount > 0 ? "#16A34A" : "#6B7280"}
            icon={Mail}
            iconColor="#F59E0B"
            href="/admin/consultations"
          />
          <StatCard
            label="UPCOMING APPOINTMENTS"
            value="0"
            subtitle="No pending schedule"
            subtitleColor="#6B7280"
            icon={Calendar}
            iconColor="#F59E0B"
            href="/admin/appointments"
          />
          <StatCard
            label="UNREAD MESSAGES"
            value="0"
            subtitle="All messages reviewed"
            subtitleColor="#6B7280"
            icon={MessageSquare}
            iconColor="#F59E0B"
            href="/admin/messages"
          />
          <StatCard
            label="ACTIVE CASES"
            value="0"
            subtitle="Register new cases"
            subtitleColor="#6B7280"
            icon={Folder}
            iconColor="#F59E0B"
            href="/admin/cases"
          />
        </div>

        {/* Main Grid: Consultation Requests (2/3) + Upcoming (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <ConsultationTable limit={4} showViewAll={true} />
          </div>
          <div className="lg:col-span-1">
            <UpcomingCard />
          </div>
        </div>
      </div>
    </main>
  );
}
