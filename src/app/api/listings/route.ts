import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supaBaseClient"; 
import * as z from "zod";

const listingSchema = z.object({
   title: z.string().min(3, "Title must be at least 3 characters"),
      category: z.string().nonempty("Category is required"),
      price: z.number().min(1, "Price must be at least 1"),
      location: z.string().nonempty("Location is required"),
      seller_email: z.string().email("Enter a valid email"),
      description: z.string().min(5, "Description must be at least 5 characters"),
      image_url: z.string().url("Invalid image URL").optional().nullable(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  let query = supabase.from("listings").select("*");

  if (category) {
    query = query.eq("category", category);
  }
  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parsed = listingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("listings").insert(parsed.data).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
