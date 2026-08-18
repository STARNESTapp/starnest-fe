"use client";

import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { sendChatMessage } from "@/lib/chat-api";
import type { Category, ChatApiRequest, ChatApiResponse, ChatMessage } from "@/types/chat";

function createId(): string {
  return crypto.randomUUID();
}

interface ChatContextValue {
  category: Category;
  setCategory: (category: Category) => void;
  messages: ChatMessage[];
  isSending: boolean;
  sendMessage: (text: string) => void;
  selectOption: (messageId: string, option: string) => void;
  newChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
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

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;

    setMessages((prev) => [...prev, { id: createId(), role: "user", text: trimmed }]);
    mutation.mutate({ session_id: sessionId, message: trimmed, user_id: null, category });
  }

  function selectOption(messageId: string, option: string) {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, answeredOption: option } : message
      )
    );
    sendMessage(option);
  }

  function newChat() {
    setMessages([]);
    setSessionId(createId());
    setCategory("movies");
  }

  return (
    <ChatContext.Provider
      value={{
        category,
        setCategory,
        messages,
        isSending: mutation.isPending,
        sendMessage,
        selectOption,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
