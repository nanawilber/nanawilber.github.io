-- Create releases table
CREATE TABLE IF NOT EXISTS public.releases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artwork_url TEXT NOT NULL,
    listen_url TEXT NOT NULL,
    watch_url TEXT NOT NULL,
    release_date DATE,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create about_sections table
CREATE TABLE IF NOT EXISTS public.about_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform_name TEXT NOT NULL,
    platform_url TEXT NOT NULL,
    icon_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS public.hero_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    heading_line1 TEXT NOT NULL,
    heading_line2 TEXT NOT NULL,
    subheading TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tour_dates table
CREATE TABLE IF NOT EXISTS public.tour_dates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    venue_name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    ticket_url TEXT,
    bandsintown_id TEXT,
    is_past BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_dates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON public.releases
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.about_sections
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.social_links
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.hero_content
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.tour_dates
    FOR SELECT USING (true);

-- Note: For admin write access, you'll need to either:
-- 1. Use the service role key in your admin API routes (recommended)
-- 2. Or set up Supabase Auth and create policies based on user roles

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS releases_display_order_idx ON public.releases(display_order);
CREATE INDEX IF NOT EXISTS about_sections_display_order_idx ON public.about_sections(display_order);
CREATE INDEX IF NOT EXISTS social_links_display_order_idx ON public.social_links(display_order);
CREATE INDEX IF NOT EXISTS tour_dates_event_date_idx ON public.tour_dates(event_date);

-- Insert default hero content
INSERT INTO public.hero_content (heading_line1, heading_line2, subheading, hero_image_url)
VALUES (
    'Meet Brapurple,',
    'The Dynamic Voice from Takoradi',
    'Blending soulful melodies and eclectic raps, Brapurple is redefining Ghanaian music. With a passion for creativity and a mission to put Takoradi on the global music map, he invites you to explore his world of sound and storytelling.',
    '/images/Brapurple.jpg'
);
