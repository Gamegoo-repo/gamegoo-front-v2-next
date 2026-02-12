import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@/shared/styles/globals.css";

import { LoginRequiredModal } from "@/features/auth";

import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";

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
  return (
    <ReactQueryProvider>
      <html lang="ko">
        <body>{children}</body>
      </html>

      <Toaster
        className="z-50"
        richColors={true}
      />
      <LoginRequiredModal />
    </ReactQueryProvider>
  );
}
