import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
  icon: LucideIcon;
  iconColor?: string;
  href?: string;
}

export default function StatCard({
  label,
  value,
  subtitle,
  subtitleColor = "#6B7280",
  icon: Icon,
  iconColor = "#F59E0B",
  href,
}: StatCardProps) {
  const content = (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between h-[155px] hover:border-[#111827] hover:shadow-xs transition-all duration-150">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
          {label}
        </p>
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div>
        <p
          className="text-4xl font-bold text-[#111827] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-xs font-medium mt-1.5" style={{ color: subtitleColor }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}
