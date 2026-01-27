import { Header } from "@/widgets/header";

import InitAuthProvider from "@/app/providers/init-auth";

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <InitAuthProvider>
      <div className="mx-auto my-20 max-w-[1220px]">
        <Header />
        <main>{children}</main>
      </div>
    </InitAuthProvider>
  );
}
