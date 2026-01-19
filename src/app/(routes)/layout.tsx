import type { Metadata } from "next";

import "@/shared/styles/globals.css";

import InitAuthProvider from "@/app/providers/init-auth";

export const metadata: Metadata = {
  title: "겜구 - 롤 실시간 듀오 매칭 | GAMEGOO",
  icons: {
    icon: "/icons/gamegoo-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InitAuthProvider>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </InitAuthProvider>
  );
}
