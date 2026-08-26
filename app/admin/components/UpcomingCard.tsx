"use client";

import Link from "next/link";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

export interface AppointmentItem {
  id: string;
  month: string;
  day: string;
  title: string;
  client: string;
  time: string;
}

export default function UpcomingCard() {
  const appointments: AppointmentItem[] = [];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-6">
          <h2
            className="text-xl font-bold text-[#1F2937]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Upcoming Schedule
          </h2>
          <CalendarIcon className="w-5 h-5 text-[#374151]" />
        </div>

        {/* Appointment items list or clean empty state */}
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((apt) => (
              <Link
                key={apt.id}
                href={`/admin/appointments/${apt.id}`}
                className="flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-[#F9FAFB] transition-colors group"
              >
                <div className="flex flex-col items-center justify-center bg-[#F9FAFB] group-hover:bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 min-w-[54px] transition-colors">
                  <span className="text-[11px] font-semibold text-[#DC2626] uppercase tracking-wider">
                    {apt.month}
                  </span>
                  <span className="text-base font-bold text-[#111827]">
                    {apt.day}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#111827] leading-tight truncate group-hover:text-[#B8860B] transition-colors">
                    {apt.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1 truncate">
                    {apt.client} • {apt.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-gray-500 font-medium">
              No appointments scheduled for today
            </p>
            <Link
              href="/admin/consultations/new"
              className="mt-2 text-xs font-bold text-[#B8860B] hover:underline flex items-center gap-1 uppercase tracking-wider"
            >
              <Plus size={13} />
              Schedule appointment
            </Link>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="pt-6">
        <Link
          href="/admin/appointments"
          className="flex items-center justify-center w-full py-2.5 px-4 border border-[#111827] text-xs font-bold tracking-widest text-[#111827] hover:bg-[#111827] hover:text-white transition-colors duration-200 uppercase rounded-sm text-center"
        >
          VIEW CALENDAR
        </Link>
      </div>
    </div>
  );
}
