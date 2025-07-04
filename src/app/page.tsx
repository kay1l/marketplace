"use client";

import { Suspense } from "react";
import MarketplaceLayout from "@/custom_components/layout";

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading Marketplace...</div>}>
      <MarketplaceLayout />
    </Suspense>
  );
}