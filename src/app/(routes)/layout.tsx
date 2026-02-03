import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@/shared/styles/globals.css";

import { getChatroomUuid } from "@/entities/chat/model/getChatroomUuid";

import InitAuthProvider from "@/app/providers/init-auth";
import { ReactQueryProvider } from "@/app/providers/react-query";

export const metadata: Metadata = {
  title: "겜구 - 롤 실시간 듀오 매칭 | GAMEGOO",
  icons: {
    icon: "/icons/gamegoo-icon.png"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getChatroomUuid();

  return (
    <ReactQueryProvider>
      <InitAuthProvider>
        <html lang="ko">
          <body>{children}</body>
        </html>

        <Toaster
          className="z-50"
          richColors={true}
        />
      </InitAuthProvider>
    </ReactQueryProvider>
  );
}
