import { Suspense } from "react";

import { RiotCallbackPage } from "@/widgets/auth";

export default function page() {
  return (
    <Suspense fallback={null}>
      <RiotCallbackPage />
    </Suspense>
  );
}
