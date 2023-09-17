"use client";

import { Button } from "@/compononents/ui/button";
import * as toxicity from "@tensorflow-models/toxicity";
import { useState } from "react";

export default function PollsAddPage() {
  const [text, setText] = useState("");
  const [isInnappropriate, setIsInnappropriate] = useState(false);
  const handleSubmit = async () => {
    const testToxicitySentences = [text];

    const threshold = 0.9;

    const model = await toxicity.load(threshold, [
      "insult",
      "threat",
      "toxicity",
    ]);

    const predictions = await model.classify(testToxicitySentences);
    const isInnappropriate = !!predictions.find((label) =>
      label.results.find((result) => result.match === true)
    );
    setIsInnappropriate(isInnappropriate);
  };

  return (
    <div>
      {isInnappropriate && <h1>Unable to submit, text is innappropriate</h1>}
      <h1>Add Poll here</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleSubmit}>Test toxicity</Button>
    </div>
  );
}
