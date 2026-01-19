import { Board, Header } from "@/widgets/board";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Board />

      {children}
    </>
  );
}
