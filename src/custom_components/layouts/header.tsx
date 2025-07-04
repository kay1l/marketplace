"use client";

import { Search, Home, Store, Bell, User } from "lucide-react";
import { Facebook } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#1877F2] fixed text-white flex items-center justify-between px-4 py-2 shadow-md">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-2">
        <Facebook className=" w-8 h-8" />
        <span className="font-bold text-lg hidden sm:inline">Marketplace</span>
      </div>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-4">
        <Home className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        <Store className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        <Bell className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        <User className="w-6 h-6 cursor-pointer hover:text-gray-200" />
      </div>
    </header>
  );
}
