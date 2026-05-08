import { Users, CheckSquare, Calendar, MessageSquare, Clock, FileText, Star } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { SageChat } from "@/components/sage-chat"

const recentActivity = [
  { id: 1, action: "Published GBP post", client: "Sunrise Dental", user: "Sarah M.", time: "10 min ago", icon: FileText },
  { id: 2, action: "Responded to review", client: "Peak Fitness", user: "Mike T.", time: "25 min ago", icon: Star },
  { id: 3, action: "Completed keyword research", client: "Green Valley HVAC", user: "Emily R.", time: "1 hour ago", icon: CheckSquare },
  { id: 4, action: "Sent weekly report", client: "City Plumbing", user: "John M.", time: "2 hours ago", icon: Calendar },
]

const tasksDueToday = [
  { id: 1, client: "Sunrise Dental", task: "Write blog post on teeth whitening", assignee: "Sarah M.", priority: "high" },
  { id: 2, client: "Peak Fitness", task: "Respond to 3-star review", assignee: "Mike T.", priority: "high" },
  { id: 3, client: "Mountain View Realty", task: "Update GBP photos", assignee: "Emily R.", priority: "medium" },
  { id: 4, client: "Green Valley HVAC", task: "Create seasonal promotion post", assignee: "Sarah M.", priority: "medium" },
  { id: 5, client: "City Plumbing", task: "Keyword position check", assignee: "John M.", priority: "low" },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            {getGreeting().toUpperCase()}, HERE&apos;S WHAT NEEDS ATTENTION TODAY
          </h1>
          <p className="mt-1 text-muted-foreground">
            Thursday, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <StatCard 
            title="Total Clients" 
            value={24} 
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Tasks Due Today" 
            value={5} 
            icon={CheckSquare}
          />
          <StatCard 
            title="Posts Scheduled" 
            value={12} 
            icon={Calendar}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard 
            title="Reviews Pending" 
            value={3} 
            icon={MessageSquare}
          />
        </div>

        {/* Recent Activity & Tasks Due */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              RECENT ACTIVITY
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-lg bg-navy/10 p-2">
                      <Icon className="h-4 w-4 text-navy" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.client} · {activity.user}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tasks Due Today */}
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              TASKS DUE TODAY
            </h2>
            <div className="space-y-3">
              {tasksDueToday.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center gap-3 rounded-lg border border-light-blue/30 bg-off-white/50 p-3"
                >
                  <div className={`h-2 w-2 rounded-full ${
                    task.priority === "high" ? "bg-burnt-orange" :
                    task.priority === "medium" ? "bg-slate-blue" : "bg-light-blue"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-navy">
                      {task.task}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {task.client}
                    </p>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-medium text-white">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sage Chat Panel */}
      <div className="w-80 shrink-0">
        <div className="sticky top-8 h-[calc(100vh-8rem)]">
          <SageChat />
        </div>
      </div>
    </div>
  )
}
