"use client";
import React, { useState, useEffect, useRef } from "react";
import { Room, RoomEvent } from "livekit-client";
import { ChatMessage } from "../../types/chatMessage";

function Rooms() {
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

  useEffect(() => {
    if (room) {
      const handleTextMessage = (payload: any) => {
        console.log("Received message:", payload);
        let messageText = "";
        let senderIdentity = "Unknown";

        if (typeof payload === "string") {
          messageText = payload;
        } else if (payload.payload) {
          messageText = payload.payload;
          senderIdentity = payload.from || payload.senderIdentity || "Unknown";
        } else if (payload.data) {
          messageText = new TextDecoder().decode(payload.data);
          senderIdentity = payload.participant?.identity || "Unknown";
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
    setIsConnecting(true);
    setError("");

    try {
      const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
      if (!wsUrl) {
        throw new Error(
          "NEXT_PUBLIC_LIVEKIT_URL environment variable is not set"
        );
      }

      const tokenResponse = await fetch("/api/getToken");
      if (!tokenResponse.ok) {
        throw new Error("Failed to fetch token from API");
      }
      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error);
      }

      const token = tokenData.token;

      const newRoom = new Room();
      setRoom(newRoom);

      await newRoom.connect(wsUrl, token);

      setIsConnected(true);
      console.log("Connected to LiveKit room successfully!");

      const welcomeMsg: ChatMessage = {
        id: "welcome",
        text: "Welcome to the chat! You can now send messages to other participants.",
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
      console.log("Disconnected from LiveKit room");
    }
  };

  const sendMessage = async () => {
    if (!room || !newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const text = newMessage.trim();
      const info = await room.localParticipant.sendText(text, {
        topic: "my-topic",
      });

      console.log(`Sent text with stream ID: ${info.id}`);

      const sentMsg: ChatMessage = {
        id: info.id,
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
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">
            LiveKit Room Connection
          </h1>
        </div>

        <div className="p-6">
          {!isConnected ? (
            <div className="text-center space-y-4">
              <button
                onClick={connectToRoom}
                disabled={isConnecting}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  isConnecting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isConnecting ? "Connecting..." : "Connect to Room"}
              </button>

              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-md mx-auto">
                  Error: {error}
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-gray-500">
                    Disconnected
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="font-medium text-green-800 mb-2">Connected</h3>
                  <p className="text-sm text-green-600 mb-4">
                    Room: my-room
                    <br />
                    Identity: {room?.localParticipant?.identity || "Unknown"}
                  </p>
                  <button
                    onClick={disconnectFromRoom}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-md p-4 h-96 flex flex-col">
                  <h3 className="font-medium text-gray-800 mb-4">Chat Room</h3>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg max-w-xs ${
                          message.sender === "System"
                            ? "bg-blue-100 text-blue-800 mx-auto text-center"
                            : message.sender ===
                                (room?.localParticipant?.identity || "You")
                              ? "bg-blue-500 text-white ml-auto"
                              : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="text-xs opacity-75 mb-1">
                          {message.sender} •{" "}
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        <div className="text-sm">{message.text}</div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSending}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isSending}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        !newMessage.trim() || isSending
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isSending ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && isConnected && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
