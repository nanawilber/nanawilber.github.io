import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Initialize Supabase Admin Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server Configuration Error: Missing Service Role Key" },
        { status: 500 },
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabaseAdmin.storage
      .from("artist-media")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("artist-media").getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
