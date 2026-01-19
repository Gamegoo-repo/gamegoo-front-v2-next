import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex gap-[40px]">
      <Link href="/match">바로 매칭</Link>
      <Link href="/board">게시판</Link>
    </nav>
  );
}
