"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Users,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Cases", href: "/admin/cases", icon: Briefcase },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
      localStorage.removeItem("admin_user");
    }
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
      {/* Header with Logo */}
      <div className="px-6 pt-7 pb-5 border-b border-[#F3F4F6]">
        <Link href="/" className="block mb-2">
          <div className="relative h-14 w-52">
            <Image
              src="/attorney-logo.png"
              alt="MULUALEM DEMISSIE ZERIHUN - Lawyer and Attorney"
              fill
              className="object-contain object-left"
              unoptimized
            />
          </div>
        </Link>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
          Admin Portal • Practice Management
        </p>
      </div>

      {/* New Case Button */}
      <div className="px-6 pt-5 pb-4">
        <Link
          href="/admin/cases/new"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#0C0E1C] text-white text-xs font-bold rounded-sm hover:bg-black transition-colors tracking-widest uppercase text-center cursor-pointer"
        >
          <Plus size={14} />
          NEW CASE
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3.5 px-6 py-3 text-xs font-semibold tracking-wide transition-colors relative ${
                    isActive
                      ? "bg-[#F3F4F6] text-[#111827] border-l-2 border-[#111827]"
                      : "text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#111827]" : "text-[#6B7280]"} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className="px-6 pb-8 mt-auto border-t border-[#E5E7EB] pt-4 space-y-2">
        <Link
          href="/admin/support"
          className={`flex items-center gap-3 py-2 text-xs font-medium transition-colors ${
            pathname === "/admin/support"
              ? "text-[#111827] font-semibold"
              : "text-[#4B5563] hover:text-[#111827]"
          }`}
        >
          <HelpCircle size={16} className="text-[#6B7280]" />
          Support
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 transition-colors w-full text-left cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
