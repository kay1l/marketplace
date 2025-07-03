"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar with hamburger */}
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
          className={`absolute top-0 left-0 h-full w-64 bg-white border-r p-4 space-y-3 transform transition-transform duration-300 ${
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
          {sidebarContent(router)}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden sm:block fixed top-14 left-0 h-screen w-64 bg-white border-r p-4 overflow-y-auto space-y-3">
        {sidebarContent(router)}
      </aside>
    </>
  );
}

function sidebarContent(router: ReturnType<typeof useRouter>) {
  return (
    <>
      {/* Search bar */}
      <div className="flex items-center border rounded-md px-2 py-1">
        <Search className="w-4 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search Marketplace"
          className="ml-2 text-sm w-full outline-none"
        />
      </div>

      {/* Links */}
      <div className="space-y-1 mt-3">
        <SidebarButton icon={LayoutGrid} label="Browse All" onClick={() => router.push("/")} />
        <SidebarButton icon={List} label="Your Listings" onClick={() => router.push("/pages/your-listings")} />
        <SidebarButton icon={PlusSquare} label="Create New Listing" onClick={() => router.push("/pages/create")} />

        <p className="text-sm text-gray-500 font-semibold mt-2">Categories</p>

        <div className="space-y-1 mt-3">
          <SidebarButton icon={Car} label="Vehicles" />
          <SidebarButton icon={Building2} label="Property Rentals" />
          <SidebarButton icon={Shirt} label="Apparel" />
          <SidebarButton icon={Tag} label="Classifieds" />
          <SidebarButton icon={Tv} label="Electronics" />
          <SidebarButton icon={Clapperboard} label="Entertainment" />
          <SidebarButton icon={Users} label="Family" />
          <SidebarButton icon={Gift} label="Free Stuff" />
          <SidebarButton icon={Leaf} label="Garden & Outdoor" />
          <SidebarButton icon={Palette} label="Hobbies" />
          <SidebarButton icon={Home} label="Home Goods" />
          <SidebarButton icon={Hammer} label="Home Improvement" />
          <SidebarButton icon={House} label="Home Sales" />
          <SidebarButton icon={Music} label="Musical Instruments" />
          <SidebarButton icon={BookOpen} label="School Supplies" />
          <SidebarButton icon={PawPrint} label="Pet Supplies" />
          <SidebarButton icon={Dumbbell} label="Sporting Goods" />
          <SidebarButton icon={Gamepad2} label="Toys & Games" />
          <SidebarButton icon={ShoppingCart} label="Buy and Sell Groups" />
        </div>
      </div>
    </>
  );
}

function SidebarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}
