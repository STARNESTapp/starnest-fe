"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CategorySelect } from "@/components/category-select";
import { CATEGORY_HINTS, CATEGORY_SUGGESTIONS, pickRandomSuggestions } from "@/lib/suggestions";
import type { Category } from "@/types/chat";

const SUGGESTION_COUNT = 3;

interface HeroSearchBarProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
  onSearch?: (query: string) => void;
}

export function HeroSearchBar({ category, onCategoryChange, onSearch }: HeroSearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(() =>
    CATEGORY_SUGGESTIONS[category].slice(0, SUGGESTION_COUNT)
  );
  const hint = CATEGORY_HINTS[category];

  useEffect(() => {
    // Math.random() must stay client-only, or the server/client picks diverge and React throws a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSuggestions(pickRandomSuggestions(CATEGORY_SUGGESTIONS[category], SUGGESTION_COUNT));
  }, [category]);

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
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4 sm:gap-6">
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            className="rounded-[12px] border-[0.5px] border-[#b3b3b3] bg-white/10 px-2 py-2 transition-colors hover:bg-white/20 sm:px-4 sm:py-2.5"
          >
            <p className="font-body text-xs font-medium whitespace-nowrap text-[#b3b3b3] sm:text-base">
              {suggestion}
            </p>
          </button>
        ))}
      </div>
      <div className="flex w-full flex-nowrap items-center gap-2 rounded-[20px] border border-[#f73145]/20 bg-[#0b0b0b] p-2.5 shadow-[0_0_25px_0_rgba(247,49,69,0.2)] sm:gap-3 sm:p-3">
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
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
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={hint}
            aria-label="Ask Starnest a question"
            className="min-w-0 flex-1 truncate bg-transparent font-body text-sm font-medium text-white placeholder:text-white/50 focus:outline-none sm:text-lg"
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
    </form>
  );
}
