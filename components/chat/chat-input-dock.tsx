"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { CategorySelect } from "@/components/category-select";
import type { Category } from "@/types/chat";

const MAX_TEXTAREA_HEIGHT_PX = 160;

interface ChatInputDockProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  onSend: (message: string) => void;
  isSending: boolean;
}

export function ChatInputDock({ category, onCategoryChange, onSend, isSending }: ChatInputDockProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT_PX)}px`;
  }

  function submitMessage() {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setMessage("");
    requestAnimationFrame(resizeTextarea);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <div className="flex justify-center border-t border-white/5 bg-[#0b0b0b] px-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pb-5">
      <form onSubmit={handleSubmit} className="w-full max-w-[760px]">
        <div className="flex w-full items-end gap-2 rounded-[20px] border border-[#f73145]/20 bg-[#0b0b0b] p-2 shadow-[0_0_25px_0_rgba(247,49,69,0.2)] sm:gap-3 sm:p-2.5">
          <div className="flex shrink-0 items-center gap-1.5 pb-[3px] sm:gap-2.5">
            <span
              aria-hidden="true"
              className="hidden size-9 shrink-0 items-center justify-center rounded-[10px] p-2 sm:flex"
            >
              <img src="/icons/search.svg" alt="" className="size-full" />
            </span>
            {/* Filter button hidden per design request
            <button
              type="button"
              aria-label="Add filter"
              className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 p-2"
            >
              <img src="/icons/filter-plus.svg" alt="" aria-hidden="true" className="size-4" />
            </button>
            */}
            <CategorySelect value={category} onChange={onCategoryChange} />
          </div>
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Reply to Starnest…"
            aria-label="Reply to Starnest"
            className="max-h-40 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-1.5 font-body text-base font-medium text-white placeholder:text-white/40 focus:outline-none"
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
        <p className="mt-2 text-center font-body text-[11px] text-white/40 sm:mt-2.5">
          Starnest can make mistakes. Verify important details like hours and prices.
        </p>
      </form>
    </div>
  );
}
