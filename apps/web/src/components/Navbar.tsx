"use client";

import {
  ArrowRight,
  MessageCircle,
  MenuIcon,
  Bot,
  Mic,
  Brain,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

const Navbar5 = () => {
  const features = [
    {
      title: "Smart Rooms",
      description: "Create AI-powered chat spaces",
      href: "#",
    },
    {
      title: "Voice Chat",
      description: "Talk naturally with AI agents",
      href: "#",
    },
    {
      title: "Memory Recall",
      description: "AI remembers past conversations",
      href: "#",
    },
    {
      title: "Real-time Sync",
      description: "Instant WebSocket connections",
      href: "#",
    },
    {
      title: "Multi-Agent",
      description: "Deploy multiple AI personalities",
      href: "#",
    },
    {
      title: "Analytics",
      description: "Track conversation insights",
      href: "#",
    },
  ];


  return (
    <section className="sticky top-0 z-50 border-b border-border bg-gradient-to-b from-[#0b0f14] via-[#0a0e13] to-black">
      <div className="w-full max-sm:px-4 max-sm:py-2 ">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex lg:w-1/2 lg:pl-6  items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Neural Nexus
            </h3>
          </a>
          <div className="hidden lg:flex items-center h-16 ml-auto">
            <a
              href="/login"
              className="px-8 py-2 text-lg font-medium text-muted-foreground h-full flex items-center gap-2"
            >
              <span>Login</span>
              <ArrowRight />
            </a>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <MenuIcon className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Neural Nexus
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Features
                  </a>
                  <a href="#" className="font-medium">
                    Rooms
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <a href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };
