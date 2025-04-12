"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        p-4
        bg-no-repeat
        bg-cover
        bg-center
      "
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center space-y-10 max-w-2xl mx-auto px-4">
        {/* Subheadline */}
        <h3 className="bg-white rounded-full px-6 py-2 text-black text-md f inline-block animate-[fade-in_1s_ease-in-out]">
          Where Excalidraw Meets AI
        </h3>

        {/* Main headline with combined fade-in and scale effects */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight ">
          Prompt2Draw
        </h1>

        {/* Tagline */}
        <p className="animate-[fade-in_2s_ease-in-out] text-xl md:text-2xl text-gray-200">
          Transform your ideas into stunning visuals in seconds.
        </p>

        {/* Call-to-Action using your prebuilt Button component */}
        <div className="animate-[fade-in_2.5s_ease-in-out] mt-6 ">
          <Button variant="primary" size="lg" onClick={() => router.push("/draw")} className="mx-auto bg-white text-black">
            Start Drawing
          </Button>
        </div>

        <p className="animate-[fade-in_3s_ease-in-out] text-sm text-gray-400">
          Begin your creative journey instantly — no sign-up required.
        </p>
      </div>
    </main>
  );
}