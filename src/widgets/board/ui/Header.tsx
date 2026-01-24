import { RefetchButton } from "@/features/post/ui/RefetchButton";


export function Header() {
  return (
    <header className="mt-20">
      <div className="flex justify-between">
        <h2 className="bold-32">게시판</h2>
        <RefetchButton />
      </div>

      <div className="flex h-20 items-center gap-4">필터 컴포넌트</div>
    </header>
  );
}
