"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { initialAppointmentsList } from "../page";

export default function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const appointment =
    initialAppointmentsList.find((a) => a.id === id) || initialAppointmentsList[0];

  return (
    <main className="p-8 lg:p-10 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/admin/appointments"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Appointments
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-green-50 text-green-700 border border-green-200 uppercase">
                {appointment.status}
              </span>
              <span className="text-xs text-[#6B7280] font-mono">
                APT-REF-{appointment.id.padStart(4, "0")}
              </span>
            </div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {appointment.title}
            </h1>
          </div>

          <button className="px-5 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors uppercase tracking-wider self-start sm:self-auto cursor-pointer">
            Mark Completed
          </button>
        </div>

        {/* Details Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 space-y-8 shadow-xs">
          {/* Section 1: Schedule Details */}
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Schedule &amp; Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#F9FAFB] p-6 rounded-lg border border-gray-100">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Date</p>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">
                    {appointment.month} {appointment.day}, {appointment.year}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Time</p>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">
                    {appointment.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Location</p>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">
                    {appointment.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Client Information */}
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Client &amp; Practice Area
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3.5 p-4 border border-gray-100 rounded-lg">
                <User size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Client Name</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">
                    {appointment.client}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {appointment.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {appointment.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 border border-gray-100 rounded-lg">
                <Briefcase size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Practice Area</p>
                  <p className="text-sm font-semibold text-[#111827] mt-0.5">
                    {appointment.practiceArea}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          {appointment.notes && (
            <div>
              <h2
                className="text-sm font-bold uppercase tracking-wider text-[#B8860B] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Preparation Notes &amp; Objectives
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed">
                {appointment.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
