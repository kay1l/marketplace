"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";

// Define schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
});

export default function MarketplaceDetailPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const handleSubmit = () => {
    const result = formSchema.safeParse({ email, message });

    if (!result.success) {
      const fieldErrors: { email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as "email" | "message";
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Submitted data:", result.data);
      // You can now send result.data to your backend
    }
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      {/* Close Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 cursor-pointer  p-1  hover:bg-gray-100"
        aria-label="Close"
      >
        <X className="h-10 w-10 text-gray-700" />
      </button>

      {/* Image Section */}
      <div className="lg:col-span-2 bg-black/5 flex items-center justify-center p-2">
        <Image
          src="/images/test.png"
          alt="Listing"
          width={800}
          height={600}
          className="rounded-lg max-h-[80vh] object-contain"
        />
      </div>

      {/* Details Section */}
      <div className="bg-white p-4 border-t lg:border-t-0 lg:border-l space-y-4">
        <h1 className="text-lg font-bold">IPHONE 11 128GB 84%BATT</h1>
        <p className="text-xl font-semibold text-gray-800">PHP13,000</p>
        <p className="text-xs text-gray-500">Listed a week ago in Palo, PH-08</p>

        <div className="border-t pt-2">
          <p className="text-lg font-medium">Category</p>
          <p className="text-sm text-gray-500">House</p>
        </div>

        <div className="border-t pt-2">
          <p className="text-lg font-medium">Description</p>
          <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
            <li>No issue</li>
            <li>Face ID ✅</li>
            <li>Truetone ✅</li>
            <li>Buttons ✅</li>
            <li>Mahamis</li>
            <li>Tempered</li>
          </ul>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Seller information</p>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <p className="text-sm">Kyle Gomez</p>
          </div>

        <div className="border-t pt-2 space-y-2">
          <p className="text-md font-medium">Send a message to seller</p>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className={`border rounded h-15 w-full p-2 text-sm mt-1 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
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
