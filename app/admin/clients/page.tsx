"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Search, Plus, Mail, Phone } from "lucide-react";

export interface ClientItem {
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

export default function ClientsPage() {
  const [clients] = useState<ClientItem[]>([]);
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

        {/* Clients Table / Empty State */}
        {filteredClients.length > 0 ? (
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
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#111827]">{client.name}</p>
                      </td>
                      <td className="px-4 py-4 text-xs">{client.email}</td>
                      <td className="px-4 py-4 text-center text-xs">{client.activeCases}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                          {client.status}
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
              <Users size={22} />
            </div>
            <h3 className="text-base font-bold text-[#111827]">No clients registered yet</h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Clients are automatically added when consultation requests are approved or cases are opened.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
