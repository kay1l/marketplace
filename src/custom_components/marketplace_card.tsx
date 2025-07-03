"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
export default function MarketplaceCard() {
  const router = useRouter();

  return (
    <div className="border cursor-pointer hover:bg-gray-100 rounded-lg overflow-hidden shadow-sm">
      <Image
        src="/images/test.png"
        alt="Item"
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        onClick={() => router.push("/pages/item")}
      />
      <div className="p-2">
      <p className="text-lg font-bold text-black-600">$100</p> 
        <p className="font-sm">Sample Item</p>
        <p className="text-xs">Listed 1 hour ago</p>
        <p className="text-xs">Ormoc City</p>
      </div>
    </div>
  );
}
