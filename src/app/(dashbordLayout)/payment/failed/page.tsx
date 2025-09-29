import { Suspense } from "react";

import FailedPage from "@/src/components/FailedPament";

export default function Page() {
  return (
    <Suspense fallback={<div>লোড হচ্ছে…</div>}>
      <FailedPage />
    </Suspense>
  );
}
