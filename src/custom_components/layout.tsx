"use client";

import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";
import MarketplaceCard from "@/custom_components/marketplace_card";
import { MarketplaceCardProps } from "@/types/listing";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supaBaseClient";
import { useSearchParams } from "next/navigation";

export default function MarketplaceLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-4 lg:ml-64 w-full">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
                <p className="sr-only">Loading...</p>
              </div>
            }
          >
            <MarketplaceContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function MarketplaceContent() {
  const [listings, setListings] = useState<MarketplaceCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();

  const PAGE_SIZE = 12;

  const fetchListings = async (pageNumber: number, reset = false) => {
    if (reset) {
      setListings([]);
      setPage(1);
      setHasMore(true);
    }

    const from = (pageNumber - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase.from("listings").select("*").range(from, to);

    const search = searchParams.get("search");
    const category = searchParams.get("category");

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    if (category) {
      query = query.eq("category", category);
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching listings:", error.message);
      if (reset) setListings([]);
      return;
    }

    if (data) {
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
      if (reset) {
        setListings(data as MarketplaceCardProps[]);
      } else {
        setListings((prev) => [...prev, ...(data as MarketplaceCardProps[])]);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchListings(1, true).finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    if (page === 1) return;
    setLoadingMore(true);
    fetchListings(page).finally(() => setLoadingMore(false));
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loadingMore &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  if (loading && listings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        <p className="sr-only">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-15">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <MarketplaceCard key={listing.id} {...listing} />
          ))
        ) : (
          <p className="col-span-full mt-50 text-center text-gray-500 flex flex-col items-center gap-2">
            <svg
              className="w-12 h-12 text-gray-300 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m2 7H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2 2 2h3a2 2 0 012 2v11a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-lg font-medium animate-pulse">
              No listings found
            </span>
            <span className="text-sm text-gray-400">
              Try adjusting your search or filters
            </span>
          </p>
        )}
      </div>

      {loadingMore && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600 border-solid"></div>
        </div>
      )}

      {!hasMore && listings.length > 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">
          No more listings to load.
        </p>
      )}
    </>
  );
}
