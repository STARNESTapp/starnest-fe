"use client";

import { useState, type FormEvent } from "react";
import { CategorySelect } from "@/components/category-select";
import type { Category } from "@/types/chat";

const SUGGESTIONS = [
  "Suggest me best action movie",
  "Best android phone under 40k",
  "Best coffee bar near me",
];

interface HeroSearchBarProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  onSearch?: (query: string) => void;
}

export function HeroSearchBar({ category, onCategoryChange, onSearch }: HeroSearchBarProps) {
  const [query, setQuery] = useState("");

  function submitQuery(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuery(query);
  }

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion);
    submitQuery(suggestion);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-wrap items-center gap-3 rounded-[20px] border border-[#f73145]/20 bg-[#0b0b0b] p-3 shadow-[0_0_25px_0_rgba(247,49,69,0.2)]">
        <div className="flex shrink-0 items-center gap-3">
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Best thriller movies like Prisoners"
            aria-label="Ask Starnest a question"
            className="min-w-0 flex-1 truncate bg-transparent font-body text-lg font-medium text-white placeholder:text-white/50 focus:outline-none sm:text-xl"
          />
          <button
            type="submit"
            aria-label="Send search"
            className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10 p-2 transition-colors hover:bg-white/20"
          >
            <img src="/icons/send.svg" alt="" aria-hidden="true" className="h-4 w-[13px]" />
          </button>
        </div>
      </div>
      <div className="flex w-full items-start justify-center gap-2 overflow-x-auto">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            className="shrink-0 rounded-lg border-[0.5px] border-[#b3b3b3] bg-white/10 px-3.5 py-1.5 transition-colors hover:bg-white/20"
          >
            <p className="font-body text-xs font-medium whitespace-nowrap text-[#b3b3b3]">
              {suggestion}
            </p>
          </button>
        ))}
      </div>
    </form>
  );
}
