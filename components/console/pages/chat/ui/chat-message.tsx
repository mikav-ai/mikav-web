"use client";

import React, { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Ban, Code2, Loader2, Terminal } from "lucide-react";

import { cn } from "@/lib/utils";
import { FilePreview } from "./file-preview";
import { MarkdownRenderer } from "./markdown-renderer";

const chatBubbleVariants = cva(
  "group/message relative w-fit max-w-[80%] break-words rounded-2xl px-4 py-2.5 text-sm",
  {
    variants: {
      isUser: {
        true: "bg-primary text-primary-foreground",
        false: "bg-muted text-foreground",
      },
      animation: {
        none: "",
        slide: "duration-300 animate-in fade-in-0",
        scale: "duration-300 animate-in fade-in-0 zoom-in-75",
        fade: "duration-500 animate-in fade-in-0",
      },
    },
    compoundVariants: [
      { isUser: true, animation: "slide", class: "slide-in-from-right" },
      { isUser: false, animation: "slide", class: "slide-in-from-left" },
      { isUser: true, animation: "scale", class: "origin-bottom-right" },
      { isUser: false, animation: "scale", class: "origin-bottom-left" },
    ],
  }
);

type Animation = VariantProps<typeof chatBubbleVariants>["animation"];

interface Attachment {
  name?: string;
  contentType?: string;
  url: string;
}

interface ToolInvocation {
  state: "partial-call" | "call" | "result";
  toolName: string;
  result?: {
    __cancelled?: boolean;
    [key: string]: any;
  };
}

export interface Message {
  id: string;
  role: "user" | "assistant" | (string & {});
  content: string;
  createdAt?: Date;
  experimental_attachments?: Attachment[];
  toolInvocations?: ToolInvocation[];
  parts?: any[];
}

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean;
  animation?: Animation;
  actions?: React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  actions,
  experimental_attachments,
  toolInvocations,
}) => {
  const files = useMemo(() => {
    return experimental_attachments?.map((attachment) => {
      const response = atob(attachment.url.split(",")[1] || "");
      const array = new Uint8Array(response.length);
      for (let i = 0; i < response.length; i++) {
        array[i] = response.charCodeAt(i);
      }
      return new File([array], attachment.name ?? "Unknown", {
        type: attachment.contentType,
      });
    });
  }, [experimental_attachments]);

  const isUser = role === "user";

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (toolInvocations && toolInvocations.length > 0) {
    return <ToolCallDisplay toolInvocations={toolInvocations} />;
  }

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      {files && files.length > 0 && (
        <div className="mb-1 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <FilePreview file={file} key={index} onRemove={() => {}} />
          ))}
        </div>
      )}

      <div className={cn(chatBubbleVariants({ isUser, animation }))}>
        <MarkdownRenderer>{content}</MarkdownRenderer>
        {actions && !isUser && (
          <div className="absolute -bottom-4 right-2 flex space-x-1 rounded-lg border bg-background p-1 text-foreground opacity-0 transition-opacity group-hover/message:opacity-100">
            {actions}
          </div>
        )}
      </div>

      {showTimeStamp && createdAt && (
        <time
          dateTime={createdAt.toISOString()}
          className={cn(
            "mt-1 block px-1 text-xs opacity-50",
            animation !== "none" && "duration-500 animate-in fade-in-0"
          )}
        >
          {formattedTime}
        </time>
      )}
    </div>
  );
};

function ToolCallDisplay({
  toolInvocations,
}: {
  toolInvocations: ToolInvocation[];
}) {
  if (!toolInvocations?.length) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      {toolInvocations.map((invocation, index) => {
        const isCancelled =
          invocation.state === "result" &&
          invocation.result?.__cancelled === true;

        if (isCancelled) {
          return (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
            >
              <Ban className="h-4 w-4" />
              <span>
                Cancelled <code>{invocation.toolName}</code>
              </span>
            </div>
          );
        }

        switch (invocation.state) {
          case "partial-call":
          case "call":
            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
              >
                <Terminal className="h-4 w-4" />
                <span>
                  Calling <code>{invocation.toolName}</code>...
                </span>
                <Loader2 className="h-3 w-3 animate-spin" />
              </div>
            );
          case "result":
            return (
              <div
                key={index}
                className="flex flex-col gap-1.5 rounded-lg border bg-muted/50 px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  <span>
                    Result from <code>{invocation.toolName}</code>
                  </span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap text-foreground">
                  {JSON.stringify(invocation.result, null, 2)}
                </pre>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
