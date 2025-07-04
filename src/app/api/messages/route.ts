import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supaBaseClient";
import * as z from "zod";

const messageSchema = z.object({
  listing_id: z.string().uuid("Invalid listing ID"),
  buyer_email: z.string().email("Please provide a valid email"),
  seller_email: z.string().email("Please provide a valid email"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = messageSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { listing_id, buyer_email,seller_email, message } = result.data;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        listing_id,
        buyer_email,
        seller_email,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    console.error("Server error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
