"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, Clock, MapPin, User, ArrowUpRight } from "lucide-react";

export interface AppointmentRecord {
  id: string;
  month: string;
  day: string;
  year: string;
  time: string;
  title: string;
  client: string;
  email: string;
  phone: string;
  location: string;
  practiceArea: string;
  status: "CONFIRMED" | "COMPLETED" | "RESCHEDULED" | "CANCELLED";
  notes?: string;
}

export const initialAppointmentsList: AppointmentRecord[] = [];

export default function AppointmentsPage() {
  const [appointments] = useState<AppointmentRecord[]>([]);

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
              Appointments &amp; Schedule
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Confirmed consultations, client reviews, and court preparations.
            </p>
          </div>

          <Link
            href="/admin/consultations/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors tracking-widest uppercase self-start sm:self-auto cursor-pointer"
          >
            <Plus size={15} />
            SCHEDULE APPOINTMENT
          </Link>
        </div>

        {/* Appointments List Grid / Empty State */}
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((apt) => (
              <Link
                key={apt.id}
                href={`/admin/appointments/${apt.id}`}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between hover:border-[#111827] hover:shadow-xs transition-all duration-150 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5 min-w-[50px]">
                        <span className="text-[10px] font-bold text-[#DC2626] uppercase">
                          {apt.month}
                        </span>
                        <span className="text-base font-bold text-[#111827]">
                          {apt.day}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-mono">
                          {apt.year}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#111827]">
                          <Clock size={12} className="text-[#B8860B]" />
                          {apt.time}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-green-50 text-green-700 border border-green-200 uppercase">
                      {apt.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#111827] group-hover:text-[#B8860B] transition-colors leading-snug">
                      {apt.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#4B5563] mt-1.5">
                      <User size={13} className="text-gray-400" />
                      <span>{apt.client}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1">
                      <MapPin size={13} className="text-gray-400" />
                      <span className="truncate">{apt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
                  <span>View Details</span>
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <Calendar size={22} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">No upcoming appointments scheduled</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Approved consultation requests will appear on your appointments calendar.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
