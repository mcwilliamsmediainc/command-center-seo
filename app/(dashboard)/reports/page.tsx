"use client"

import { useState } from "react"
import { FileText, Send, Clock, Check, Eye, Sparkles, TrendingUp, Star, Search, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Report {
  id: number
  client: string
  week: string
  status: "sent" | "draft" | "scheduled"
  sentDate?: string
  scheduledDate?: string
}

const reports: Report[] = [
  { id: 1, client: "Sunrise Dental", week: "May 1-7, 2024", status: "sent", sentDate: "May 8" },
  { id: 2, client: "Peak Fitness", week: "May 1-7, 2024", status: "sent", sentDate: "May 8" },
  { id: 3, client: "Mountain View Realty", week: "May 1-7, 2024", status: "scheduled", scheduledDate: "May 9" },
  { id: 4, client: "Green Valley HVAC", week: "May 1-7, 2024", status: "draft" },
  { id: 5, client: "City Plumbing", week: "May 1-7, 2024", status: "draft" },
  { id: 6, client: "Cozy Home Interiors", week: "May 1-7, 2024", status: "draft" },
  { id: 7, client: "Sunrise Dental", week: "Apr 24-30, 2024", status: "sent", sentDate: "May 1" },
  { id: 8, client: "Peak Fitness", week: "Apr 24-30, 2024", status: "sent", sentDate: "May 1" },
]

const mockReportData = {
  gbpPerformance: {
    views: { value: 2847, change: 12 },
    searches: { value: 1234, change: 8 },
    calls: { value: 89, change: 15 },
    directions: { value: 156, change: -3 },
  },
  reviews: {
    newReviews: 5,
    avgRating: 4.7,
    responded: 5,
    totalReviews: 127,
  },
  keywords: [
    { keyword: "dentist near me", position: 3, change: 2 },
    { keyword: "teeth whitening denver", position: 5, change: -1 },
    { keyword: "emergency dental care", position: 2, change: 1 },
    { keyword: "cosmetic dentistry", position: 8, change: 3 },
  ],
  highlights: [
    "Published 4 GBP posts this week",
    "Responded to all 5 new reviews within 24 hours",
    "Blog post on teeth whitening generated 450 organic visits",
    "Local pack ranking improved for 3 target keywords",
  ],
  nextWeek: [
    "Create Mother's Day promotion post",
    "Publish blog: Summer Dental Care Tips",
    "Request reviews from 10 recent patients",
    "Update GBP photos with new office renovation",
  ],
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (report: Report) => {
    setSelectedReport(report)
    setIsPreviewOpen(true)
  }

  const sentReports = reports.filter(r => r.status === "sent")
  const pendingReports = reports.filter(r => r.status !== "sent")

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
            REPORTS
          </h1>
          <p className="mt-1 text-muted-foreground">
            Generate and send weekly client performance reports
          </p>
        </div>
        <Button className="bg-navy hover:bg-navy/90">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate All Reports
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Check className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sent This Week</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">{sentReports.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sand/50 p-2">
              <FileText className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">
                {reports.filter(r => r.status === "draft").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-light-blue/30 p-2">
              <Clock className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">
                {reports.filter(r => r.status === "scheduled").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-light-blue/30 p-2">
              <Send className="h-5 w-5 text-navy" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sent (Month)</p>
              <p className="font-[var(--font-bebas)] text-2xl text-navy">24</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Report List */}
        <div className="col-span-2 space-y-6">
          {/* Pending Reports */}
          <div>
            <h2 className="mb-4 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              PENDING REPORTS
            </h2>
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-navy/10 p-2">
                      <FileText className="h-5 w-5 text-navy" />
                    </div>
                    <div>
                      <p className="font-medium text-navy">{report.client}</p>
                      <p className="text-sm text-muted-foreground">{report.week}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      report.status === "scheduled"
                        ? "bg-light-blue/30 text-navy"
                        : "bg-sand text-navy"
                    }`}>
                      {report.status === "scheduled" ? `Scheduled: ${report.scheduledDate}` : "Draft"}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreview(report)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-navy hover:bg-navy/90">
                      <Send className="mr-1 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sent Reports */}
          <div>
            <h2 className="mb-4 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
              SENT REPORTS
            </h2>
            <div className="space-y-3">
              {sentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-xl border border-light-blue/30 bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-green-100 p-2">
                      <Check className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-navy">{report.client}</p>
                      <p className="text-sm text-muted-foreground">{report.week}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      Sent {report.sentDate}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePreview(report)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Preview */}
        <div className="rounded-xl border border-light-blue/30 bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-[var(--font-bebas)] text-xl tracking-wide text-navy">
            QUICK PREVIEW
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Select a report from the list to preview its contents here.
          </p>
          
          {/* Sample preview content */}
          <div className="space-y-4">
            <div className="rounded-lg bg-off-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-navy">GBP Performance</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Views up 12%, Calls up 15%
              </p>
            </div>
            <div className="rounded-lg bg-off-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-navy">Reviews</span>
              </div>
              <p className="text-xs text-muted-foreground">
                5 new reviews, 4.7 avg rating
              </p>
            </div>
            <div className="rounded-lg bg-off-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-navy" />
                <span className="text-sm font-medium text-navy">Keywords</span>
              </div>
              <p className="text-xs text-muted-foreground">
                3 keywords improved rankings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
              WEEKLY REPORT PREVIEW
            </DialogTitle>
          </DialogHeader>
          
          {selectedReport && (
            <div className="mt-4 space-y-6">
              {/* Header */}
              <div className="rounded-lg bg-navy p-6 text-white">
                <h3 className="font-[var(--font-bebas)] text-2xl tracking-wide">
                  {selectedReport.client.toUpperCase()}
                </h3>
                <p className="text-white/70">Weekly Performance Report · {selectedReport.week}</p>
              </div>

              {/* GBP Performance */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-[var(--font-bebas)] text-lg text-navy">
                  <TrendingUp className="h-5 w-5" />
                  GBP PERFORMANCE
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(mockReportData.gbpPerformance).map(([key, data]) => (
                    <div key={key} className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                      <p className="text-xs uppercase text-muted-foreground">{key}</p>
                      <p className="font-[var(--font-bebas)] text-2xl text-navy">
                        {data.value.toLocaleString()}
                      </p>
                      <p className={`text-xs ${data.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {data.change >= 0 ? "+" : ""}{data.change}% vs last week
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Summary */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-[var(--font-bebas)] text-lg text-navy">
                  <Star className="h-5 w-5" />
                  REVIEWS SUMMARY
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                    <p className="text-xs uppercase text-muted-foreground">New Reviews</p>
                    <p className="font-[var(--font-bebas)] text-2xl text-navy">
                      {mockReportData.reviews.newReviews}
                    </p>
                  </div>
                  <div className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                    <p className="text-xs uppercase text-muted-foreground">Avg Rating</p>
                    <p className="font-[var(--font-bebas)] text-2xl text-navy">
                      {mockReportData.reviews.avgRating}
                    </p>
                  </div>
                  <div className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                    <p className="text-xs uppercase text-muted-foreground">Responded</p>
                    <p className="font-[var(--font-bebas)] text-2xl text-navy">
                      {mockReportData.reviews.responded}/{mockReportData.reviews.newReviews}
                    </p>
                  </div>
                  <div className="rounded-lg border border-light-blue/30 bg-off-white p-4">
                    <p className="text-xs uppercase text-muted-foreground">Total Reviews</p>
                    <p className="font-[var(--font-bebas)] text-2xl text-navy">
                      {mockReportData.reviews.totalReviews}
                    </p>
                  </div>
                </div>
              </div>

              {/* Keyword Rankings */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-[var(--font-bebas)] text-lg text-navy">
                  <Search className="h-5 w-5" />
                  KEYWORD MOVEMENTS
                </h4>
                <div className="rounded-lg border border-light-blue/30 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-off-white">
                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">
                          Keyword
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium uppercase text-muted-foreground">
                          Position
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-medium uppercase text-muted-foreground">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light-blue/30">
                      {mockReportData.keywords.map((kw, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm text-navy">{kw.keyword}</td>
                          <td className="px-4 py-2 text-center font-medium text-navy">#{kw.position}</td>
                          <td className="px-4 py-2 text-center">
                            <span className={`text-sm ${kw.change > 0 ? "text-green-600" : "text-red-500"}`}>
                              {kw.change > 0 ? `↑${kw.change}` : `↓${Math.abs(kw.change)}`}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Highlights & Next Week */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 font-[var(--font-bebas)] text-lg text-navy">
                    SEO HIGHLIGHTS
                  </h4>
                  <ul className="space-y-2">
                    {mockReportData.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-navy">
                        <ChevronRight className="mt-0.5 h-4 w-4 text-light-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-[var(--font-bebas)] text-lg text-navy">
                    NEXT WEEK&apos;S PLAN
                  </h4>
                  <ul className="space-y-2">
                    {mockReportData.nextWeek.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-navy">
                        <Calendar className="mt-0.5 h-4 w-4 text-navy" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-light-blue/30 pt-4">
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close
                </Button>
                <Button className="bg-light-blue text-navy hover:bg-light-blue/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button className="bg-navy hover:bg-navy/90">
                  <Send className="mr-2 h-4 w-4" />
                  Approve & Send
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
