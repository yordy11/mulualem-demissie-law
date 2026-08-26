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

export const initialAppointmentsList: AppointmentRecord[] = [
  {
    id: "1",
    month: "OCT",
    day: "24",
    year: "2024",
    time: "10:00 AM",
    title: "Initial Consultation",
    client: "Eleanor Vance",
    email: "e.vance@example.com",
    phone: "+251 911 234 567",
    location: "Office 134, Merkato Mall, Addis Ababa",
    practiceArea: "Corporate & Commercial Law",
    status: "CONFIRMED",
    notes: "Review articles of incorporation and shareholder agreement drafts.",
  },
  {
    id: "2",
    month: "OCT",
    day: "24",
    year: "2024",
    time: "2:30 PM",
    title: "Case Review",
    client: "TechCorp Inc. (Marcus Sterling)",
    email: "m.sterling@example.com",
    phone: "+251 922 345 678",
    location: "Conference Room / Virtual",
    practiceArea: "Civil Litigation",
    status: "CONFIRMED",
    notes: "Examine commercial lease dispute evidence and witness depositions.",
  },
  {
    id: "3",
    month: "OCT",
    day: "25",
    year: "2024",
    time: "9:00 AM",
    title: "Deposition Prep",
    client: "Marcus Sterling",
    email: "m.sterling@example.com",
    phone: "+251 922 345 678",
    location: "Office 134, Merkato Mall, Addis Ababa",
    practiceArea: "Civil Litigation",
    status: "CONFIRMED",
    notes: "Pre-trial question preparation and document verification.",
  },
  {
    id: "4",
    month: "OCT",
    day: "28",
    year: "2024",
    time: "11:30 AM",
    title: "Title Deed Verification",
    client: "Sophia Chen",
    email: "s.chen@example.com",
    phone: "+251 933 456 789",
    location: "Office 134, Merkato Mall, Addis Ababa",
    practiceArea: "Property & Real Estate",
    status: "CONFIRMED",
    notes: "Review municipal registry clearance and commercial property contracts.",
  },
  {
    id: "5",
    month: "OCT",
    day: "29",
    year: "2024",
    time: "3:00 PM",
    title: "Commercial Contract Finalization",
    client: "David Roth",
    email: "d.roth@example.com",
    phone: "+251 944 567 890",
    location: "Office 134, Merkato Mall, Addis Ababa",
    practiceArea: "Contract Law",
    status: "CONFIRMED",
    notes: "Final sign-off on nationwide distribution agreement.",
  },
];

export default function AppointmentsPage() {
  const [appointments] = useState<AppointmentRecord[]>(initialAppointmentsList);

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

        {/* Appointments List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <Link
              key={apt.id}
              href={`/admin/appointments/${apt.id}`}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between hover:border-[#111827] hover:shadow-xs transition-all duration-150 group"
            >
              <div className="space-y-4">
                {/* Date Header & Status */}
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

                {/* Title & Client */}
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

                {/* Notes Preview */}
                {apt.notes && (
                  <p className="text-xs text-gray-500 bg-[#F9FAFB] p-2.5 rounded border border-gray-100 line-clamp-2">
                    {apt.notes}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#111827] uppercase tracking-wider">
                <span>View Details</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
