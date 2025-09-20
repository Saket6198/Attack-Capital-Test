import { useEffect, useState } from "react";
import { liveKitAgent } from "../services/livekitAgent";

export const useLiveKitAgent = () => {
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const [agentRoomName, setAgentRoomName] = useState<string | null>(null);
  const [isAgentLoading, setIsAgentLoading] = useState(false);

  const startAgent = async (wsUrl: string, roomName: string) => {
    console.log("🔄 Starting agent for room:", roomName);
    try {
      setIsAgentLoading(true);

      const tokenResponse = await fetch(
        `/api/getAgentToken/${encodeURIComponent(roomName)}`
      );

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(
          `Failed to get agent token: ${tokenResponse.status} ${errorText}`
        );
      }

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error);
      }

      await liveKitAgent.startAgent(wsUrl, tokenData.token, roomName);

      setIsAgentConnected(true);
      setAgentRoomName(roomName);
    } catch (error) {
      throw error;
    } finally {
      setIsAgentLoading(false);
    }
  };

  const stopAgent = async () => {
    try {
      await liveKitAgent.stopAgent();
      setIsAgentConnected(false);
      setAgentRoomName(null);
    } catch (error) {
      console.error("Failed to stop agent:", error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (liveKitAgent.isConnected()) {
        liveKitAgent.stopAgent();
      }
    };
  }, []);

  return {
    isAgentConnected,
    agentRoomName,
    isAgentLoading,
    startAgent,
    stopAgent,
  };
};
