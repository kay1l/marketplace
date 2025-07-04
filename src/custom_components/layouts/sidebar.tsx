"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Car,
  Building2,
  Shirt,
  Tag,
  Tv,
  Clapperboard,
  Users,
  Gift,
  Leaf,
  Palette,
  Home,
  Hammer,
  House,
  Music,
  BookOpen,
  PawPrint,
  Dumbbell,
  Gamepad2,
  ShoppingCart,
  LayoutGrid,
  List,
  PlusSquare,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const selectedCategory = searchParams.get("category") || "";

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-white border-b fixed top-0 left-0 right-0 z-50">
        <h2 className="text-xl font-bold text-[#1877F2]">Marketplace</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar overlay + drawer (mobile) */}
      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          open ? "bg-black/30 visible" : "invisible"
        } sm:hidden`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 h-full overflow-y-auto w-64 bg-white border-r p-4 space-y-3 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#1877F2]">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          {sidebarContent(router, searchTerm, handleSearchChange, selectedCategory)}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden sm:block fixed top-14 left-0 h-screen w-64 bg-white border-r p-4 overflow-y-auto space-y-3">
        {sidebarContent(router, searchTerm, handleSearchChange, selectedCategory)}
      </aside>
    </>
  );
}

function sidebarContent(
  router: ReturnType<typeof useRouter>,
  searchTerm: string,
  onSearchChange: (value: string) => void,
  selectedCategory: string
) {
  return (
    <>
      {/* Search bar */}
      <div className="flex items-center border rounded-md px-2 py-1 mt-5 sm:mt-0">
        <Search className="w-4 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search Marketplace"
          className="ml-2 text-sm w-full outline-none"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Links */}
      <div className="space-y-1 mt-3">
        <SidebarButton icon={LayoutGrid} label="Browse All" onClick={() => router.push("/")} isActive={!selectedCategory} />
        <SidebarButton icon={List} label="Your Listings" onClick={() => router.push("/pages/your-listings")} />
        <SidebarButton icon={PlusSquare} label="Create New Listing" onClick={() => router.push("/create")} />

        <p className="text-sm text-gray-500 font-semibold mt-2">Categories</p>

        <div className="space-y-1 mt-3">
          {categoryButtons.map(({ label, icon, key }) => (
            <SidebarButton
              key={key}
              icon={icon}
              label={label}
              onClick={() => updateCategory(router, key)}
              isActive={selectedCategory === key}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const categoryButtons = [
  { key: "vehicles", label: "Vehicles", icon: Car },
  { key: "property rentals", label: "Property Rentals", icon: Building2 },
  { key: "apparel", label: "Apparel", icon: Shirt },
  { key: "classifieds", label: "Classifieds", icon: Tag },
  { key: "electronics", label: "Electronics", icon: Tv },
  { key: "entertainment", label: "Entertainment", icon: Clapperboard },
  { key: "family", label: "Family", icon: Users },
  { key: "free stuff", label: "Free Stuff", icon: Gift },
  { key: "garden & outdoor", label: "Garden & Outdoor", icon: Leaf },
  { key: "hobbies", label: "Hobbies", icon: Palette },
  { key: "home goods", label: "Home Goods", icon: Home },
  { key: "home improvement", label: "Home Improvement", icon: Hammer },
  { key: "home sales", label: "Home Sales", icon: House },
  { key: "musical instruments", label: "Musical Instruments", icon: Music },
  { key: "school supplies", label: "School Supplies", icon: BookOpen },
  { key: "pet supplies", label: "Pet Supplies", icon: PawPrint },
  { key: "sporting goods", label: "Sporting Goods", icon: Dumbbell },
  { key: "toys & games", label: "Toys & Games", icon: Gamepad2 },
  { key: "buy and sell groups", label: "Buy and Sell Groups", icon: ShoppingCart },
];

function SidebarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start gap-2 ${isActive ? "font-semibold text-[#1877F2]" : ""}`}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}

function updateCategory(router: ReturnType<typeof useRouter>, category: string) {
  const params = new URLSearchParams(window.location.search);
  params.set("category", category);
  router.push(`/?${params.toString()}`);
}
