"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/select";

type DropdownType1Props = {
  values: ReadonlyArray<{ label: string; value: string }>;
  queryString: "mode" | "tier" | "voice";
};

export function DropdownType1({ values, queryString }: DropdownType1Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete(queryString);
    } else {
      params.set(queryString, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get(queryString) ?? ""}
      onValueChange={handleSearchParams}
    >
      <SelectTrigger className="w-32 ring-0!">
        {values.find((v) => v.value === searchParams.get(queryString))?.label || values[0].label}
      </SelectTrigger>
      <SelectContent
        className="bg-white"
        position="popper"
      >
        {values.map(({ label, value }) => {
          return (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
