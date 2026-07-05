"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatFormProps {
  className?: string;
  isPending: boolean;
  handleSubmit: (event?: React.FormEvent) => void;
  children: (props: {
    files: File[] | null;
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  }) => React.ReactNode;
}

export function ChatForm({
  className,
  isPending,
  handleSubmit,
  children,
}: ChatFormProps) {
  const [files, setFiles] = useState<File[] | null>(null);

  return (
    <form
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isPending) {
          handleSubmit(e);
          setFiles(null);
        }
      }}
    >
      {children({ files, setFiles })}
    </form>
  );
}
