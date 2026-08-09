interface NavbarProps {
  variant?: "overlay" | "static";
  rightSlot?: React.ReactNode;
}

export function Navbar({ variant = "overlay", rightSlot }: NavbarProps) {
  return (
    <header
      className={`flex items-center justify-between gap-4 px-6 py-6 sm:px-12 sm:py-8 ${
        variant === "overlay"
          ? "absolute inset-x-0 top-0 z-20"
          : "relative shrink-0 border-b border-white/10"
      }`}
    >
      <div className="flex items-center gap-4">
        <img src="/brand/starnest-logo.svg" alt="Starnest" className="h-4 w-auto sm:h-5" />
        <div className="hidden items-center gap-2 border-l border-white pl-4 sm:flex">
          <img
            src="/icons/location-pin.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-[15px]"
          />
          <div className="flex flex-col gap-0.5 font-body leading-[0.9] text-white">
            <span className="text-sm font-semibold">Gachibowli</span>
            <span className="text-xs font-medium">Hyderabad</span>
          </div>
        </div>
      </div>
      {rightSlot ?? (
        <button
          type="button"
          className="min-w-[90px] shrink-0 rounded-lg border border-[#f73145] bg-[#f73145] px-3.5 py-2 font-body text-xs font-semibold text-white transition-colors hover:bg-[#f73145]/90"
        >
          Pre - Register
        </button>
      )}
    </header>
  );
}
