export type Category = "movies" | "restaurants" | "games" | "books" | "gadgets";

export interface RecommendationMetadata {
  title?: string;
  genres?: string;
  release_year?: number;
  rating_star?: number;
  popularity_score?: number;
  [key: string]: string | number | undefined;
}

export interface Recommendation {
  item_id: string;
  title: string;
  category: string;
  score: number;
  metadata: RecommendationMetadata;
}

export interface ChatApiRequest {
  session_id: string;
  message: string;
  user_id: string | null;
  category: Category;
}

export interface ChatApiResponse {
  session_id: string;
  reply: string;
  options: string[];
  recommendations: Recommendation[];
  is_recommendation: boolean;
}

export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  text: string;
  options?: string[];
  recommendations?: Recommendation[];
  answeredOption?: string;
}
