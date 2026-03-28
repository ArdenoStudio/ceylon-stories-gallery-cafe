"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  Building2,
  Cpu,
  ShoppingBag,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";

/**
 * Dashboard Layout — macOS-style frosted glass sidebar.
 * Lucide animated icons, reddish-orange active state.
 */

const NAV_ITEMS = [
  { href: "/dashboard",             label: "Sentient Stream",   icon: Activity    },
  { href: "/dashboard/tenants",     label: "Agency Tenants",    icon: Building2   },
  { href: "/dashboard/health",      label: "LLM Health",        icon: Cpu         },
  { href: "/dashboard/marketplace", label: "Skill Market",      icon: ShoppingBag },
  { href: "/dashboard/analytics",   label: "Live ROI",          icon: TrendingUp  },
  { href: "/dashboard/components",  label: "Component Market",  icon: LayoutGrid  },
];

const gentleSpring = { type: "spring", stiffness: 300, damping: 30 } as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#000" }}>
      {/* Sidebar */}
      <aside
        className="w-60 h-full flex flex-col shrink-0"
        style={{
          background: "rgba(16, 16, 18, 0.90)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderRight: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5">
          <h1
            className="font-bold text-white"
            style={{ fontSize: "15px", letterSpacing: "-0.02em" }}
          >
            Ardeno OS
          </h1>
          <p className="type-caption text-white/30 mt-0.5">
            MiroFish x Sentient Agency v4.4
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", marginInline: "20px" }} />

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* System Pulse */}
        <div className="p-3 pb-6">
          <div
            className="px-3.5 py-3 rounded-apple"
            style={{
              background: "rgba(255,77,48,0.08)",
              border: "0.5px solid rgba(255,77,48,0.16)",
            }}
          >
            <p className="type-caption text-[#ff4d30] mb-1.5">System Pulse</p>
            <div className="flex items-center gap-2">
              <span className="status-dot active" />
              <span className="text-white/70 font-medium" style={{ fontSize: "12px" }}>
                99.4% Efficiency
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(255,77,48,0.05) 0%, transparent 55%), #000",
        }}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.97 }}
        transition={gentleSpring}
        className="flex items-center gap-3 px-3 py-2.5 rounded-apple cursor-pointer"
        style={
          isActive
            ? {
                background: "rgba(255,77,48,0.12)",
                border: "0.5px solid rgba(255,77,48,0.20)",
                color: "#ff4d30",
              }
            : {
                color: "rgba(255,255,255,0.50)",
                border: "0.5px solid transparent",
              }
        }
      >
        <Icon
          size={15}
          strokeWidth={isActive ? 2.2 : 1.8}
          style={{ transition: "color 0.2s ease" }}
        />
        <span
          style={{
            fontSize: "13px",
            fontWeight: isActive ? 600 : 500,
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </span>
      </motion.div>
    </Link>
  );
}
