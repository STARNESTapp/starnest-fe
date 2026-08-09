"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ChatView } from "@/components/chat/chat-view";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { sendChatMessage } from "@/lib/chat-api";
import type { Category, ChatApiRequest, ChatApiResponse, ChatMessage } from "@/types/chat";

function createId(): string {
  return crypto.randomUUID();
}

export function StarnestApp() {
  const [view, setView] = useState<"hero" | "chat">("hero");
  const [category, setCategory] = useState<Category>("movies");
  const [sessionId, setSessionId] = useState(() => createId());
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation<ChatApiResponse, Error, ChatApiRequest>({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: data.reply,
          options: data.options,
          recommendations: data.recommendations,
        },
      ]);
    },
    onError: () => {
      toast.error("Couldn't reach Starnest. Please try again.");
    },
  });

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;

    setMessages((prev) => [...prev, { id: createId(), role: "user", text: trimmed }]);
    setView("chat");
    mutation.mutate({ session_id: sessionId, message: trimmed, user_id: null, category });
  }

  function handleOptionSelect(messageId: string, option: string) {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, answeredOption: option } : message
      )
    );
    handleSend(option);
  }

  function handleNewChat() {
    setMessages([]);
    setSessionId(createId());
    setCategory("movies");
    setView("hero");
  }

  if (view === "chat") {
    return (
      <ChatView
        category={category}
        onCategoryChange={setCategory}
        messages={messages}
        isSending={mutation.isPending}
        onSend={handleSend}
        onOptionSelect={handleOptionSelect}
        onNewChat={handleNewChat}
      />
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0b0b0b]">
      <Navbar />
      <HeroSection category={category} onCategoryChange={setCategory} onSearch={handleSend} />
    </main>
  );
}
