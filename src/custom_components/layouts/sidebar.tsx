"use client";

import { Button } from "@/components/ui/button";
import { 
  Search, 
  LayoutGrid, 
  List, 
  PlusSquare, 
  Tv, 
  Car, 
  Home, 
  Shirt, 
  Gamepad2, 
  PawPrint, 
  Sofa, 
  Dumbbell 
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 bg-white border-r space-y-3 fixed top-14 left-0 h-screen overflow-y-auto">
      {/* Marketplace heading */}
      <h2 className="text-2xl font-bold text-[#1877F2] mb-2">Marketplace</h2>

      {/* Search bar */}
      <div className="flex items-center border rounded-md px-2 py-1">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search Marketplace"
          className="ml-2 text-sm w-full outline-none"
        />
      </div>

      {/* Links / Categories */}
      <div className="space-y-1 mt-3">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LayoutGrid className="w-4 h-4" />
          Browse All
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <List className="w-4 h-4" />
          Your Listings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <PlusSquare className="w-4 h-4" />
          Create New Listing
        </Button>

        <p className="text-sm text-gray-500 font-semibold mt-2">Categories</p>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <Tv className="w-4 h-4" />
          Electronics
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Car className="w-4 h-4" />
          Vehicles
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Home className="w-4 h-4" />
          Home & Garden
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Shirt className="w-4 h-4" />
          Clothing
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Gamepad2 className="w-4 h-4" />
          Toys & Games
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <PawPrint className="w-4 h-4" />
          Pets
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Sofa className="w-4 h-4" />
          Furniture
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Dumbbell className="w-4 h-4" />
          Sports
        </Button>
      </div>
    </aside>
  );
}
