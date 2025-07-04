"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { supabase } from "@/lib/supaBaseClient";
import { toast } from "sonner";

const formSchema = z.object({
  buyer_email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

export default function MarketplaceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ buyer_email?: string; message?: string }>({});

  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
        router.push("/"); // redirect if not found
      } else {
        setListing(data);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id, router]);

  const handleSubmit = async () => {
    const result = formSchema.safeParse({ buyer_email: buyerEmail, message });

    if (!result.success) {
      const fieldErrors: { buyer_email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as "buyer_email" | "message";
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: listing.id,
          seller_email: listing.seller_email,
          buyer_email: buyerEmail,
          message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Failed to send message", {
          description: errorData.error || "An error occurred.",
        });
        return;
      }

      toast.success("Message sent", {
        description: "Your message has been delivered to the seller.",
      });

      setBuyerEmail("");
      setMessage("");
    } catch (err) {
      console.error("Send message error:", err);
      toast.error("Unexpected error", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (!listing) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 cursor-pointer p-1 hover:bg-gray-100"
        aria-label="Close"
      >
        <X className="h-10 w-10 text-gray-700" />
      </button>

      <div className="lg:col-span-2 bg-black/5 flex items-center justify-center p-2">
        <Image
          src={listing.image_url || "/images/test.png"}
          alt={listing.title}
          width={800}
          height={600}
          className="rounded-lg max-h-[80vh] object-contain"
        />
      </div>

      <div className="bg-white p-4 border-t lg:border-t-0 lg:border-l space-y-4">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-md font-semibold text-gray-800">$ {listing.price}</p>
        <p className="text-xs text-gray-500">Listed in {listing.location}</p>

        <div className="border-t pt-2">
          <p className="text-md font-medium">Category</p>
          <p className="text-sm text-gray-500">{listing.category}</p>
        </div>

        <div className="border-t pt-2">
          <p className="text-md font-medium">Seller's Description</p>
          <p className="text-sm text-gray-700">{listing.description}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Seller information</p>
        </div>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <p className="text-sm">{listing.seller_email}</p>
        </div>

        <div className="border-t pt-2 space-y-2">
          <p className="text-md font-medium">Send a message to seller</p>

          <div>
            <label htmlFor="buyer_email" className="text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="buyer_email"
              className={`border rounded h-15 w-full p-2 text-sm mt-1 ${
                errors.buyer_email ? "border-red-500" : ""
              }`}
              placeholder="Your email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
            />
            {errors.buyer_email && (
              <p className="text-xs text-red-500 mt-1">{errors.buyer_email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message
            </label>
            <input
              id="message"
              className={`border rounded w-full h-15 p-2 text-sm mt-1 ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Hi, is this available?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-blue-600 text-white p-2 cursor-pointer rounded hover:bg-blue-700 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
