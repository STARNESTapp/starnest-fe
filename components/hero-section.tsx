import { HeroSearchBar } from "@/components/hero-search-bar";
import type { Category } from "@/types/chat";

interface HeroSectionProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  onSearch: (query: string) => void;
}

export function HeroSection({ category, onCategoryChange, onSearch }: HeroSectionProps) {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-[#0b0b0b] px-2 pb-2 pt-24 sm:px-3 sm:pb-3">
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[32px] border-2 border-[#f73145]/20 shadow-[0_0_56px_0_rgba(247,49,69,0.32)] sm:rounded-[56px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 65% 0%, rgba(11,11,11,0.2) 0%, #0b0b0b 100%)",
          }}
        />
        <img
          src="/decorative/star-left.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 hidden w-[45%] max-w-[522px] opacity-80 lg:block"
        />
        <img
          src="/decorative/star-right.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-10 hidden w-[42%] max-w-[494px] opacity-80 lg:block"
        />
        <div className="pointer-events-none absolute left-[12.78%] top-[70.78%] h-[57.07%] w-[74.51%]">
          <div className="absolute inset-[-35.43%_-14.72%]">
            <img src="/decorative/rings.svg" alt="" aria-hidden="true" className="block h-full w-full" />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center gap-10 px-6 py-12 text-center sm:px-12">
          <div className="flex max-w-[840px] flex-col items-center gap-5 text-white">
            <h1 className="font-display text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px]">
              Ask once. Discover the best.
            </h1>
            <p className="font-body text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
              {
                "Describe what you're looking for in your own words, and Starnest will recommend the best options based on your preferences, location, budget, and real experiences."
              }
            </p>
          </div>
          <div className="w-full max-w-[840px]">
            <HeroSearchBar
              category={category}
              onCategoryChange={onCategoryChange}
              onSearch={onSearch}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
