"use client";
import React, { useState, useEffect, useRef } from "react";
import { Room, RoomEvent } from "livekit-client";
import { ChatMessage } from "../../types/chatMessage";
import { useSession, signOut } from "next-auth/react";
import { Loader2, Users, MessageCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { liveKitAgent } from "../../services/livekitAgent";

function Rooms() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle authentication redirect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Cleanup room and agent on component unmount
  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
      // Stop AI agent
      liveKitAgent.stopAgent().catch(console.error);
    };
  }, [room]);

  useEffect(() => {
    if (room) {
      const handleTextMessage = (payload: any, participant?: any) => {
        let messageText = "";
        let senderIdentity = "Unknown";

        // Handle different payload types
        if (payload instanceof Uint8Array) {
          messageText = new TextDecoder().decode(payload);
          senderIdentity = participant?.identity || "Unknown";
        } else if (typeof payload === "string") {
          messageText = payload;
        } else if (payload.payload) {
          messageText = payload.payload;
          senderIdentity = payload.from || payload.senderIdentity || "Unknown";
        } else if (payload.data) {
          messageText = new TextDecoder().decode(payload.data);
          senderIdentity =
            participant?.identity || payload.participant?.identity || "Unknown";
        } else {
          return; // Skip unknown payload types
        }

        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          text: messageText,
          sender: senderIdentity,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMsg]);
      };

      room.on(RoomEvent.DataReceived, handleTextMessage);

      return () => {
        room.off(RoomEvent.DataReceived, handleTextMessage);
      };
    }
  }, [room]);

  const connectToRoom = async () => {
    if (!roomId.trim()) {
      setError("Please enter a room ID");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
      if (!wsUrl) {
        throw new Error(
          "NEXT_PUBLIC_LIVEKIT_URL environment variable is not set"
        );
      }

      const username = session?.user?.name || session?.user?.email || "Guest";

      // Pass roomId as query parameter
      const tokenResponse = await fetch(
        `/api/getToken/${encodeURIComponent(username)}/${encodeURIComponent(roomId.trim())}`
      );

      if (!tokenResponse.ok) {
        throw new Error(
          `Failed to fetch token: ${tokenResponse.status} ${tokenResponse.statusText}`
        );
      }

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error);
      }

      const token = tokenData.token;

      const newRoom = new Room();
      setRoom(newRoom);

      await newRoom.connect(wsUrl, token);

      // Start AI agent for this room
      try {
        const agentTokenResponse = await fetch(
          `/api/getAgentToken/${encodeURIComponent(roomId.trim())}`
        );

        if (agentTokenResponse.ok) {
          const agentTokenData = await agentTokenResponse.json();
          if (agentTokenData.token) {
            await liveKitAgent.startAgent(
              wsUrl,
              agentTokenData.token,
              roomId.trim()
            );
            console.log("AI Agent started successfully");
          }
        }
      } catch (agentError) {
        console.error("Failed to start AI agent:", agentError);
        // Don't fail the connection if agent fails
      }

      setIsConnected(true);

      const welcomeMsg: ChatMessage = {
        id: "welcome",
        text: `Welcome to room "${roomId}"! You can now send messages to other participants and chat with our AI assistant.`,
        sender: "System",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    } catch (err) {
      console.error("Failed to connect to room:", err);
      setError(err instanceof Error ? err.message : "Failed to connect");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectFromRoom = async () => {
    if (room) {
      await room.disconnect();
      setIsConnected(false);
      setRoom(null);
      setMessages([]);
      setRoomId("");

      // Stop AI agent
      try {
        await liveKitAgent.stopAgent();
        console.log("AI Agent stopped");
      } catch (agentError) {
        console.error("Failed to stop AI agent:", agentError);
      }
    }
  };

  const sendMessage = async () => {
    if (!room || !newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const text = newMessage.trim();

      await room.localParticipant.publishData(new TextEncoder().encode(text), {
        reliable: true,
      });

      const sentMsg: ChatMessage = {
        id: Date.now().toString(),
        text: text,
        sender: room.localParticipant.identity || "You",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, sentMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isConnected) {
        connectToRoom();
      } else {
        sendMessage();
      }
    }
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 text-center relative z-10">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Loading...</h2>
            <p className="text-sm text-gray-400">
              Preparing your chat experience
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 text-center relative z-10">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              Redirecting...
            </h2>
            <p className="text-sm text-gray-400">Taking you to login</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden animate-in fade-in duration-700">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-6xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-4 duration-500 delay-200">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none" />
        <div className="p-6 border-b border-gray-700 relative z-20">
          {/* Added relative z-20 */}
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                LiveKit Chat Room
              </h1>
              <p className="text-sm text-gray-400">
                Welcome, {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  try {
                    await signOut({
                      redirect: false,
                      callbackUrl: "/login",
                    });
                  } catch (error) {
                    console.error("Sign out error:", error);
                    setError("Failed to sign out. Please try again.");
                  }
                }}
                type="button"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-red-500/25 cursor-pointer"
                style={{ pointerEvents: "auto" }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 relative z-10">
          {!isConnected ? (
            <div className="max-w-lg mx-auto space-y-8">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Join a Chat Room
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Connect with other participants in real-time conversations
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="roomId"
                    className="block text-sm font-semibold text-gray-300 mb-3"
                  >
                    Room ID
                  </label>
                  <input
                    id="roomId"
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter room ID (e.g., meeting-123)"
                    className="w-full px-5 py-4 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                    disabled={isConnecting}
                  />
                </div>

                <button
                  onClick={connectToRoom}
                  disabled={isConnecting || !roomId.trim()}
                  className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                    isConnecting || !roomId.trim()
                      ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
                  }`}
                >
                  {isConnecting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Join Room</span>
                    </div>
                  )}
                </button>
              </div>

              {error && (
                <div className="p-5 bg-red-900/30 border border-red-700/50 text-red-300 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Error: {error}</span>
                  </div>
                </div>
              )}

              <div className="text-center pt-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-600/30">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-400 font-medium">
                    Status: Disconnected
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Connection Status */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <h3 className="font-bold text-green-300 text-lg">
                      Connected
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm text-green-200 mb-6">
                    <div className="flex justify-between items-center p-3 bg-green-900/30 rounded-lg">
                      <span className="text-gray-400 font-medium">Room:</span>
                      <span className="text-white font-semibold">{roomId}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900/30 rounded-lg">
                      <span className="text-gray-400 font-medium">User:</span>
                      <span className="text-white font-semibold">
                        {session?.user?.name || session?.user?.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={disconnectFromRoom}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 active:scale-95"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Leave Room</span>
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 h-[500px] flex flex-col backdrop-blur-sm shadow-xl">
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-700/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-lg">
                      Chat Room: {roomId}
                    </h3>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/30 pr-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-sm ${
                          message.sender === "System"
                            ? "mx-auto"
                            : message.sender ===
                                (room?.localParticipant?.identity || "You")
                              ? "ml-auto"
                              : "mr-auto"
                        }`}
                      >
                        <div
                          className={`p-4 rounded-2xl shadow-lg ${
                            message.sender === "System"
                              ? "bg-gradient-to-r from-blue-900/60 to-purple-900/60 text-blue-200 text-center border border-blue-700/50"
                              : message.sender ===
                                  (room?.localParticipant?.identity || "You")
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200"
                          }`}
                        >
                          <div className="text-xs opacity-80 mb-2 font-medium">
                            {message.sender} •{" "}
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="text-sm leading-relaxed">
                            {message.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-5 py-3 bg-gray-700/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                      disabled={isSending}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isSending}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                        !newMessage.trim() || isSending
                          ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95"
                      }`}
                    >
                      {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MessageCircle className="w-4 h-4" />
                      )}
                      <span>{isSending ? "Sending" : "Send"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && isConnected && (
            <div className="mt-6 p-5 bg-red-900/30 border border-red-700/50 text-red-300 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Error: {error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
