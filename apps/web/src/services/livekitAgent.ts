import { Room } from "livekit-client";

export class LiveKitAgentService {
  private agentRoom: Room | null = null;
  private isAgentConnected = false;

  async startAgent(
    wsUrl: string,
    token: string,
    roomName: string
  ): Promise<void> {
    console.log("Starting agent with:", {
      wsUrl,
      roomName,
      hasToken: !!token,
    });
    try {
      if (this.agentRoom) {
        await this.agentRoom.disconnect();
      }

      this.agentRoom = new Room();

      await this.agentRoom.connect(wsUrl, token);
      this.isAgentConnected = true;
      this.agentRoom.on("dataReceived", async (payload, participant) => {
        try {
          const userMessage = new TextDecoder().decode(payload);
          const agentIdentity = this.agentRoom?.localParticipant?.identity;

          if (participant?.identity === agentIdentity) {
            return;
          }

          const response = await this.callAgentAPI(
            userMessage,
            participant?.identity || "unknown",
            roomName
          );

          if (response && this.agentRoom) {
            this.agentRoom.localParticipant.publishData(
              new TextEncoder().encode(response),
              { reliable: true }
            );
          } else {
            console.log("No response to send");
          }
        } catch (error) {
          console.error("Error processing agent response:", error);
        }
      });

      this.agentRoom.on("disconnected", () => {
        this.isAgentConnected = false;
        this.agentRoom = null;
      });
    } catch (error) {
      console.error("Failed to start AI agent:", error);
      this.isAgentConnected = false;
      throw error;
    }
  }
  private async callAgentAPI(
    message: string,
    userId: string,
    roomId: string
  ): Promise<string | null> {
    try {
      const requestBody = JSON.stringify({
        message,
        userId,
        roomId,
      });

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Agent API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      return null;
    }
  }

  async stopAgent(): Promise<void> {
    if (this.agentRoom) {
      await this.agentRoom.disconnect();
      this.agentRoom = null;
      this.isAgentConnected = false;
    }
  }

  isConnected(): boolean {
    return this.isAgentConnected;
  }

  getRoomName(): string | null {
    return this.agentRoom?.name || null;
  }
}

export const liveKitAgent = new LiveKitAgentService();
