import { ArrowRight, MessageCircle, Brain, Mic } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

const CtaSection = () => {
  return (
    <section className=" backdrop-blur-3xl border-b py-32">
      <div className=" w-full max-sm:px-12">
        <div className="flex flex-col items-start md:items-center">

          {/* Heading */}
          <h4 className="mt-4 text-2xl font-semibold tracking-tight md:text-center md:text-3xl xl:text-4xl">
            Experience AI agents that remember
          </h4>

          {/* Features */}
          <div className="mt-5 flex flex-wrap gap-4 md:justify-center xl:mt-8 xl:gap-7">
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <Brain className="h-4 w-4 stroke-[#d0f6ae] stroke-3" />
              Semantic memory
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <Mic className="h-4 w-4 stroke-[#d0f6ae] stroke-3" />
              Voice interaction
            </div>
            <div className="flex items-center gap-2 text-sm xl:text-base">
              <MessageCircle className="h-4 w-4 stroke-[#d0f6ae] stroke-3" />
              Real-time chat rooms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CtaSection };
