"use client";

import { useEffect, useRef } from "react";
import { ChatInputDock } from "@/components/chat/chat-input-dock";
import { ChatMessage } from "@/components/chat/chat-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { Navbar } from "@/components/navbar";
import type { Category, ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatViewProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  messages: ChatMessageType[];
  isSending: boolean;
  onSend: (message: string) => void;
  onOptionSelect: (messageId: string, option: string) => void;
  onNewChat: () => void;
}

export function ChatView({
  category,
  onCategoryChange,
  messages,
  isSending,
  onSend,
  onOptionSelect,
  onNewChat,
}: ChatViewProps) {
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isSending]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#0b0b0b]">
      <Navbar
        variant="static"
        rightSlot={
          <button
            type="button"
            onClick={onNewChat}
            className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 font-body text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:px-3.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New chat
          </button>
        }
      />

      <div className="flex flex-1 justify-center overflow-y-auto overscroll-contain">
        <div className="flex w-full max-w-[760px] flex-col gap-5 px-3 py-4 sm:gap-6 sm:px-4 sm:py-8">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onOptionSelect={(option) => onOptionSelect(message.id, option)}
            />
          ))}
          {isSending && (
            <div className="flex items-start gap-3.5">
              <div className="flex size-[30px] shrink-0 items-center justify-center rounded-lg border border-[#f73145]/25 bg-white/10 font-display text-[13px] font-bold text-[#f73145]">
                S
              </div>
              <TypingIndicator />
            </div>
          )}
          <div ref={threadEndRef} />
        </div>
      </div>

      <ChatInputDock
        category={category}
        onCategoryChange={onCategoryChange}
        onSend={onSend}
        isSending={isSending}
      />
    </div>
  );
}
