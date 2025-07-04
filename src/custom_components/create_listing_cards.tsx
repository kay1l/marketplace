"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Layers3, Car, Home } from "lucide-react";
import Link from "next/link";

export default function CreateListingCard() {
  const cards = [
    {
      title: "Item for Sale",
      description: "List an item you want to sell.",
      icon: <ShoppingBag className="w-10 h-10 text-[#1877F2]" />,
      href: "/create/item-for-sale",
    },
    {
      title: "Create Multiple Listings",
      description: "Post several items at once.",
      icon: <Layers3 className="w-10 h-10 text-[#1877F2]" />,
      href: "/pages/create/item-for-sale",
    },
    {
      title: "Vehicle for Sale",
      description: "Sell your car, bike, or other vehicle.",
      icon: <Car className="w-10 h-10 text-[#1877F2]" />,
      href: "/pages/create/item-for-sale",
    },
    {
      title: "Home for Sale or Rent",
      description: "List a property for sale or rent.",
      icon: <Home className="w-10 h-10 text-[#1877F2]" />,
      href: "/pages/create/item-for-sale",
    },
  ];

  return (
    <div className="flex items-center justify-center  p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Link key={i} href={card.href}>
            <Card className="w-60 h-40 shadow-md mt-20 transition-colors hover:bg-gray-100 cursor-pointer">
              <CardHeader className="flex flex-col items-center">
                {card.icon}
                <CardTitle className="text-center font-bold mt-1">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
