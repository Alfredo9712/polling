"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/compononents/ui/button";
import { LogInIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="h-[50vh] flex  flex-col items-center gap-9 justify-center">
      <div className="text-center max-w-3xl transition-opacity ease-in duration-700 opacity-100 ">
        <h1 className="font-semibold text-4xl  mb-4 ">
          Make your voice heard with polling
        </h1>
        <p className="text-base  text-gray-500 mb-1">
          Connect with your audience and gather opinions and insights
          instantaneously.
        </p>
        <p className="text-base  text-gray-500">
          Say goodbye to the delays of traditional polling methods and hello to
          immediate feedback.
        </p>
      </div>
      <div>
        <Button className="flex items-center gap-3" onClick={() => signIn()}>
          <LogInIcon /> Continue with Google
        </Button>
      </div>
    </div>
  );
}
