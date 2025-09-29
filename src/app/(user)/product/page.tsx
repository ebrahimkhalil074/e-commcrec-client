import { Suspense } from "react";

import ProductPage from "@/src/components/ProductPage";

export default function ProductPageWrapper() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductPage />
    </Suspense>
  );
}
