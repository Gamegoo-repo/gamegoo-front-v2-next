"use client";

import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { normalizeSearchParam } from "@/shared/libs/normalizeSearchParam";
import { Button } from "@/shared/ui/button";

import { POST_QUERYKEYS } from "@/entities/post/constants/post.queryKeys";

export function RefetchButton() {
  const [rotate, setRotate] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

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
          queryClient.invalidateQueries({
            queryKey: [
              POST_QUERYKEYS.PostList,
              { page: normalizeSearchParam(searchParams.get("page")) }
            ]
          });

          setRotate(true);

          router.refresh();
        }}
      >
        <RefreshCcw className="size-8" />
      </Button>
    </div>
  );
}
