"use client";

import { motion } from "framer-motion";
import { FileText, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const isImage = file.type.startsWith("image/");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative flex h-12 min-w-[120px] items-center gap-2 rounded-lg border bg-background px-3 py-2"
    >
      {isImage ? (
        <Image className="h-4 w-4 text-muted-foreground" />
      ) : (
        <FileText className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="max-w-[80px] truncate text-xs">{file.name}</span>
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          "absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/80"
        )}
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </motion.div>
  );
}
