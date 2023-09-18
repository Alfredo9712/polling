"use client";

import * as toxicity from "@tensorflow-models/toxicity";
import { useState } from "react";

import { Button } from "@/compononents/ui/button";
import { Input } from "@/compononents/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PollForm from "@/compononents/ui/pollForm";

export default function PollsAddPage() {
  const [text, setText] = useState("");
  const [isInnappropriate, setIsInnappropriate] = useState(false);

  return (
    <div>
      <Link href="/polls" className="flex gap-1 pb-10">
        <ArrowLeft /> Back
      </Link>
      {isInnappropriate && <h1>Unable to submit, text is innappropriate</h1>}
      <h1 className="text-2xl">Create Poll</h1>

      <PollForm />
    </div>
  );
}
