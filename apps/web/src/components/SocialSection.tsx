import { ArrowUpRight, MessageSquare, Brain, Mic, Users } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const SocialSection = () => {
  return (
    <section className="py-16 lg:py-32 border border-t-0 border-x-0">
      <div className="w-full px-8 xl:px-28">
        <h2 className="mb-5 text-white/80 text-2xl font-semibold md:text-3xl">
          Connect with AI minds
        </h2>
        <p className="font-medium text-muted-foreground md:text-xl">
          Create rooms, invite intelligent agents, and experience conversations.
        </p>
        <div className="mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
          <a className="group rounded-none backdrop-blur-3xl border border-border border-r lg:border-r-0 p-6">
            <div className="flex items-center justify-between gap-4">
              <Users className="size-5 text-purple-400" />
              <ArrowUpRight className="size-4 text-white/80 -translate-x-2 translate-y-2 opacity-100 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold text-white/80">
                Room Creation
              </h3>
              <p className="text-sm text-muted-foreground">
                Create private spaces where AI agents join instantly.
              </p>
            </div>
          </a>
          <a className="group rounded-none backdrop-blur-3xl border border-border lg:border-r-0  p-6">
            <div className="flex items-center justify-between gap-4">
              <Brain className="size-5 text-cyan-400" />
              <ArrowUpRight className="size-4 text-white/80 -translate-x-2 translate-y-2 opacity-100 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold text-white/80">
                Memory Recall
              </h3>
              <p className="text-sm text-muted-foreground">
                Agents remember every conversation with perfect context.
              </p>
            </div>
          </a>
          <a className="group rounded-none backdrop-blur-3xl border border-border lg:border-r-0  p-6">
            <div className="flex items-center justify-between gap-4">
              <Mic className="size-5 text-emerald-400" />
              <ArrowUpRight className="size-4 text-white/80 -translate-x-2 translate-y-2 opacity-100 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold text-white/80">Voice Chat</h3>
              <p className="text-sm text-muted-foreground">
                Speak naturally with AI agents using real-time voice.
              </p>
            </div>
          </a>
          <a className="group rounded-none backdrop-blur-3xl border border-border p-6">
            <div className="flex items-center justify-between gap-4">
              <MessageSquare className="size-5 text-amber-400" />
              <ArrowUpRight className="size-4 text-white/80 -translate-x-2 translate-y-2 opacity-100 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <h3 className="mb-1 font-semibold text-white/80">
                Live Sessions
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time websocket connections for seamless interactions.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { SocialSection };
