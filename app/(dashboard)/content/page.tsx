"use client"

import { useState } from "react"
import { Plus, Sparkles, ImageIcon, Calendar, FileText, ExternalLink, ChevronLeft, ChevronRight, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const gbpPosts = [
  { id: 1, client: "Sunrise Dental", title: "Summer Smile Special!", date: "May 8", status: "scheduled", image: true },
  { id: 2, client: "Peak Fitness", title: "New Group Classes Starting", date: "May 9", status: "scheduled", image: true },
  { id: 3, client: "Mountain View Realty", title: "Just Listed: Dream Home in Boulder", date: "May 10", status: "draft", image: true },
  { id: 4, client: "Green Valley HVAC", title: "AC Tune-Up Special", date: "May 11", status: "scheduled", image: false },
  { id: 5, client: "City Plumbing", title: "Emergency Services 24/7", date: "May 12", status: "draft", image: true },
]

const blogPosts = [
  { id: 1, client: "Sunrise Dental", title: "10 Tips for Whiter Teeth This Summer", keyword: "teeth whitening tips", wordCount: 1250, status: "published", date: "May 5" },
  { id: 2, client: "Peak Fitness", title: "Best Morning Workout Routines for Busy Professionals", keyword: "morning workout routine", wordCount: 1800, status: "published", date: "May 3" },
  { id: 3, client: "Mountain View Realty", title: "First-Time Home Buyer Guide for Denver 2024", keyword: "Denver home buying guide", wordCount: 2200, status: "draft", date: "May 8" },
  { id: 4, client: "Green Valley HVAC", title: "When to Replace Your AC Unit: Signs to Watch For", keyword: "AC replacement signs", wordCount: 1100, status: "draft", date: "May 10" },
  { id: 5, client: "City Plumbing", title: "DIY vs Professional Plumbing: What You Need to Know", keyword: "plumbing DIY vs professional", wordCount: 1500, status: "published", date: "May 1" },
]

const calendarDays = [
  { date: 5, day: "Mon", posts: [] },
  { date: 6, day: "Tue", posts: [] },
  { date: 7, day: "Wed", posts: [] },
  { date: 8, day: "Thu", posts: [{ client: "Sunrise Dental", title: "Summer Smile Special!" }] },
  { date: 9, day: "Fri", posts: [{ client: "Peak Fitness", title: "New Group Classes" }] },
  { date: 10, day: "Sat", posts: [{ client: "Mountain View Realty", title: "Just Listed" }] },
  { date: 11, day: "Sun", posts: [{ client: "Green Valley HVAC", title: "AC Tune-Up" }] },
]

export default function ContentPage() {
  const [isGBPDialogOpen, setIsGBPDialogOpen] = useState(false)
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false)
  const [seoScore, setSeoScore] = useState(72)
  const [postContent, setPostContent] = useState("")

  const handleContentChange = (content: string) => {
    setPostContent(content)
    // Simulate SEO score calculation
    const score = Math.min(100, 50 + content.length / 5)
    setSeoScore(Math.round(score))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
          CONTENT
        </h1>
        <p className="mt-1 text-muted-foreground">
          Create and manage GBP posts and blog content
        </p>
      </div>

      <Tabs defaultValue="gbp" className="space-y-6">
        <TabsList className="bg-card border border-light-blue/30">
          <TabsTrigger value="gbp" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            GBP Posts
          </TabsTrigger>
          <TabsTrigger value="blog" className="data-[state=active]:bg-navy data-[state=active]:text-white">
            Blog Posts
          </TabsTrigger>
        </TabsList>

        {/* GBP Posts Tab */}
        <TabsContent value="gbp" className="space-y-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-[var(--font-bebas)] text-xl tracking-wide text-navy">
                MAY 2024
              </h2>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Dialog open={isGBPDialogOpen} onOpenChange={setIsGBPDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-navy hover:bg-navy/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
                    CREATE GBP POST
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
                        <SelectItem value="sunrise">Sunrise Dental</SelectItem>
                        <SelectItem value="peak">Peak Fitness</SelectItem>
                        <SelectItem value="mountain">Mountain View Realty</SelectItem>
                        <SelectItem value="green">Green Valley HVAC</SelectItem>
                        <SelectItem value="city">City Plumbing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Post Content</Label>
                    <Textarea 
                      placeholder="Write your post content..."
                      className="mt-1 min-h-[120px]"
                      value={postContent}
                      onChange={(e) => handleContentChange(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Image</Label>
                    <div className="mt-1 flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-light-blue hover:border-navy hover:bg-navy/5 transition-colors">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-1 text-sm text-muted-foreground">Click to upload image</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Call to Action</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select CTA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="book">Book Now</SelectItem>
                          <SelectItem value="call">Call Now</SelectItem>
                          <SelectItem value="learn">Learn More</SelectItem>
                          <SelectItem value="shop">Shop Now</SelectItem>
                          <SelectItem value="signup">Sign Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Target Keyword</Label>
                      <Input placeholder="Enter keyword" className="mt-1" />
                    </div>
                  </div>
                  
                  {/* SEO Score */}
                  <div className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-navy">SEO Score</span>
                      <span className={`text-lg font-bold ${
                        seoScore >= 80 ? "text-green-600" : 
                        seoScore >= 60 ? "text-yellow-600" : "text-burnt-orange"
                      }`}>
                        {seoScore}/100
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-light-blue/30">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          seoScore >= 80 ? "bg-green-500" : 
                          seoScore >= 60 ? "bg-yellow-500" : "bg-burnt-orange"
                        }`}
                        style={{ width: `${seoScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="text-burnt-orange border-burnt-orange hover:bg-burnt-orange/10"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with Sage
                    </Button>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsGBPDialogOpen(false)}>
                        Save Draft
                      </Button>
                      <Button type="submit" className="bg-navy hover:bg-navy/90">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Post
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Calendar View */}
          <div className="grid grid-cols-7 gap-4">
            {calendarDays.map((day) => (
              <div key={day.date} className="min-h-[140px]">
                <div className="mb-2 text-center">
                  <p className="text-xs text-muted-foreground">{day.day}</p>
                  <p className="font-[var(--font-bebas)] text-lg text-navy">{day.date}</p>
                </div>
                <div className="space-y-2">
                  {day.posts.map((post, idx) => (
                    <div 
                      key={idx} 
                      className="rounded-lg border border-light-blue/30 bg-card p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <p className="text-[10px] font-medium text-burnt-orange">{post.client}</p>
                      <p className="text-xs text-navy line-clamp-2">{post.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Posts List */}
          <div>
            <h3 className="mb-4 font-[var(--font-bebas)] text-lg tracking-wide text-navy">
              ALL GBP POSTS
            </h3>
            <div className="space-y-3">
              {gbpPosts.map((post) => (
                <div 
                  key={post.id}
                  className="flex items-center justify-between rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {post.image && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-light-blue/20">
                        <ImageIcon className="h-5 w-5 text-navy" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-navy">{post.title}</p>
                      <p className="text-sm text-muted-foreground">{post.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      post.status === "scheduled" 
                        ? "bg-green-100 text-green-700"
                        : "bg-sand text-navy"
                    }`}>
                      {post.status === "scheduled" ? "Scheduled" : "Draft"}
                    </span>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Blog Posts Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <Button variant="outline" className="border-navy text-navy">
                All Posts
              </Button>
              <Button variant="ghost">Published</Button>
              <Button variant="ghost">Drafts</Button>
            </div>
            <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-navy hover:bg-navy/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
                    CREATE BLOG POST
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
                        <SelectItem value="sunrise">Sunrise Dental</SelectItem>
                        <SelectItem value="peak">Peak Fitness</SelectItem>
                        <SelectItem value="mountain">Mountain View Realty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Post Title</Label>
                    <Input placeholder="Enter blog post title" className="mt-1" />
                  </div>
                  <div>
                    <Label>Target Keyword</Label>
                    <Input placeholder="Enter target keyword" className="mt-1" />
                  </div>
                  <div>
                    <Label>Content Outline</Label>
                    <Textarea 
                      placeholder="Enter post outline or let Sage generate..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button 
                      type="button" 
                      className="bg-burnt-orange hover:bg-burnt-orange/90"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with Sage
                    </Button>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsBlogDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-navy hover:bg-navy/90">
                        Create Post
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog Posts Table */}
          <div className="rounded-xl border border-light-blue/30 bg-card shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-blue/30 bg-off-white/50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Keyword
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Words
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-blue/30">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-off-white/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded bg-navy/10 p-2">
                          <FileText className="h-4 w-4 text-navy" />
                        </div>
                        <span className="font-medium text-navy">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.client}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-light-blue/30 px-2 py-1 text-xs text-navy">
                        {post.keyword}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.wordCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        post.status === "published" 
                          ? "bg-green-100 text-green-700"
                          : "bg-sand text-navy"
                      }`}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {post.status === "published" && (
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
