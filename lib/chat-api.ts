import axios from "axios";
import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

export async function sendChatMessage(payload: ChatApiRequest): Promise<ChatApiResponse> {
  const response = await axios.post<ChatApiResponse>("/api/chat", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
