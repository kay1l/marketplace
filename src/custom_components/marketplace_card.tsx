"use client"

import Image from "next/image";

export default function MarketplaceCard() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Image
        src="/placeholder.jpg"
        alt="Item"
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <p className="font-medium">Sample Item</p>
        <p className="text-sm text-gray-600">$100</p>
      </div>
    </div>
  );
}
