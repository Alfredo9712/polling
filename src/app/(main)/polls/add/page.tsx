"use client";

import * as toxicity from "@tensorflow-models/toxicity";
import { useState } from "react";

import { Button } from "@/compononents/ui/button";
import { Input } from "@/compononents/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PollForm from "@/compononents/ui/pollForm";

export default function PollsAddPage() {
  return (
    <div>
      <Link href="/polls" className="flex gap-1 pb-5">
        <ArrowLeft /> Back
      </Link>

      <h1 className="text-2xl">Create Poll</h1>

      <PollForm />
    </div>
  );
}
