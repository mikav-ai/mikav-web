"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

interface FeedbackFormProps {
  onSubmit?: (data: FeedbackData) => void;
}

interface FeedbackData {
  type: string;
  message: string;
}

const feedbackTypeLabels: Record<string, string> = {
  general: "General",
  suggestion: "Suggestion",
  bug: "Bug Report",
  compliment: "Compliment",
};

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [type, setType] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();

      const { error } = await supabase.from("feedback").insert({
        user_id: userData?.user?.id ?? null,
        type,
        subject: type,
        message,
      });

      if (error) throw error;

      onSubmit?.({ type, message });
      setStatus("success");
      setType("general");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit feedback."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="feedback-type" className="text-xs">Type</Label>
        <Select value={type} onValueChange={(v) => setType(v ?? "general")}>
          <SelectTrigger id="feedback-type" className="h-11 w-full text-sm">
            <SelectValue placeholder="Type">
              {(value: string) => feedbackTypeLabels[value] ?? "Type"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="suggestion">Suggestion</SelectItem>
            <SelectItem value="bug">Bug Report</SelectItem>
            <SelectItem value="compliment">Compliment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="feedback-message" className="text-xs">Message</Label>
        <Textarea
          id="feedback-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your feedback..."
          rows={6}
          className="text-sm"
          required
        />
      </div>

      {status === "success" && (
        <p className="text-xs text-green-600">Thanks for your feedback!</p>
      )}
      {status === "error" && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" size="sm" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
