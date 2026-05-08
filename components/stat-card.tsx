import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-xl bg-card p-6 shadow-sm border border-light-blue/30",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "mt-1 text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-500"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className="rounded-lg bg-navy/10 p-3">
          <Icon className="h-6 w-6 text-navy" />
        </div>
      </div>
    </div>
  )
}
