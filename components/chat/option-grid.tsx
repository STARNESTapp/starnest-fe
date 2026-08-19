interface OptionGridProps {
  options: string[];
  answeredOption?: string;
  onSelect: (option: string) => void;
}

export function OptionGrid({ options, answeredOption, onSelect }: OptionGridProps) {
  const isAnswered = Boolean(answeredOption);

  return (
    <div className="mt-3 max-w-full rounded-2xl border border-[#f73145]/25 bg-[#f73145]/5 p-4 sm:max-w-[460px]">
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = option === answeredOption;
          return (
            <button
              key={option}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(option)}
              className={`group flex w-full items-center justify-between gap-2.5 rounded-[10px] border px-3.5 py-2.5 text-left font-body text-sm font-medium transition-colors ${
                isSelected
                  ? "border-[#f73145] bg-[#f73145]/15 text-white"
                  : isAnswered
                    ? "cursor-default border-white/10 bg-white/10 text-white/40"
                    : "border-white/10 bg-white/10 text-white hover:border-[#f73145]/30 hover:bg-[#f73145]/10"
              }`}
            >
              <span>{option}</span>
              {!isAnswered && (
                <span className="text-[#f73145] opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!isAnswered && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          or just type your answer below
          <span className="h-px flex-1 bg-white/10" />
        </div>
      )}
    </div>
  );
}
