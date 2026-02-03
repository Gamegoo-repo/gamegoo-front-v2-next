"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/shared/libs/cn";
import { Button } from "@/shared/ui/button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const setParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-[36px]">
      {currentPage > 1 ? (
        <Link href={setParams(currentPage - 1)}>
          <ChevronLeft />
        </Link>
      ) : (
        <ChevronLeft />
      )}

      <ol className="flex gap-[17px]">
        {Array.from({ length: totalPages }).map((_, i) => {
          return (
            <li key={i}>
              <Button
                className="size-[40px] rounded-full"
                asChild
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <Link
                  href={setParams(i + 1)}
                  className={cn(
                    "text-[14px] hover:bg-gray-200",
                    currentPage === i + 1 &&
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

      {currentPage !== totalPages ? (
        <Link href={setParams(currentPage + 1)}>
          <ChevronRight />
        </Link>
      ) : (
        <ChevronRight />
      )}
    </div>
  );
}
