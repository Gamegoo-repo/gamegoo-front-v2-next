import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/shared/libs/cn";
import { toastMessage } from "@/shared/model";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";

import { ProfileIcon } from "@/entities/profile";

type DialogModalProps = {
  description: string;
  imgNum: number;
  name: string;
  tag: string;
  items: {
    id: string;
    content: React.ReactNode;
  }[];
  activeCopy?: boolean;
  routeBack?: boolean;
};

export function DialogModal({
  description,
  imgNum,
  name,
  tag,
  items,
  activeCopy,
  routeBack = false
}: DialogModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen && routeBack) router.back();
  }, [isOpen, router, routeBack]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent
        className="max-h-[95dvh] overflow-auto rounded-2xl bg-gray-200"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="flex justify-between px-2">
            <header className="flex items-center gap-2">
              <ProfileIcon
                size={64}
                padding={8}
                imgNum={imgNum}
              />
              <h2>
                <Button
                  className={cn("flex flex-col items-start gap-0", !activeCopy && "cursor-default")}
                  variant="ghost"
                  onClick={() => {
                    if (!activeCopy) return;

                    navigator.clipboard.writeText(`${name}#${tag}`);
                    toastMessage.success("소환사명이 복사되었습니다.");
                  }}
                  tabIndex={activeCopy ? 0 : -1}
                >
                  <span className="text-xl font-bold">{name}</span>
                  <span className="text-gray-500">#{tag}</span>
                </Button>
              </h2>
            </header>

            <DialogClose asChild>
              <Button
                className="hover:bg-gray-300"
                variant="ghost"
                size="icon"
              >
                <X />
              </Button>
            </DialogClose>
          </div>

          <DialogTitle className="sr-only">{description}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>

        <ul className="space-y-6 px-2">
          {items.map(({ id, content }) => {
            return <li key={id}>{content}</li>;
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
