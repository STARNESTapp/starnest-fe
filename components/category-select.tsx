"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/types/chat";

interface CategoryOption {
  value: Category;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryOption[] = [
  { value: "movies", label: "Movies", icon: "/icons/movie-category.svg" },
  { value: "restaurants", label: "Restaurants", icon: "/icons/restaurant-category.svg" },
  { value: "games", label: "Games", icon: "/icons/game-category.svg" },
  { value: "books", label: "Books", icon: "/icons/book-category.svg" },
  { value: "gadgets", label: "Gadgets", icon: "/icons/gadget-category.svg" },
];

interface CategorySelectProps {
  value: Category;
  onChange: (category: Category) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = CATEGORIES.find((category) => category.value === value) ?? CATEGORIES[0];

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideEvent(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setIsOpen(false);
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideEvent);
    document.addEventListener("keydown", handleOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
      document.removeEventListener("keydown", handleOutsideEvent);
    };
  }, [isOpen]);

  function handleSelect(category: Category) {
    onChange(category);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-[10px] bg-white/10 px-2.5 py-2 transition-colors hover:bg-white/20"
      >
        <img src={selected.icon} alt="" aria-hidden="true" className="h-4 w-auto" />
        <span className="font-body text-sm font-medium whitespace-nowrap text-white">
          {selected.label}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform ${isOpen ? "" : "rotate-180"}`}
        >
          <path d="M1 5L5 1L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute bottom-full left-0 z-50 mb-2 min-w-[176px] overflow-hidden rounded-xl border border-[#f73145]/20 bg-[#0b0b0b] p-1.5 shadow-[0_0_25px_0_rgba(247,49,69,0.2)]"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              role="option"
              aria-selected={category.value === value}
              onClick={() => handleSelect(category.value)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/10 ${
                category.value === value ? "bg-white/10" : ""
              }`}
            >
              <img src={category.icon} alt="" aria-hidden="true" className="h-4 w-auto" />
              <span className="font-body text-sm font-medium whitespace-nowrap text-white">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
