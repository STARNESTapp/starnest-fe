"use client";

import { useRouter } from "next/navigation";
import { useChat } from "@/components/chat-provider";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const router = useRouter();
  const { category, setCategory, sendMessage } = useChat();

  function handleSearch(query: string) {
    sendMessage(query);
    router.push("/chat");
  }

  return (
    <main className="flex min-h-dvh flex-col bg-[#0b0b0b]">
      <Navbar />
      <HeroSection category={category} onCategoryChange={setCategory} onSearch={handleSearch} />
    </main>
  );
}
