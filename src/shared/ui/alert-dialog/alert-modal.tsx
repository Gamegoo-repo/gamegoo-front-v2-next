"use client";

import { Dispatch, SetStateAction } from "react";

import { cn } from "@/shared/libs/cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";

type AlertModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  action: () => void;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  descriptionSrOnly?: boolean;
  actionLabel: string;
  cancelLabel?: string;
};

export function AlertModal({
  open,
  onOpenChange,
  action,
  title,
  description,
  descriptionSrOnly,
  actionLabel,
  cancelLabel
}: AlertModalProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent
        className="flex flex-col overflow-hidden rounded-2xl border-none bg-white p-0!"
      >
        <AlertDialogHeader className="space-y-2 px-20 py-8 text-center! *:mx-auto">
          <AlertDialogTitle className="text-2xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className={cn("text-gray-500", descriptionSrOnly && "sr-only")}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className="h-20 gap-0 border-t border-gray-300 *:flex-1 *:hover:text-violet-600"
        >
          <AlertDialogAction asChild>
            <AlertModalButton
              onOpenChange={onOpenChange}
              label={actionLabel}
              action={action}
            />
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <AlertModalButton
              onOpenChange={onOpenChange}
              label={cancelLabel ?? "취소"}
            />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type AlertModalButtonProps = {
  label: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
};

function AlertModalButton({ label, onOpenChange, action }: AlertModalButtonProps) {
  return (
    <Button
      className="rounded-none border-none text-xl font-semibold"
      variant="ghost"
      onClick={() => {
        if (action) action();

        onOpenChange(false);
      }}
    >
      {label}
    </Button>
  );
}
