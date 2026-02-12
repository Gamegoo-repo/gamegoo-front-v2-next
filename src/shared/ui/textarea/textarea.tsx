import * as React from "react";

import { cn } from "@/shared/libs/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        `placeholder:text-muted-foreground aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex
field-sizing-content w-full resize-none rounded-lg bg-transparent p-2 text-base
transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      data-slot="textarea"
      {...props}
    />
  );
}

export { Textarea };
