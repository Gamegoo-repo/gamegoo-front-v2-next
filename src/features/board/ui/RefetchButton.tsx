"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

export function RefetchButton({ refetch }: { refetch: () => void }) {
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotate(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [rotate]);

  return (
    <div className="flex size-12 items-center justify-center rounded-md">
      <Button
        variant="ghost"
        onClick={() => {
          refetch();

          setRotate(true);
        }}
      >
        <RefreshCcw className={cn("size-8 text-violet-600", rotate && "spin-object")} />
      </Button>
    </div>
  );
}
