import axios from "axios";
import { NextResponse } from "next/server";
import type { ChatApiRequest, ChatApiResponse } from "@/types/chat";

const CHAT_API_URL = process.env.CHAT_API_URL!;

export async function POST(request: Request): Promise<NextResponse> {
  const payload: ChatApiRequest = await request.json();

  try {
    const response = await axios.post<ChatApiResponse>(CHAT_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Chat request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
