"use client";

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
  PlusSquare
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
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
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <LayoutGrid className="w-4 h-4" />
          Browse All
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <List className="w-4 h-4" />
          Your Listings
        </Button>

        <Button variant="ghost"  className="w-full justify-start gap-2 cursor-pointer" 
        onClick={() => router.push("/pages/create")}>
          <PlusSquare className="w-4 h-4" />
          Create New Listing
        </Button>

        <p className="text-sm text-gray-500 font-semibold mt-2">Categories</p>

        <div className="space-y-1 mt-3">
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Car className="w-4 h-4" />
          Vehicles
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Building2 className="w-4 h-4" />
          Property Rentals
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Shirt className="w-4 h-4" />
          Apparel
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Tag className="w-4 h-4" />
          Classifieds
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Tv className="w-4 h-4" />
          Electronics
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Clapperboard className="w-4 h-4" />
          Entertainment
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Users className="w-4 h-4" />
          Family
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Gift className="w-4 h-4" />
          Free Stuff
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Leaf className="w-4 h-4" />
          Garden & Outdoor
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Palette className="w-4 h-4" />
          Hobbies
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Home className="w-4 h-4" />
          Home Goods
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Hammer className="w-4 h-4" />
          Home Improvement
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <House className="w-4 h-4" />
          Home Sales
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Music className="w-4 h-4" />
          Musical Instruments
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <BookOpen className="w-4 h-4" />
          School Supplies
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <PawPrint className="w-4 h-4" />
          Pet Supplies
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Dumbbell className="w-4 h-4" />
          Sporting Goods
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <Gamepad2 className="w-4 h-4" />
          Toys & Games
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 cursor-pointer">
          <ShoppingCart className="w-4 h-4" />
          Buy and Sell Groups
        </Button>
      </div>
      </div>
    </aside>
  );
}
