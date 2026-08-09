"use client";

import { useState, type FormEvent } from "react";
import { CategorySelect } from "@/components/category-select";
import type { Category } from "@/types/chat";

interface ChatInputDockProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  onSend: (message: string) => void;
  isSending: boolean;
}

export function ChatInputDock({ category, onCategoryChange, onSend, isSending }: ChatInputDockProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setMessage("");
  }

  return (
    <div className="flex justify-center px-4 pb-5 pt-3">
      <form onSubmit={handleSubmit} className="w-full max-w-[760px]">
        <div className="flex w-full flex-wrap items-center gap-3 rounded-[20px] border border-[#f73145]/20 bg-[#0b0b0b] p-2.5 shadow-[0_0_25px_0_rgba(247,49,69,0.2)]">
          <div className="flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-[10px] p-2"
            >
              <img src="/icons/search.svg" alt="" className="size-full" />
            </span>
            <button
              type="button"
              aria-label="Add filter"
              className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 p-2"
            >
              <img src="/icons/filter-plus.svg" alt="" aria-hidden="true" className="size-4" />
            </button>
            <CategorySelect value={category} onChange={onCategoryChange} />
          </div>
          <div className="flex min-w-[220px] flex-1 items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Reply to Starnest, or ask something new…"
              aria-label="Reply to Starnest"
              className="min-w-0 flex-1 bg-transparent font-body text-base font-medium text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSending}
              aria-label="Send message"
              className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f73145] p-2 transition-colors hover:bg-[#f73145]/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <img src="/icons/send.svg" alt="" aria-hidden="true" className="h-4 w-[13px]" />
            </button>
          </div>
        </div>
        <p className="mt-2.5 text-center font-body text-[11px] text-white/40">
          Starnest can make mistakes. Verify important details like hours and prices.
        </p>
      </form>
    </div>
  );
}
