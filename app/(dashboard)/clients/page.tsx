"use client"

import { useState } from "react"
import { Plus, Search, Star, MapPin, Globe, Filter } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

const clients = [
  {
    id: 1,
    name: "Sunrise Dental",
    tier: "Top Tier",
    profileCompletion: 95,
    taskProgress: 85,
    rating: 4.8,
    status: "active",
    address: "123 Main St, Denver, CO",
    assignee: "Sarah M."
  },
  {
    id: 2,
    name: "Peak Fitness",
    tier: "Top Tier",
    profileCompletion: 100,
    taskProgress: 70,
    rating: 4.6,
    status: "attention",
    address: "456 Oak Ave, Boulder, CO",
    assignee: "Mike T."
  },
  {
    id: 3,
    name: "Mountain View Realty",
    tier: "Mid Tier",
    profileCompletion: 88,
    taskProgress: 90,
    rating: 4.9,
    status: "active",
    address: "789 Pine Rd, Denver, CO",
    assignee: "Emily R."
  },
  {
    id: 4,
    name: "Green Valley HVAC",
    tier: "Mid Tier",
    profileCompletion: 75,
    taskProgress: 60,
    rating: 4.4,
    status: "attention",
    address: "321 Elm St, Aurora, CO",
    assignee: "John M."
  },
  {
    id: 5,
    name: "City Plumbing",
    tier: "Location Package",
    profileCompletion: 92,
    taskProgress: 95,
    rating: 4.7,
    status: "active",
    address: "555 Water Way, Lakewood, CO",
    assignee: "Sarah M."
  },
  {
    id: 6,
    name: "Cozy Home Interiors",
    tier: "Basic",
    profileCompletion: 65,
    taskProgress: 45,
    rating: 4.2,
    status: "attention",
    address: "888 Design Blvd, Denver, CO",
    assignee: "Emily R."
  },
]

const tierColors: Record<string, string> = {
  "Top Tier": "bg-navy text-white",
  "Mid Tier": "bg-slate-blue text-white",
  "Location Package": "bg-light-blue text-navy",
  "Basic": "bg-sand text-navy",
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tierFilter, setTierFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTier = tierFilter === "all" || client.tier === tierFilter
    return matchesSearch && matchesTier
  })

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            CLIENTS
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your client portfolio and profiles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-navy hover:bg-navy/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
                ONBOARD NEW CLIENT
              </DialogTitle>
            </DialogHeader>
            <form className="mt-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Enter business name" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Full business address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 555-5555" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="tier">Service Tier</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top Tier</SelectItem>
                      <SelectItem value="mid">Mid Tier</SelectItem>
                      <SelectItem value="location">Location Package</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignee">Assigned Team Member</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah M.</SelectItem>
                      <SelectItem value="mike">Mike T.</SelectItem>
                      <SelectItem value="emily">Emily R.</SelectItem>
                      <SelectItem value="john">John M.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="gbpLogin">GBP Login Credentials</Label>
                  <Input id="gbpLogin" placeholder="Google Business Profile email" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="wpLogin">WordPress Login</Label>
                  <Input id="wpLogin" placeholder="WordPress admin URL and credentials" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="keywords">Target Keywords</Label>
                  <Textarea 
                    id="keywords" 
                    placeholder="Enter target keywords, separated by commas" 
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Brief description of the business" 
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy/90">
                  Create Client
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="Top Tier">Top Tier</SelectItem>
            <SelectItem value="Mid Tier">Mid Tier</SelectItem>
            <SelectItem value="Location Package">Location Package</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-[var(--font-bebas)] text-xl tracking-wide text-navy">
                  {client.name.toUpperCase()}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {client.address}
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                client.status === "active" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-amber-100 text-amber-700"
              }`}>
                {client.status === "active" ? "Active" : "Needs Attention"}
              </span>
            </div>

            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${tierColors[client.tier]}`}>
                {client.tier}
              </span>
            </div>

            <div className="space-y-3">
              {/* Rating */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Google Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-navy">{client.rating}</span>
                </div>
              </div>

              {/* Profile Completion */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="font-medium text-navy">{client.profileCompletion}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-light-blue/30">
                  <div 
                    className="h-full rounded-full bg-navy transition-all"
                    style={{ width: `${client.profileCompletion}%` }}
                  />
                </div>
              </div>

              {/* Task Progress */}
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Tasks</span>
                  <span className="font-medium text-navy">{client.taskProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-light-blue/30">
                  <div 
                    className="h-full rounded-full bg-light-blue transition-all"
                    style={{ width: `${client.taskProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-light-blue/30 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-medium text-white">
                  {client.assignee.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm text-muted-foreground">{client.assignee}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-navy hover:text-navy/80">
                <Globe className="mr-1 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
