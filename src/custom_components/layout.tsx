"use client";

import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";
import MarketplaceCard from "@/custom_components/marketplace_card";
import { MarketplaceCardProps } from "@/types/listing";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supaBaseClient";

export default function MarketplaceLayout() {
  const [listings, setListings] = useState<MarketplaceCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error.message);
      } else {
        setListings(data as MarketplaceCardProps[]);
      }
      setLoading(false);
    };
    fetchListing();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-4 lg:ml-64 w-full">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
              <p className="sr-only">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-15">
              {listings.map((listing) => (
                <MarketplaceCard key={listing.id} {...listing} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
