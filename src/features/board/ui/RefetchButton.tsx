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
    <div className="flex size-12 items-center justify-center rounded-md hover:bg-gray-200">
      <Button
        className={cn(rotate && "spin-object")}
        onClick={() => {
          refetch();

          setRotate(true);
        }}
      >
        <RefreshCcw className="size-8" />
      </Button>
    </div>
  );
}
