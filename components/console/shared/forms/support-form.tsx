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
import { createClient } from "@/lib/supabase/client";

interface SupportFormProps {
  onSubmit?: (data: SupportData) => void;
}

interface SupportData {
  category: string;
  priority: string;
  subject: string;
  description: string;
  email: string;
}

const categoryLabels: Record<string, string> = {
  account: "Account",
  billing: "Billing",
  technical: "Technical Issue",
  feature: "Feature Request",
  other: "Other",
};

const priorityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export function SupportForm({ onSubmit }: SupportFormProps) {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
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

      const { error } = await supabase.from("support_requests").insert({
        user_id: userData?.user?.id ?? null,
        email,
        category,
        priority: priority || "medium",
        subject,
        description,
      });

      if (error) throw error;

      onSubmit?.({ category, priority, subject, description, email });
      setStatus("success");
      setCategory("");
      setPriority("");
      setSubject("");
      setDescription("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit support request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="support-email">Email</Label>
        <Input
          id="support-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="support-category">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v ?? "")}>
          <SelectTrigger id="support-category" className="h-11 w-full">
            <SelectValue placeholder="Select category">
              {(value: string) => categoryLabels[value] ?? "Select category"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account">Account</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="technical">Technical Issue</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="support-priority">Priority</Label>
        <Select value={priority} onValueChange={(v) => setPriority(v ?? "")}>
          <SelectTrigger id="support-priority" className="h-11 w-full">
            <SelectValue placeholder="Select priority">
              {(value: string) => priorityLabels[value] ?? "Select priority"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="support-subject">Subject</Label>
        <Input
          id="support-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary of your issue"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="support-description">Description</Label>
        <Textarea
          id="support-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue in detail..."
          rows={8}
          required
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-green-600">
          Thanks! Your support request has been submitted.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Support Request"}
      </Button>
    </form>
  );
}
