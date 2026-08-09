export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1" aria-label="Starnest is typing">
      <span className="size-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.3s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.15s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-white/40" />
    </div>
  );
}
