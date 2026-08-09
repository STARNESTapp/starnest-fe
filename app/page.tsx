import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0b0b0b]">
      <Navbar />
      <HeroSection />
    </main>
  );
}
