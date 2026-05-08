"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  Star,
  Search,
  BarChart3,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Content", href: "/content", icon: FileText },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Keywords", href: "/keywords", icon: Search },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-navy">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-light-blue">
            <span className="font-[var(--font-bebas)] text-lg font-bold text-white">M</span>
          </div>
          <span className="font-[var(--font-bebas)] text-xl tracking-wide text-white">
            MCWILLIAMS MEDIA
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "border-l-4 border-light-blue bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light-blue text-sm font-medium text-navy">
              JM
            </div>
            <div>
              <p className="text-sm font-medium text-white">John McWilliams</p>
              <p className="text-xs text-white/60">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
