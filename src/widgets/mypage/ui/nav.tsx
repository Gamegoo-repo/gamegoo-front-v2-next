import Link from "next/link";

export const navItems = [
  { label: "내 정보", href: "/profile" },
  { label: "알림", href: "/notification" },
  { label: "내가 작성한 글", href: "/post" },
  { label: "내 평가", href: "/review" },
  { label: "차단 목록", href: "/blocked" },
  { label: "고객센터", href: "/service" }
];

export function Nav() {
  return (
    <nav className="flex flex-col gap-10">
      {navItems.map(({ label, href }) => {
        return (
          <MypageTabs
            key={label}
            href={href}
            label={label}
          />
        );
      })}
    </nav>
  );
}

export const MypageTabs = ({ label, href }: { label: string; href: string }) => {
  return <Link href={`/mypage/${href}`}>{label}</Link>;
};
