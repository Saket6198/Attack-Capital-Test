"use client";

import { Button } from "@/src/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/rooms");
    }
  }, [status, session, router]);

  const handleGoogleSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/rooms",
        redirect: true,
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setIsLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-black">
        <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-sm text-gray-300">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-black">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur p-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">
          Login
        </h1>
        <p className="mb-8 text-sm text-gray-300">
          Continue with your Google account
        </p>

        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          type="button"
          className={`w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center gap-3 transition-all duration-200 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>

        {isLoading && (
          <p className="mt-4 text-xs text-gray-400">Redirecting to Google...</p>
        )}
      </div>
    </main>
  );
}
