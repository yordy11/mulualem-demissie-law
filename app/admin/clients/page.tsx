"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Search, MoreVertical, Plus, Mail, Phone } from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  activeCases: number;
  totalConsultations: number;
  lastContact: string;
  status: "ACTIVE" | "INACTIVE";
}

const initialClients: ClientItem[] = [
  {
    id: "1",
    name: "Eleanor Vance",
    email: "e.vance@example.com",
    phone: "+251 911 234 567",
    organization: "Vance Tech Holdings",
    activeCases: 1,
    totalConsultations: 2,
    lastContact: "Oct 24, 2024",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Marcus Sterling",
    email: "m.sterling@example.com",
    phone: "+251 922 345 678",
    organization: "Sterling Enterprises",
    activeCases: 1,
    totalConsultations: 1,
    lastContact: "Oct 23, 2024",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Sophia Chen",
    email: "s.chen@example.com",
    phone: "+251 933 456 789",
    organization: "Chen Properties Ltd",
    activeCases: 1,
    totalConsultations: 3,
    lastContact: "Oct 22, 2024",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "David Roth",
    email: "d.roth@example.com",
    phone: "+251 944 567 890",
    organization: "Roth Logistics",
    activeCases: 1,
    totalConsultations: 1,
    lastContact: "Oct 21, 2024",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Tadesse Wondimu",
    email: "t.wondimu@example.com",
    phone: "+251 955 678 901",
    organization: "Addis Commercial Group",
    activeCases: 0,
    totalConsultations: 2,
    lastContact: "Sep 28, 2024",
    status: "INACTIVE",
  },
];

export default function ClientsPage() {
  const [clients] = useState<ClientItem[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.organization && c.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              Clients Directory
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Individuals and corporate entities represented by Attorney Mulualem Demissie Zerihun.
            </p>
          </div>

          <Link
            href="/admin/cases/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors tracking-widest uppercase self-start sm:self-auto cursor-pointer"
          >
            <Plus size={15} />
            REGISTER CLIENT / CASE
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by client name, email, or organization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:border-[#0C0E1C]"
            />
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F3F4F6]">
                  <th className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    CLIENT &amp; ORGANIZATION
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    CONTACT DETAILS
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    ACTIVE CASES
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    CONSULTATIONS
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    LAST CONTACT
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    STATUS
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-[#F9FAFB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-bold text-xs">
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111827]">
                            {client.name}
                          </p>
                          {client.organization && (
                            <p className="text-xs text-[#6B7280] mt-0.5">
                              {client.organization}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-xs text-[#4B5563]">
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} className="text-[#B8860B]" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-[#B8860B]" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-center text-[#111827]">
                      {client.activeCases}
                    </td>
                    <td className="px-4 py-4 text-xs text-center text-[#4B5563]">
                      {client.totalConsultations}
                    </td>
                    <td className="px-4 py-4 text-xs text-[#6B7280]">
                      {client.lastContact}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          client.status === "ACTIVE"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {client.status}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
