import Header from "@/custom_components/layouts/header";
import Sidebar from "@/custom_components/layouts/sidebar";
import MarketplaceCard from "@/custom_components/marketplace_card";

export default function MarketplaceLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 mt-15 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <MarketplaceCard key={i} />
          ))}
        </main>
      </div>
    </div>
  );
}
