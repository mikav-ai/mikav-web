"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FeedbackForm } from "./forms/feedback-form";

export function FeedbackButton() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquarePlus className="h-4 w-4" />
            Feedback
          </Button>
        }
      />
      <PopoverContent align="end" className="w-96">
        <FeedbackForm />
      </PopoverContent>
    </Popover>
  );
}
