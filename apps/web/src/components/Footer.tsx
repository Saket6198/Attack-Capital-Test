import React from "react";
import { FaGithub } from "react-icons/fa";

interface Footer7Props {}

const Footer = ({}: Footer7Props) => {
  return (
    <section className="py-10 lg:py-12 bg-gradient-to-b from-slate-900/50 to-black/80">
      <div className="w-full">
        <div className="px-6 lg:px-16 mx-auto w-full flex flex-col items-center gap-4 text-center">
          <p className="text-slate-300 text-sm md:text-base">
            Built by engineers, for real-world operations
          </p>
          <a
            href="https://www.github.com/saket6198"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <FaGithub className="size-5" />
            <span className="text-sm md:text-base">github.com/saket6198</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Footer };
