import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";
import MarketplaceCard from "@/custom_components/marketplace_card";

export default function MarketplaceLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="p-4 w-full grid grid-cols-2 mt-15 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <MarketplaceCard key={i} />
          ))}
        </main>
      </div>
    </div>
  );
}
