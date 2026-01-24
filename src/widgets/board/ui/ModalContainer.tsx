"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ModalContainer({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
      onClick={() => router.back()}
    >
      <div
        className="relative flex items-center justify-center bg-violet-200"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute top-4 right-4"
          onClick={() => router.back()}
        />
        {children}
      </div>
    </div>
  );
}
