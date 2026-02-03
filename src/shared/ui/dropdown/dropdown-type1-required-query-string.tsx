"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/dropdown";

type DropdownType1Props = {
  values: ReadonlyArray<{ label: string; value: string }>;
  queryString: string;
};

export function DropdownType1RequiredQueryString({ values, queryString }: DropdownType1Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete(queryString);
    } else {
      params.set(queryString, value);
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get(queryString) ?? ""}
      onValueChange={handleSearchParams}
    >
      <SelectTrigger
        className="medium-16 h-[56px]! w-[138px] rounded-[10px] border-gray-300 bg-white py-[16px]
ring-0! [&>svg]:size-[24px] [&>svg]:text-gray-600"
      >
        {values.find((v) => v.value === searchParams.get(queryString))?.label || values[0].label}
      </SelectTrigger>

      <SelectContent
        className="rounded-[10px] border-gray-300 bg-white [&_[data-radix-select-viewport]]:p-0"
        position="popper"
      >
        {values.map(({ label, value }) => {
          return (
            <SelectItem
              key={value}
              className="medium-16 h-[56px] px-[20px] py-[16px] hover:bg-violet-600
hover:text-gray-200 [&_svg]:hidden"
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
