"use client";

import { Button } from "@/compononents/ui/button";
import { Plus, PlusIcon } from "lucide-react";

export default function PollsPage() {
  return (
    <div className="mx-auto px-2">
      <div className="flex items-center justify-between">
        <h1 className="font-medium">View active polls</h1>
        <Button className="gap-2">
          <Plus size={20} />
          Add poll
        </Button>
      </div>
    </div>
  );
}
