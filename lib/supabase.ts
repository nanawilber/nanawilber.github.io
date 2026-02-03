import { createClient } from "@supabase/supabase-js";

// Safe fallbacks for static build
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key";

// console.log(
//   "Supabase URL:",
//   process.env.NEXT_PUBLIC_SUPABASE_URL ? "Defined" : "Undefined",
// );
// console.log(
//   "Supabase Key:",
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Defined" : "Undefined",
// );

// if (!supabaseUrl || !supabaseAnonKey) {
//   // throw new Error("Missing Supabase environment variables");
//   console.error(
//     "Missing Supabase environment variables - continuing for debug",
//   );
// }

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Release {
  id: string;
  title: string;
  artwork_url: string;
  listen_url: string;
  watch_url: string;
  release_date: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface AboutSection {
  id: string;
  title: string | null;
  content: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface SocialLink {
  id: string;
  platform_name: string;
  platform_url: string;
  icon_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface HeroContent {
  id: string;
  heading_line1: string;
  heading_line2: string;
  subheading: string;
  hero_image_url: string;
  updated_at: string;
}

export interface TourDate {
  id: string;
  venue_name: string;
  city: string;
  country: string;
  event_date: string;
  ticket_url: string | null;
  bandsintown_id: string | null;
  is_past: boolean;
  created_at: string;
}

// Helper functions for fetching data
export async function getReleases() {
  const { data, error } = await supabase
    .from("releases")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as Release[];
}

export async function getAboutSections() {
  const { data, error } = await supabase
    .from("about_sections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as AboutSection[];
}

export async function getSocialLinks() {
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data as SocialLink[];
}

export async function getHeroContent() {
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .single();

  if (error) throw error;
  return data as HeroContent;
}

export async function getTourDates() {
  const { data, error } = await supabase
    .from("tour_dates")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data as TourDate[];
}

// Image upload helper
export async function uploadImage(file: File, bucket: string = "artist-media") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
}

// Delete image helper
export async function deleteImage(
  url: string,
  bucket: string = "artist-media",
) {
  const path = url.split(`${bucket}/`)[1];
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
}
