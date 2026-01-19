"use client";

import { usePathname } from "next/navigation";

import { navItems } from "@/widgets/mypage/ui/Nav";

export function Header() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map(({ label, href }) => {
        return (
          <div key={label}>
            {pathname.includes(href) && <h2 className="text-3xl font-bold">{label}</h2>}
          </div>
        );
      })}

      <hr className="my-4 border-gray-300" />
    </>
  );
}
