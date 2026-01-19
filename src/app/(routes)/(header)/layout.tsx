import { Header } from "@/widgets/header";

import InitAuthProvider from "@/app/providers/init-auth";
import { ReactQueryProvider } from "@/app/providers/react-query";

export default async function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <InitAuthProvider>
        <div className="mx-auto mt-20 max-w-6xl">
          <Header />
          {children}
        </div>
      </InitAuthProvider>
    </ReactQueryProvider>
  );
}
