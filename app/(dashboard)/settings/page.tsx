"use client"

import { useState } from "react"
import { User, Bell, Shield, Palette, Users, Building, Save, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const teamMembers = [
  { id: 1, name: "John McWilliams", email: "john@mcwilliamsmedia.com", role: "Admin", avatar: "JM" },
  { id: 2, name: "Sarah Mitchell", email: "sarah@mcwilliamsmedia.com", role: "Content Manager", avatar: "SM" },
  { id: 3, name: "Mike Thompson", email: "mike@mcwilliamsmedia.com", role: "SEO Specialist", avatar: "MT" },
  { id: 4, name: "Emily Rodriguez", email: "emily@mcwilliamsmedia.com", role: "Account Manager", avatar: "ER" },
]

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [reviewAlerts, setReviewAlerts] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
          SETTINGS
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border border-light-blue/30">
          <TabsTrigger value="profile" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="agency" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            <Building className="mr-2 h-4 w-4" />
            Agency
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <h2 className="mb-6 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              PROFILE INFORMATION
            </h2>
            <form className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-burnt-orange text-2xl font-bold text-white">
                  JM
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input defaultValue="John" className="mt-1" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input defaultValue="McWilliams" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue="john@mcwilliamsmedia.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input defaultValue="Admin" disabled className="mt-1 bg-off-white" />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-light-blue/30 pt-6">
                <h3 className="mb-4 font-[var(--font-bebas)] text-lg text-navy">CHANGE PASSWORD</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div></div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-navy hover:bg-navy/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <h2 className="mb-6 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              NOTIFICATION PREFERENCES
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">Review Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when clients receive new reviews</p>
                </div>
                <Switch checked={reviewAlerts} onCheckedChange={setReviewAlerts} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">Task Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive reminders for upcoming task deadlines</p>
                </div>
                <Switch checked={taskReminders} onCheckedChange={setTaskReminders} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">Get a weekly summary of all client activity</p>
                </div>
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </div>

              <div className="border-t border-light-blue/30 pt-6">
                <h3 className="mb-4 font-[var(--font-bebas)] text-lg text-navy">ALERT THRESHOLDS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Negative Review Alert (Stars)</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 star only</SelectItem>
                        <SelectItem value="2">2 stars or less</SelectItem>
                        <SelectItem value="3">3 stars or less</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Task Reminder (Hours Before)</Label>
                    <Select defaultValue="24">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-navy hover:bg-navy/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-[var(--font-bebas)] text-xl tracking-wide text-navy">
                TEAM MEMBERS
              </h2>
              <Button className="bg-navy hover:bg-navy/90">
                <Plus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border border-light-blue/30 bg-off-white/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-sm font-medium text-white">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-navy">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      member.role === "Admin" 
                        ? "bg-burnt-orange/10 text-burnt-orange"
                        : "bg-light-blue/30 text-navy"
                    }`}>
                      {member.role}
                    </span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Agency Tab */}
        <TabsContent value="agency">
          <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
            <h2 className="mb-6 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              AGENCY SETTINGS
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Agency Name</Label>
                  <Input defaultValue="McWilliams Media" className="mt-1" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="(555) 123-4567" className="mt-1" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue="hello@mcwilliamsmedia.com" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Marketing Ave, Denver, CO 80202" className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label>Website</Label>
                  <Input defaultValue="https://mcwilliamsmedia.com" className="mt-1" />
                </div>
              </div>

              <div className="border-t border-light-blue/30 pt-6">
                <h3 className="mb-4 font-[var(--font-bebas)] text-lg text-navy">SERVICE TIERS</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Configure your service tier options for client packages
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-off-white p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-navy" />
                      <span className="font-medium text-navy">Top Tier</span>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-off-white p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-slate-blue" />
                      <span className="font-medium text-navy">Mid Tier</span>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-off-white p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-light-blue" />
                      <span className="font-medium text-navy">Location Package</span>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-off-white p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-sand" />
                      <span className="font-medium text-navy">Basic</span>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-navy hover:bg-navy/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
