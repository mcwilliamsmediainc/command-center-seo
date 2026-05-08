"use client"

import { useState } from "react"
import { Plus, FileText, MapPin, Star, Search, Filter, Calendar, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TaskCategory = "content" | "gbp" | "reviews" | "seo"
type TaskPriority = "high" | "medium" | "low"
type TaskStatus = "todo" | "in-progress" | "done"

interface Task {
  id: number
  category: TaskCategory
  client: string
  description: string
  assignee: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus
}

const initialTasks: Task[] = [
  { id: 1, category: "content", client: "Sunrise Dental", description: "Write blog post on teeth whitening benefits", assignee: "Sarah M.", dueDate: "Today", priority: "high", status: "todo" },
  { id: 2, category: "reviews", client: "Peak Fitness", description: "Respond to 3-star review from John D.", assignee: "Mike T.", dueDate: "Today", priority: "high", status: "todo" },
  { id: 3, category: "gbp", client: "Mountain View Realty", description: "Update GBP photos with new listings", assignee: "Emily R.", dueDate: "Tomorrow", priority: "medium", status: "todo" },
  { id: 4, category: "content", client: "Green Valley HVAC", description: "Create seasonal AC maintenance post", assignee: "Sarah M.", dueDate: "May 10", priority: "medium", status: "in-progress" },
  { id: 5, category: "seo", client: "City Plumbing", description: "Keyword position tracking report", assignee: "John M.", dueDate: "May 11", priority: "low", status: "in-progress" },
  { id: 6, category: "gbp", client: "Sunrise Dental", description: "Post weekly promotion update", assignee: "Sarah M.", dueDate: "May 9", priority: "medium", status: "in-progress" },
  { id: 7, category: "reviews", client: "Cozy Home Interiors", description: "Request reviews from recent customers", assignee: "Emily R.", dueDate: "May 8", priority: "low", status: "done" },
  { id: 8, category: "content", client: "Peak Fitness", description: "Summer fitness tips blog post", assignee: "Mike T.", dueDate: "May 7", priority: "medium", status: "done" },
  { id: 9, category: "seo", client: "Mountain View Realty", description: "On-page optimization for listings page", assignee: "John M.", dueDate: "May 6", priority: "high", status: "done" },
]

const categoryConfig = {
  content: { icon: FileText, color: "border-l-navy", label: "Content" },
  gbp: { icon: MapPin, color: "border-l-slate-blue", label: "GBP" },
  reviews: { icon: Star, color: "border-l-amber-500", label: "Reviews" },
  seo: { icon: Search, color: "border-l-light-blue", label: "SEO" },
}

const priorityConfig = {
  high: { color: "bg-red-500 text-white", label: "High" },
  medium: { color: "bg-slate-blue text-white", label: "Medium" },
  low: { color: "bg-light-blue text-navy", label: "Low" },
}

const columns = [
  { id: "todo" as TaskStatus, title: "TO DO" },
  { id: "in-progress" as TaskStatus, title: "IN PROGRESS" },
  { id: "done" as TaskStatus, title: "DONE" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterClient, setFilterClient] = useState("all")
  const [filterAssignee, setFilterAssignee] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredTasks = tasks.filter(task => {
    const matchesClient = filterClient === "all" || task.client === filterClient
    const matchesAssignee = filterAssignee === "all" || task.assignee === filterAssignee
    const matchesCategory = filterCategory === "all" || task.category === filterCategory
    return matchesClient && matchesAssignee && matchesCategory
  })

  const getTasksByStatus = (status: TaskStatus) => 
    filteredTasks.filter(task => task.status === status)

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const clients = [...new Set(tasks.map(t => t.client))]
  const assignees = [...new Set(tasks.map(t => t.assignee))]

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            TASK BOARD
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage tasks across all clients
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
                CREATE NEW TASK
              </DialogTitle>
            </DialogHeader>
            <form className="mt-4 space-y-4">
              <div>
                <Label htmlFor="taskClient">Client</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="taskCategory">Category</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea 
                  id="taskDescription" 
                  placeholder="Describe the task..." 
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskAssignee">Assignee</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignees.map(assignee => (
                        <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taskPriority">Priority</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Set priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="taskDueDate">Due Date</Label>
                <Input id="taskDueDate" type="date" className="mt-1" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy/90">
                  Create Task
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-3">
        <Select value={filterClient} onValueChange={setFilterClient}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {clients.map(client => (
              <SelectItem key={client} value={client}>{client}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAssignee} onValueChange={setFilterAssignee}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Team Members</SelectItem>
            {assignees.map(assignee => (
              <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="content">Content</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
            <SelectItem value="reviews">Reviews</SelectItem>
            <SelectItem value="seo">SEO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-[var(--font-bebas)] text-xl tracking-wide text-navy">
                {column.title}
              </h2>
              <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-sm font-medium text-navy">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            {/* Task Cards */}
            <div className="flex-1 space-y-3 rounded-xl bg-off-white/50 p-3">
              {getTasksByStatus(column.id).map((task) => {
                const CategoryIcon = categoryConfig[task.category].icon
                return (
                  <div
                    key={task.id}
                    className={`rounded-lg border-l-4 bg-card p-4 shadow-sm ${categoryConfig[task.category].color}`}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded bg-navy/10 p-1.5">
                          <CategoryIcon className="h-3.5 w-3.5 text-navy" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {categoryConfig[task.category].label}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {column.id !== "todo" && (
                            <DropdownMenuItem onClick={() => moveTask(task.id, "todo")}>
                              Move to To Do
                            </DropdownMenuItem>
                          )}
                          {column.id !== "in-progress" && (
                            <DropdownMenuItem onClick={() => moveTask(task.id, "in-progress")}>
                              Move to In Progress
                            </DropdownMenuItem>
                          )}
                          {column.id !== "done" && (
                            <DropdownMenuItem onClick={() => moveTask(task.id, "done")}>
                              Move to Done
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="mb-2 text-sm font-medium text-navy">
                      {task.description}
                    </p>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {task.client}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-medium text-white">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${priorityConfig[task.priority].color}`}>
                          {priorityConfig[task.priority].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                )
              })}
              {getTasksByStatus(column.id).length === 0 && (
                <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-light-blue/50">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
