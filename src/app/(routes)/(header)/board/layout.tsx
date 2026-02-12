import { Board, HeaderContainer } from "@/widgets/board";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderContainer />
      <Board />

      {children}
    </>
  );
}
