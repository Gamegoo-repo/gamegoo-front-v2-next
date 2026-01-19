import Link from "next/link";

export function CtaSection() {
  return (
    <div className="flex gap-10 text-white">
      <section className="flex h-80 flex-1 bg-neutral-700 text-2xl">
        <Link
          href="/match"
          className="flex h-full w-full items-center justify-center"
        >
          바로 매칭하기
        </Link>
      </section>
      <section className="flex h-80 flex-1 bg-neutral-700 text-2xl">
        <Link
          href="/board"
          className="flex h-full w-full items-center justify-center"
        >
          게시판에서 찾기
        </Link>
      </section>
    </div>
  );
}
