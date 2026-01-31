"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("page")) router.replace("/board/?page=1");
  }, [searchParams, router]);

  return null;
}
