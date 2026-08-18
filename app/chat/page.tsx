"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/components/chat-provider";
import { ChatView } from "@/components/chat/chat-view";

export default function ChatPage() {
  const router = useRouter();
  const { category, setCategory, messages, isSending, sendMessage, selectOption, newChat } =
    useChat();

  useEffect(() => {
    if (messages.length === 0 && !isSending) {
      router.replace("/");
    }
  }, [messages.length, isSending, router]);

  function handleNewChat() {
    newChat();
    router.push("/");
  }

  if (messages.length === 0) return null;

  return (
    <ChatView
      category={category}
      onCategoryChange={setCategory}
      messages={messages}
      isSending={isSending}
      onSend={sendMessage}
      onOptionSelect={selectOption}
      onNewChat={handleNewChat}
    />
  );
}
