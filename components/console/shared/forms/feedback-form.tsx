"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackFormProps {
  onSubmit?: (data: FeedbackData) => void;
}

interface FeedbackData {
  type: string;
  subject: string;
  message: string;
  rating: string;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ type, subject, message, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="feedback-type">Feedback Type</Label>
        <Select value={type} onValueChange={(v) => setType(v ?? "")}>
          <SelectTrigger id="feedback-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="suggestion">Suggestion</SelectItem>
            <SelectItem value="bug">Bug Report</SelectItem>
            <SelectItem value="compliment">Compliment</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="feedback-rating">Rating</Label>
        <Select value={rating} onValueChange={(v) => setRating(v ?? "")}>
          <SelectTrigger id="feedback-rating">
            <SelectValue placeholder="Rate your experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Excellent</SelectItem>
            <SelectItem value="4">Good</SelectItem>
            <SelectItem value="3">Average</SelectItem>
            <SelectItem value="2">Poor</SelectItem>
            <SelectItem value="1">Very Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="feedback-subject">Subject</Label>
        <Input
          id="feedback-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="feedback-message">Message</Label>
        <Textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us more..."
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </form>
  );
}
