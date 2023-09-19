"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PollForm from "@/compononents/ui/pollForm";

export default function PollsAddPage() {
  return (
    <div>
      <Link href="/polls" className="flex gap-1 pb-5 w-fit">
        <ArrowLeft /> Back
      </Link>
      <h1 className="text-2xl pb-2">Create Poll</h1>
      <PollForm />
    </div>
  );
}
