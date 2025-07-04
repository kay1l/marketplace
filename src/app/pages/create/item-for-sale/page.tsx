"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supaBaseClient";
import { toast } from "sonner";

export default function MarketplaceCreatePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const listingSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().nonempty("Category is required"),
    price: z.number().min(1, "Price must be at least 1"),
    location: z.string().nonempty("Location is required"),
    seller_email: z.string().email("Enter a valid email"),
    description: z.string().min(5, "Description must be at least 5 characters"),
  });

  const handleSubmit = async () => {
    const localData = {
      title,
      category,
      price: Number(price),
      location,
      seller_email: email,
      description,
    };
  
    const result = listingSchema.safeParse(localData);
  
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
  
    setErrors({});
  
    let imageUrl: string | undefined = undefined;
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(fileName, imageFile, {
          contentType: imageFile.type,
        });
  
      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        toast.error("Image upload failed");
        return;
      }
  
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${fileName}`;
    }
  
    const response = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...localData,
        image_url: imageUrl,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create listing:", errorData);
      toast.error(`Failed to create listing: ${errorData.error}`);
      return;
    }
  
    toast.success("Listing created successfully!");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      {/* Sidebar form */}
      <aside className="p-4 bg-white border-r space-y-3 overflow-y-auto">
        <div className="relative">
          <X
            onClick={() => router.push("/")}
            className="h-10 w-10 mb-2 cursor-pointer"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#1877F2] transition-colors min-h-[150px] text-center"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="max-h-32 rounded mb-2"
              />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Add photos</p>
                <p className="text-xs text-gray-400">
                  JPEG, PNG, or WebP (max 5MB)
                </p>
              </>
            )}
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
              className="absolute top-15 right-3 bg-red-500 text-white cursor-pointer rounded-full p-1 shadow hover:bg-red-600"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            className={`h-15 ${errors.title ? "border-red-500" : ""}`}
            placeholder="What are you selling?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className={`w-full h-15 border rounded px-2 py-1 text-sm ${
              errors.category ? "border-red-500" : ""
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="vehicles">Vehicles</option>
            <option value="property rentals">Property Rentals</option>
            <option value="apparel">Apparel</option>
            <option value="classifieds">Classifieds</option>
            <option value="electronics">Electronics</option>
            <option value="entertainment">Entertainment</option>
            <option value="family">Family</option>
            <option value="free stuff">Free Stuff</option>
            <option value="garden & outdoor">Garden & Outdoor</option>
            <option value="hobbies">Hobbies</option>
            <option value="home goods">Home Goods</option>
            <option value="home improvement">Home Improvement</option>
            <option value="home sales">Home Sales</option>
            <option value="musical instruments">Musical Instruments</option>
            <option value="school supplies">School Supplies</option>
            <option value="pet supplies">Pet Supplies</option>
            <option value="sporting goods">Sporting Goods</option>
            <option value="toys & games">Toys & Games</option>
            <option value="buy and sell groups">Buy and Sell Groups</option>
          </select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <Input
            className={`h-15 ${errors.price ? "border-red-500" : ""}`}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            className={`h-15 ${errors.location ? "border-red-500" : ""}`}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && (
            <p className="text-xs text-red-500">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Email
          </label>
          <Input
            className={`h-15 ${errors.seller_email ? "border-red-500" : ""}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className={`w-full h-15 border rounded px-2 py-1 text-sm ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Describe your item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <Button
          className="w-full mt-2 bg-[#1877F2] cursor-pointer hover:bg-[#166fe5] text-white"
          onClick={handleSubmit}
        >
          Publish Listing
        </Button>
      </aside>

      {/* Center image preview */}
      <div className="flex items-center justify-center bg-gray-100 border-r p-4">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-150 rounded shadow"
          />
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-2xl font-bold">Your listing preview</p>
            <p className="text-md">
              As you create your listing, you can preview how it will appear to
              others on Marketplace.
            </p>
          </div>
        )}
      </div>

      {/* Right: text preview */}
      <div className="bg-gray-50 p-4">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="border rounded p-3 bg-white">
          <p className="text-lg font-bold">{title || "Title"}</p>
          <p className="text-sm text-gray-600">
            {price ? `$${price}` : "Price"}
            {location && ` • Listed in ${location}`}
          </p>
          <div className="mt-2">
            <p className="font-medium">Details</p>
            <p className="text-sm text-gray-500">
              {description || "Description will appear here."}
            </p>
          </div>
          <hr className="my-2" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Seller information</p>
            <p className="text-xs text-blue-600 cursor-pointer">
              Seller details
            </p>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <p className="text-sm">Kyle Gomez</p>
          </div>
          <Button variant="secondary" disabled className="w-full mt-4">
            Message
          </Button>
        </div>
      </div>
    </div>
  );
}
