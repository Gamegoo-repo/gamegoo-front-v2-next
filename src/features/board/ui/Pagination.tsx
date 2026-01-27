"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

import { useFetchPostListQuery } from "@/features/post/model/hooks/queries/useFetchPostListQuery";

export function Pagination() {
  const searchParams = useSearchParams();
  const { data } = useFetchPostListQuery({ page: searchParams.get("page") });
  const currentPage = searchParams.get("page");

  if (!data) return null;

  return (
    <div className="flex items-center gap-[36px]">
      <ChevronLeft />

      <ol className="flex gap-[17px]">
        {Array.from({ length: data?.totalPages }).map((_, i) => {
          return (
            <li key={i}>
              <Button
                className="size-[40px] rounded-full"
                asChild
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <Link
                  href={{ query: { page: i + 1 } }}
                  className={cn(
                    "text-[14px] hover:bg-gray-200",
                    currentPage === (i + 1).toString() &&
                      "bg-violet-600 font-[700] text-white hover:bg-violet-400"
                  )}
                >
                  {i + 1}
                </Link>
              </Button>
            </li>
          );
        })}
      </ol>

      <ChevronRight />
    </div>
  );
}
