"use client";

import { MarketplaceCardProps } from "@/types/listing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRelativeTime } from "@/lib/time";
export default function MarketplaceCard({
  id,
  title,
  price,
  image_url,
  location = "Unknown",
  created_at,
}: MarketplaceCardProps) {
  const router = useRouter();

  return (
    <div
      className="border cursor-pointer hover:bg-gray-100 rounded-lg overflow-hidden shadow-sm"
      onClick={() => router.push("/pages/item")}
    >
      <Image
        src={image_url || "/images/test.png"} 
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <p className="text-lg font-bold text-black-600">$ {price}</p>
        <p className="font-sm">{title}</p>
        <p className="text-xs">{getRelativeTime(created_at)}</p>
        <p className="text-xs">{location}</p>
      </div>
    </div>
  );
}
