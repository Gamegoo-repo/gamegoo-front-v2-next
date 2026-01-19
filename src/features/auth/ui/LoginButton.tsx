"use client";

import Link from "next/link";

import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { ProfileButton } from "@/features/profile";

export function LoginButton() {
  const { authStatus } = useAuthStore();

  if (authStatus === "idle") return null;

  return (
    <>{authStatus === "authenticated" ? <ProfileButton /> : <Link href="/login">로그인</Link>}</>
  );
}
