import { toast } from "sonner";

export const toastMessage = {
  error(message: string) {
    toast.error(<span className="bold-16">{message}</span>, {
      position: "top-center",
      className:
        "shadow-[3px_3px_6px_0_rgba(255,82,82,0.4)]! whitespace-nowrap h-[48px]! py-[12px]! !px-[24px] border! border-red-600! bg-red-100! text-red-600!"
    });
  },
  success(message: string) {
    toast.success(<span className="bold-16">{message}</span>, {
      position: "top-center",
      className:
        "shadow-[3px_3px_6px_0_rgba(99,66,238,0.5)]! h-[48px]! py-[12px]! !px-[24px] border! border-violet-600! bg-violet-100! text-violet-600!"
    });
  }
};
