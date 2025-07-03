"use client"

import CreateListingCard from "@/custom_components/create_listing_cards";
import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";


export default function MarketplaceLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 mt-15 p-4 flex justify-center">
          <CreateListingCard />
        </main>
      </div>
    </div>
  );
}
