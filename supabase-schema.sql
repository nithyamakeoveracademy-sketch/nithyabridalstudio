-- Supabase Schema for Makeover / Nithya Studio

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    img TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Portfolio Table
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    src TEXT NOT NULL, -- Image URL
    category TEXT NOT NULL,
    height TEXT DEFAULT 'md:h-[500px]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    event_date TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_type TEXT,
    event_date TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- STORAGE CONFIGURATION (Fix for RLS Errors)
-- ==========================================

-- Insert 'images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

-- Policy to allow authenticated users to upload
CREATE POLICY "Auth Upload" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Policy to allow authenticated users to update
CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

-- Policy to allow authenticated users to delete
CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');
