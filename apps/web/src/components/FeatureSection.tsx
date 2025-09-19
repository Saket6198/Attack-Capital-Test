import { Circle } from "lucide-react";
import React from "react";

type Props = {};

function FeatureSection({}: Props) {
  return (
    <div className="w-full backdrop-blur-2xl min-h-[300px] max-sm:py-16 lg:h-[600px]  border-b flex flex-col-reverse lg:flex-row items-center">
      <div className="lg:w-1/2 flex   lg:justify-center">
        <div
          aria-label="Feature Visual"
          className="relative z-10 h-[240px] w-[90%] max-w-[520px] rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 shadow-xl shadow-blue-500/10"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#60a5fa_0%,transparent_35%),radial-gradient(circle_at_80%_30%,#a78bfa_0%,transparent_30%),radial-gradient(circle_at_40%_80%,#22d3ee_0%,transparent_30%)]"></div>
          <div className="absolute inset-0 grid grid-cols-12 opacity-10">
            {Array.from({ length: 12 * 6 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>
        </div>
      </div>{" "}
      <div className="lg:w-1/2 lg:border-l lg:pl-16 px-8  flex flex-col justify-center h-full">
        <div className="flex mb-8 items-center gap-2">
          <h3 className="font-sans text-base capitalize">
            CONVERSATIONS THAT ARE
          </h3>
          <Circle
            size={16}
            strokeWidth={4}
            className="stroke-[#d0f6ae] font-extrabold"
          />
        </div>
        <h1 className="">
          Powered by semantic <br /> memory
        </h1>
        <p className="mt-8 max-w-lg ">
          Real-time voice interactions with AI agents that remember every
          conversation across all your sessions
        </p>
      </div>
    </div>
  );
}

export default FeatureSection;
