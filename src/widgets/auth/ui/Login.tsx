"use client";

import Link from "next/link";

import { GamegooLogo } from "@/shared/ui/logo";

export const Login = () => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="max-w-sm space-y-12">
        <header>
          <GamegooLogo asLink />
          <p>GAMEGOO에 오신 것을 환영합니다.</p>
        </header>

        <main className="space-y-8">
          <p>
            서비스를 이용하려면
            <br />
            라이엇 계정으로 로그인하세요
          </p>

          <button
            onClick={() => {
              window.location.href = "/api/auth/login-riot";
            }}
          >
            라이엇 계정으로 시작하기
          </button>

          <div className="flex justify-end">
            <button>자동 로그인</button>
          </div>
        </main>

        <footer>
          <Link href="/https://signup.kr.riotgames.com">라이엇 계정 만들기</Link>
        </footer>
      </div>
    </div>
  );
};
