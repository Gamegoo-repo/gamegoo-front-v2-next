import { Header, Nav } from "@/widgets/mypage";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20 flex">
      <Nav />
      <main className="ml-20 flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
