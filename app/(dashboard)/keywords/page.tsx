"use client"

import { useState } from "react"
import { Plus, Search, TrendingUp, TrendingDown, Minus, Filter, RefreshCw, Target } from "lucide-react"
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
import { Label } from "@/components/ui/label"

interface Keyword {
  id: number
  keyword: string
  client: string
  position: number
  previousPosition: number
  volume: number
  difficulty: "easy" | "medium" | "hard"
  lastUpdated: string
}

const keywords: Keyword[] = [
  { id: 1, keyword: "dentist near me", client: "Sunrise Dental", position: 3, previousPosition: 5, volume: 14800, difficulty: "hard", lastUpdated: "2 hours ago" },
  { id: 2, keyword: "teeth whitening denver", client: "Sunrise Dental", position: 5, previousPosition: 4, volume: 2400, difficulty: "medium", lastUpdated: "2 hours ago" },
  { id: 3, keyword: "emergency dental care", client: "Sunrise Dental", position: 2, previousPosition: 3, volume: 3600, difficulty: "medium", lastUpdated: "2 hours ago" },
  { id: 4, keyword: "gym membership denver", client: "Peak Fitness", position: 8, previousPosition: 12, volume: 5400, difficulty: "hard", lastUpdated: "3 hours ago" },
  { id: 5, keyword: "personal trainer boulder", client: "Peak Fitness", position: 4, previousPosition: 4, volume: 1200, difficulty: "medium", lastUpdated: "3 hours ago" },
  { id: 6, keyword: "real estate agent denver", client: "Mountain View Realty", position: 15, previousPosition: 18, volume: 8100, difficulty: "hard", lastUpdated: "4 hours ago" },
  { id: 7, keyword: "homes for sale boulder", client: "Mountain View Realty", position: 6, previousPosition: 7, volume: 4500, difficulty: "medium", lastUpdated: "4 hours ago" },
  { id: 8, keyword: "hvac repair aurora", client: "Green Valley HVAC", position: 2, previousPosition: 2, volume: 1800, difficulty: "easy", lastUpdated: "5 hours ago" },
  { id: 9, keyword: "ac installation denver", client: "Green Valley HVAC", position: 7, previousPosition: 9, volume: 2900, difficulty: "medium", lastUpdated: "5 hours ago" },
  { id: 10, keyword: "emergency plumber denver", client: "City Plumbing", position: 1, previousPosition: 1, volume: 6600, difficulty: "hard", lastUpdated: "6 hours ago" },
  { id: 11, keyword: "plumbing services lakewood", client: "City Plumbing", position: 3, previousPosition: 5, volume: 890, difficulty: "easy", lastUpdated: "6 hours ago" },
  { id: 12, keyword: "interior designer denver", client: "Cozy Home Interiors", position: 12, previousPosition: 10, volume: 2100, difficulty: "medium", lastUpdated: "6 hours ago" },
]

const difficultyColors = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-burnt-orange/10 text-burnt-orange",
}

export default function KeywordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clientFilter, setClientFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const clients = [...new Set(keywords.map(k => k.client))]

  const filteredKeywords = keywords.filter(kw => {
    const matchesSearch = kw.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClient = clientFilter === "all" || kw.client === clientFilter
    return matchesSearch && matchesClient
  })

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current
    if (change > 0) return { icon: TrendingUp, color: "text-green-600", text: `+${change}` }
    if (change < 0) return { icon: TrendingDown, color: "text-burnt-orange", text: `${change}` }
    return { icon: Minus, color: "text-muted-foreground", text: "0" }
  }

  // Stats
  const improved = keywords.filter(k => k.position < k.previousPosition).length
  const declined = keywords.filter(k => k.position > k.previousPosition).length
  const top3 = keywords.filter(k => k.position <= 3).length

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            KEYWORDS
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track keyword rankings and research opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-navy text-navy">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Keyword
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
                  ADD NEW KEYWORD
                </DialogTitle>
              </DialogHeader>
              <form className="mt-4 space-y-4">
                <div>
                  <Label>Client</Label>
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
                  <Label>Keyword</Label>
                  <Input placeholder="Enter keyword to track" className="mt-1" />
                </div>
                <div>
                  <Label>Target Position (Optional)</Label>
                  <Input type="number" placeholder="e.g., 3" className="mt-1" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-navy hover:bg-navy/90">
                    Add Keyword
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-navy/10 p-2">
              <Target className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Tracked</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">{keywords.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <TrendingUp className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Improved</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">{improved}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-burnt-orange/10 p-2">
              <TrendingDown className="h-5 w-5 text-burnt-orange" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Declined</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">{declined}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-light-blue/30 p-2">
              <Search className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top 3 Rankings</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">{top3}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-56">
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
      </div>

      {/* Keywords Table */}
      <div className="rounded-xl border border-light-blue/30 bg-card shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-light-blue/30 bg-off-white/50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Keyword
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Client
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Position
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Change
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Volume
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Difficulty
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-blue/30">
            {filteredKeywords.map((kw) => {
              const change = getPositionChange(kw.position, kw.previousPosition)
              const ChangeIcon = change.icon
              return (
                <tr key={kw.id} className="hover:bg-off-white/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-navy/10 p-2">
                        <Search className="h-4 w-4 text-navy" />
                      </div>
                      <span className="font-medium text-navy">{kw.keyword}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-light-blue/30 px-3 py-1 text-xs font-medium text-navy">
                      {kw.client}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                      kw.position <= 3 ? "bg-green-100 text-green-700" :
                      kw.position <= 10 ? "bg-light-blue/30 text-navy" :
                      "bg-sand text-navy"
                    }`}>
                      {kw.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-1 ${change.color}`}>
                      <ChangeIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{change.text}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {kw.volume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[kw.difficulty]}`}>
                      {kw.difficulty.charAt(0).toUpperCase() + kw.difficulty.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-muted-foreground">
                    {kw.lastUpdated}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
