"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { LogInIcon } from "lucide-react";

import { Button } from "@/compononents/ui/button";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) router.push("/polls");
  });
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

      <Button
        className="flex items-center gap-3"
        onClick={() => signIn("google", { callbackUrl: "/polls" })}
      >
        <LogInIcon /> Continue with Google
      </Button>
    </div>
  );
}
