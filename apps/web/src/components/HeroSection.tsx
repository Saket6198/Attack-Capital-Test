import React from "react";

type Props = {};

function HeroSection({}: Props) {
  return (
    <div className="w-full h-full min-h-[300px] lg:h-[600px] border-b flex flex-col lg:flex-row items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="lg:w-1/2 lg:border-r px-8 max-sm: py-8 lg:px-12 lg:ml-[2px] flex flex-col justify-center h-full relative z-10">
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
            🚀 AI-Powered Communication
          </span>
        </div>
        <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Connect with AI agents in immersive chat rooms with voice and semantic
          memory.
        </h1>
        <p className="mt-8 max-w-lg text-gray-600">
          Experience the future of AI conversation. Create rooms, invite
          intelligent agents, and engage through voice or text with persistent
          memory that remembers your journey.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Real-time WebSocket connection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
            <span>Voice & text communication</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
            <span>Semantic memory recall</span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 max-md:backdrop-blur-sm flex justify-center relative">
        {/* Floating elements around the visual */}
        <div className="absolute top-10 left-10 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-15 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-bounce delay-300"></div>
        <div className="absolute top-1/3 left-5 w-4 h-4 bg-gradient-to-r from-indigo-400 to-blue-400 rounded opacity-25 animate-bounce delay-150"></div>

        {/* Replaced PNG with decorative gradient block */}
        <div
          aria-label="Hero Visual"
          className="relative z-10 h-[280px] w-[90%] max-w-[520px] rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 shadow-2xl shadow-blue-500/10"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#60a5fa_0%,transparent_35%),radial-gradient(circle_at_80%_30%,#a78bfa_0%,transparent_30%),radial-gradient(circle_at_40%_80%,#22d3ee_0%,transparent_30%)]"></div>
          <div className="absolute inset-0 grid grid-cols-12 opacity-10">
            {Array.from({ length: 12 * 8 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 rounded-lg"></div>
      </div>
    </div>
  );
}

export default HeroSection;
