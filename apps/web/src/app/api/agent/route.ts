import { NextRequest, NextResponse } from "next/server";
import { conversationalAgent } from "../../../agents/agent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { message, userId, roomId } = body as {
      message?: string;
      userId?: string;
      roomId?: string;
    };

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!userId || !roomId) {
      return NextResponse.json(
        { error: "userId and roomId are required" },
        { status: 400 }
      );
    }
    // Create threadId and resourceId for memory management
    const threadId = `${userId}-${roomId}`;
    const resourceId = roomId;

    const result = await conversationalAgent.generateVNext(message, {
      threadId,
      resourceId,
    });

    const response = {
      response: result.text,
      userId: userId,
      roomId: roomId,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate response", details: errorMessage },
      { status: 500 }
    );
  }
}
