"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BoardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/board/?page=1");
  }, []);

  return null;
}
