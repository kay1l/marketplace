"use client";

import CreateListingCard from "@/custom_components/create_listing_cards";
import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";
import { Suspense } from "react";

export default function MarketplaceLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-4 w-full sm:ml-64">
          <Suspense fallback={<div>Loading...</div>}>
            <CreateListingCard />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
