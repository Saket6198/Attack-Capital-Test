import { MessageSquare, MoveRight, Mic, Brain, Users } from "lucide-react";
import React from "react";

interface FeatureItem {
  logo: string;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

interface AIAgentLandingProps {
  featuredFeature?: FeatureItem;
  features?: FeatureItem[];
}

const defaultFeaturedFeature: FeatureItem = {
  logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  company: "NeuralSpace",
  tags: "SEMANTIC MEMORY / REAL-TIME CONVERSATIONS",
  title: "AI Agents That Remember Every Word.",
  subtitle: "Experience conversations with context that never fades.",
  image:
    "https://cdn.cosmos.so/b78e0b56-841f-4af4-8d4c-97a852aa6dae?format=jpeg",
  link: "/",
};

const defaultFeatures: FeatureItem[] = [
  {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
    company: "VoiceSync",
    tags: "VOICE RECOGNITION / NATURAL SPEECH",
    title: "Speak naturally with AI companions.",
    subtitle: "Voice-powered conversations that feel human.",
    image: "",
    link: "https://shadcnblocks.com",
  },
  {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
    company: "RoomConnect",
    tags: "WEBSOCKET ROOMS / MULTI-USER SPACES",
    title: "Create spaces where minds converge.",
    subtitle: "Instant rooms for collaborative AI interactions.",
    image: "",
    link: "https://shadcnblocks.com",
  },
];

const CaseStudySection = ({
  featuredFeature = defaultFeaturedFeature,
  features = defaultFeatures,
}: AIAgentLandingProps) => {
  return (
    <section className="bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-black/50">
      <div className="w-full">
        <div className="border-purple-500/30 border border-r-0 border-l-0 backdrop-blur-xl">
          <a className="group grid gap-4 overflow-hidden px-6 transition-all duration-700 ease-out lg:grid-cols-2 xl:px-28 hover:bg-gradient-to-r hover:from-purple-900/10 hover:to-blue-900/10">
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16">
              <div className="flex items-center text-cyan-300 group-hover:text-cyan-100 gap-2 text-2xl font-medium transition-colors duration-500">
                <Brain className="text-cyan-300 group-hover:text-cyan-100 animate-pulse" />
                {featuredFeature.company}
              </div>
              <div>
                <span className="text-purple-300/70 text-xs sm:text-sm font-medium tracking-wider">
                  {featuredFeature.tags}
                </span>
                <h2 className="mb-5 mt-4 text-balance text-white/90 group-hover:text-white text-2xl font-semibold sm:text-3xl sm:leading-10 transition-colors duration-500">
                  {featuredFeature.title}
                  <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium transition-all duration-700 ease-out group-hover:from-purple-300 group-hover:to-cyan-300">
                    {" "}
                    {featuredFeature.subtitle}
                  </span>
                </h2>
              </div>
            </div>
            <div className="relative isolate py-16">
              <div className="border-purple-500/40 bg-gradient-to-br from-purple-900/20 to-blue-900/20 relative isolate h-full border p-2 rounded-lg backdrop-blur-sm">
                <div className="h-full overflow-hidden rounded-md">
                  <div
                    aria-label="AI Agent Visual"
                    className="relative h-full w-full rounded-md"
                  >
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#a78bfa_0%,transparent_35%),radial-gradient(circle_at_80%_30%,#60a5fa_0%,transparent_30%),radial-gradient(circle_at_40%_80%,#22d3ee_0%,transparent_30%)]"></div>
                    <div className="absolute inset-0 grid grid-cols-14 opacity-10">
                      {Array.from({ length: 14 * 9 }).map((_, i) => (
                        <div key={i} className="border border-white/5" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-blue-900/30 group-hover:from-purple-800/40 transition-all duration-700"></div>
                </div>
              </div>
            </div>
          </a>
          <div className="border-purple-500/30 flex border-t backdrop-blur-xl">
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--purple-400)_1px,transparent_1px)] opacity-20 [background-size:8px_8px] xl:block"></div>
            <div className="grid lg:grid-cols-2">
              {features.map((item, idx) => (
                <a
                  key={item.company}
                  className={`border-purple-500/30 text-white/85 group hover:text-white backdrop-blur-xl group flex flex-col justify-between gap-12 px-6 py-8 transition-all duration-700 ease-out md:py-16 lg:pb-16 xl:gap-16 hover:bg-gradient-to-br hover:from-purple-900/15 hover:to-blue-900/15 ${
                    idx === 0
                      ? "xl:border-l xl:pl-8"
                      : "border-t lg:border-l lg:border-t-0 xl:border-r xl:pl-8"
                  }`}
                >
                  <div className="flex items-center gap-2 text-2xl font-medium transition-colors duration-500">
                    {idx === 0 ? (
                      <Mic className="text-green-400 group-hover:text-green-300 animate-pulse" />
                    ) : (
                      <Users className="text-blue-400 group-hover:text-blue-300" />
                    )}
                    <span className="text-cyan-300 group-hover:text-cyan-100">
                      {item.company}
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-300/70 text-xs sm:text-sm font-medium tracking-wider">
                      {item.tags}
                    </span>
                    <h2 className="mb-5 mt-4 text-balance text-2xl font-semibold sm:text-3xl sm:leading-10 transition-colors duration-500">
                      {item.title}
                      <span className="text-gradient bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium transition-all duration-700 ease-out group-hover:from-purple-300 group-hover:to-cyan-300">
                        {" "}
                        {item.subtitle}
                      </span>
                    </h2>
                  </div>
                </a>
              ))}
            </div>
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--purple-400)_1px,transparent_1px)] opacity-20 [background-size:8px_8px] xl:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudySection };
