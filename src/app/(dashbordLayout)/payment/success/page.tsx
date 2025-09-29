import { Suspense } from "react";

import SuccessPage from "@/src/components/SucessPament";

export default function Page() {
  return (
    <Suspense fallback={<div>লোড হচ্ছে…</div>}>
      <SuccessPage />
    </Suspense>
  );
}
