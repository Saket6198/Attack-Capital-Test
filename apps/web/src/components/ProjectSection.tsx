import {
  ArrowDownRight,
  ArrowUpRight,
  MessageCircle,
  Mic,
  Brain,
  Users,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

const projects = [
  {
    heading: "Smart Room Creation",
    subheading: "WebSocket-Powered Spaces",
    description:
      "Create personalized chat rooms where AI agents seamlessly join and engage. Experience real-time conversations powered by advanced WebSocket technology, ensuring instant responses and fluid interactions with intelligent companions.",
    image:
      "https://cdn.cosmos.so/d33ccd12-48ec-47f7-bd5e-bd497a5f5fb1?format=jpeg",
    url: "#",
  },
  {
    heading: "Semantic Memory Engine",
    subheading: "Context-Aware Intelligence",
    description:
      "Our AI agents remember everything. With advanced semantic recall memory, every conversation builds upon previous interactions, creating deeply personalized and contextually rich dialogues that evolve with each session.",
    image:
      "https://cdn.cosmos.so/d828d816-1d9b-4816-9353-7a58fcfde3a9?format=jpeg",
    url: "#",
  },
  {
    heading: "Voice-First Experience",
    subheading: "Natural Communication",
    description:
      "Speak naturally with AI agents using cutting-edge voice recognition. Switch seamlessly between text and voice modes, making conversations feel as natural as talking to a friend, with crystal-clear audio processing.",
    image:
      "https://cdn.cosmos.so/70637007-22b1-4ad4-8076-e085f761c943?format=jpeg",
    url: "#",
  },
  {
    heading: "Multi-Agent Ecosystem",
    subheading: "Collaborative Intelligence",
    description:
      "Experience the future of AI interaction where multiple agents can join your room, each bringing unique personalities and expertise. Create dynamic group conversations that spark creativity and innovation.",
    image:
      "https://cdn.cosmos.so/ee6edeb0-9a64-4452-9a47-5cfa02039ab7?format=jpeg",
    url: "#",
  },
];

const ProjectSection = () => {
  return (
    <section className="py-16 lg:py-32 max-sm:px-6 w-full backdrop-blur-3xl">
      <div className="w-full">
        <div className="w-full lg:px-16 mx-auto">
          <p className="text-muted-foreground mb-1 uppercase md:text-lg">
            The Future of AI Conversation is Here
          </p>
          <h1 className="text-3xl font-bold uppercase md:text-7xl">Features</h1>
          <p className="text-muted-foreground mt-7 max-w-2xl">
            Discover how our platform revolutionizes AI interaction through
            intelligent room-based conversations. Experience memory-powered
            agents, seamless voice communication, and collaborative AI
            environments that adapt and remember every interaction.
          </p>
        </div>
        <div className="mt-24 flex flex-col gap-5 md:mt-36">
          {projects.map((project, idx) => (
            <a
              key={idx}
              className="group relative isolate min-h-96 lg:min-h-72 bg-cover bg-center px-5 py-14 lg:px-12 border border-x-0 max-sm:pb-32 lg:py-24"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            >
              <div className="relative z-10 flex flex-col gap-7 text-white/80 transition-colors duration-300 ease-out group-hover:text-white lg:flex-row">
                <div className="flex gap-1 text-2xl font-bold">
                  <span>/</span>
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5">
                  <h3 className="text-2xl font-bold lg:text-4xl">
                    {project.heading}
                  </h3>
                  <p className="text-sm font-medium uppercase">
                    {project.subheading}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <p>{project.description}</p>
                    <div className="mt-2.5 h-0 transition-all duration-300 ease-out group-hover:h-10"></div>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-xs absolute inset-0 z-0 bg-black/80 transition-all duration-300 ease-out group-hover:bg-black/50 group-hover:backdrop-blur-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProjectSection };
