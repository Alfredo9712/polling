"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/compononents/ui/button";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
