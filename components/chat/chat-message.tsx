import { OptionGrid } from "@/components/chat/option-grid";
import { RecommendationList } from "@/components/chat/recommendation-list";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionSelect: (option: string) => void;
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[560px] rounded-2xl rounded-br-[4px] border border-white/10 bg-white/10 px-4 py-3 font-body text-[15px] text-white">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3.5">
      <div className="flex size-[30px] shrink-0 items-center justify-center rounded-lg border border-[#f73145]/25 bg-white/10 font-display text-[13px] font-bold text-[#f73145]">
        S
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 font-body text-xs font-semibold text-white/40">Starnest</div>
        <div className="font-body text-[15px] leading-relaxed text-white">{message.text}</div>
        {message.options && message.options.length > 0 && (
          <OptionGrid
            options={message.options}
            answeredOption={message.answeredOption}
            onSelect={onOptionSelect}
          />
        )}
        {message.recommendations && message.recommendations.length > 0 && (
          <RecommendationList recommendations={message.recommendations} />
        )}
      </div>
    </div>
  );
}
