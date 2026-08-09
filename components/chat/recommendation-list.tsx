import type { Recommendation } from "@/types/chat";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

function formatMeta(recommendation: Recommendation): string[] {
  const { metadata } = recommendation;
  const parts: string[] = [];
  if (metadata.release_year) parts.push(String(metadata.release_year));
  if (metadata.rating_star) parts.push(`${metadata.rating_star} ★`);
  if (metadata.genres) parts.push(metadata.genres);
  return parts;
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="mt-3.5 flex flex-col gap-2">
      {recommendations.map((recommendation, index) => (
        <div
          key={recommendation.item_id}
          className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 transition-colors hover:border-[#f73145]/30 hover:bg-[#f73145]/5"
        >
          <div className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-white/10 font-display text-sm font-bold text-[#f73145]">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-body text-[13.5px] font-semibold text-white">
              {recommendation.title}
            </div>
            <div className="flex items-center gap-1.5 font-body text-xs text-white/60">
              {formatMeta(recommendation).map((part, partIndex) => (
                <span key={part} className="flex items-center gap-1.5">
                  {partIndex > 0 && <span className="text-[#f73145]">•</span>}
                  {part}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
