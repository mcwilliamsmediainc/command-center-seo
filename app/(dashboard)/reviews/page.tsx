"use client"

import { useState } from "react"
import { Star, AlertTriangle, Sparkles, Flag, MessageSquare, Check, X, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  id: number
  rating: number
  reviewer: string
  text: string
  client: string
  date: string
  status: "pending" | "responded" | "flagged"
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 1,
    reviewer: "Mike R.",
    text: "Terrible experience. Waited 2 hours past my appointment time and the staff was rude. Will never come back.",
    client: "Sunrise Dental",
    date: "2 hours ago",
    status: "pending"
  },
  {
    id: 2,
    rating: 2,
    reviewer: "Susan K.",
    text: "Not great. The gym equipment is outdated and the locker rooms need serious cleaning. Expected better for the price.",
    client: "Peak Fitness",
    date: "5 hours ago",
    status: "pending"
  },
  {
    id: 3,
    rating: 5,
    reviewer: "David L.",
    text: "Absolutely amazing service! They helped us find our dream home in just two weeks. Highly recommend their team!",
    client: "Mountain View Realty",
    date: "1 day ago",
    status: "pending"
  },
  {
    id: 4,
    rating: 4,
    reviewer: "Jennifer M.",
    text: "Good service overall. The technician was knowledgeable and fixed our AC quickly. Would have given 5 stars but they were 30 mins late.",
    client: "Green Valley HVAC",
    date: "1 day ago",
    status: "pending"
  },
  {
    id: 5,
    rating: 5,
    reviewer: "Robert T.",
    text: "Fast and professional! Had a plumbing emergency at 2am and they came right out. Fixed the issue in under an hour. Lifesavers!",
    client: "City Plumbing",
    date: "2 days ago",
    status: "responded"
  },
  {
    id: 6,
    rating: 3,
    reviewer: "Amanda W.",
    text: "The design consultation was good but the final product didn't quite match what I expected. Communication could be better.",
    client: "Cozy Home Interiors",
    date: "3 days ago",
    status: "responded"
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const [draftResponse, setDraftResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const urgentReviews = reviews.filter(r => r.rating <= 2 && r.status === "pending")
  const pendingReviews = reviews.filter(r => r.status === "pending")

  const handleAIDraft = (review: Review) => {
    setSelectedReview(review)
    setIsGenerating(true)
    setIsResponseDialogOpen(true)
    
    // Simulate AI response generation
    setTimeout(() => {
      const responses: Record<number, string> = {
        1: `Dear Mike,

Thank you for taking the time to share your feedback. We sincerely apologize for the extended wait time and any unprofessional behavior you experienced. This is not the standard of care we strive to provide.

We would love the opportunity to make this right. Please contact our office directly so we can discuss your experience and ensure this doesn't happen again.

Best regards,
The Sunrise Dental Team`,
        2: `Hi Susan,

We appreciate your honest feedback about your experience. We're sorry to hear that our equipment and locker rooms didn't meet your expectations.

We're currently planning facility upgrades and your input is valuable. We'd like to offer you a complimentary month to experience the improvements we're making. Please reach out to our front desk to claim this offer.

Thank you for helping us improve!
Peak Fitness Management`,
      }
      setDraftResponse(responses[review.rating] || "Thank you for your review! We appreciate your feedback and are committed to providing excellent service.")
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[var(--font-bebas)] text-4xl tracking-wide text-navy">
          REVIEWS
        </h1>
        <p className="mt-1 text-muted-foreground">
          Monitor and respond to client reviews across all platforms
        </p>
      </div>

      {/* Urgent Alert Banner */}
      {urgentReviews.length > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-4">
          <div className="rounded-lg bg-red-500 p-2">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-red-700">
              {urgentReviews.length} negative review{urgentReviews.length > 1 ? 's' : ''} need{urgentReviews.length === 1 ? 's' : ''} immediate attention
            </p>
            <p className="text-sm text-red-600">
              Respond to 1-2 star reviews within 24 hours to protect client reputation
            </p>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => urgentReviews[0] && handleAIDraft(urgentReviews[0])}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Draft Response
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 flex gap-4">
        <div className="rounded-lg bg-card px-4 py-2 shadow-sm">
          <span className="text-sm text-muted-foreground">Pending Response</span>
          <p className="font-[var(--font-bebas)] text-2xl text-navy">{pendingReviews.length}</p>
        </div>
        <div className="rounded-lg bg-card px-4 py-2 shadow-sm">
          <span className="text-sm text-muted-foreground">Responded This Week</span>
          <p className="font-[var(--font-bebas)] text-2xl text-navy">8</p>
        </div>
        <div className="rounded-lg bg-card px-4 py-2 shadow-sm">
          <span className="text-sm text-muted-foreground">Avg. Rating (30 days)</span>
          <p className="font-[var(--font-bebas)] text-2xl text-navy">4.3</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`rounded-xl border bg-card p-6 shadow-sm ${
              review.rating <= 2 && review.status === "pending"
                ? "border-red-300"
                : "border-light-blue/30"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Rating indicator */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${
                review.rating >= 4 
                  ? "bg-green-100 text-green-700"
                  : review.rating === 3
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}>
                {review.rating}
              </div>

              {/* Review content */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <StarRating rating={review.rating} />
                  <span className="text-sm font-medium text-navy">{review.reviewer}</span>
                  <span className="text-sm text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                  {review.status === "responded" && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Responded
                    </span>
                  )}
                  {review.status === "flagged" && (
                    <span className="rounded-full bg-sand px-2 py-0.5 text-xs font-medium text-navy">
                      Flagged
                    </span>
                  )}
                </div>

                <p className="mb-3 text-navy">{review.text}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
                      {review.client}
                    </span>
                  </div>

                  {review.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground hover:text-navy"
                      >
                        <Flag className="mr-1 h-3.5 w-3.5" />
                        Flag for Removal
                      </Button>
                      <Button
                        size="sm"
                        className="bg-light-blue text-navy hover:bg-light-blue/90"
                        onClick={() => handleAIDraft(review)}
                      >
                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                        AI Draft Response
                      </Button>
                    </div>
                  )}

                  {review.status === "responded" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-navy"
                    >
                      <MessageSquare className="mr-1 h-3.5 w-3.5" />
                      View Response
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-[var(--font-bebas)] text-2xl tracking-wide text-navy">
              SAGE RESPONSE DRAFT
            </DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              {/* Original Review */}
              <div className="rounded-lg bg-off-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <StarRating rating={selectedReview.rating} />
                  <span className="text-sm font-medium">{selectedReview.reviewer}</span>
                  <span className="text-sm text-muted-foreground">· {selectedReview.client}</span>
                </div>
                <p className="text-sm text-navy">{selectedReview.text}</p>
              </div>

              {/* AI Draft */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-light-blue" />
                  <span className="text-sm font-medium text-navy">Sage&apos;s Suggested Response</span>
                </div>
                {isGenerating ? (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-light-blue/30 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-light-blue border-t-transparent" />
                      Sage is crafting a response...
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={draftResponse}
                    onChange={(e) => setDraftResponse(e.target.value)}
                    className="min-h-[160px] resize-none"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsResponseDialogOpen(false)}
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="text-navy"
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit More
                </Button>
                <Button className="bg-navy hover:bg-navy/90">
                  <Check className="mr-1 h-4 w-4" />
                  Approve & Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
