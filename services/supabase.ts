import { createClient } from '@supabase/supabase-js';

// =================================================================================
// STEP 1: CONFIGURE YOUR SUPABASE CREDENTIALS
// =================================================================================
// IMPORTANT: 
// 1. Create a new project at https://supabase.com/.
// 2. Go to your Supabase Project Settings > API.
// 3. Find your Project URL and anon key.
// 4. Replace the placeholder values below with your actual Supabase URL and anon key.
// =================================================================================

const supabaseUrl: string = 'https://tgwargfvnvqgaklwijbx.supabase.co'; // REPLACE WITH YOUR SUPABASE URL
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnd2FyZ2Z2bnZxZ2FrbHdpamJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5ODkyOTcsImV4cCI6MjA4NTU2NTI5N30.RISwndCXpxaO-kBC_z6d3fu7W7L8OZb8W4MbtSC-7Y'; // REPLACE WITH YOUR SUPABASE ANON KEY

// =================================================================================
// STEP 2: SET UP YOUR DATABASE TABLE
// =================================================================================
// 1. In your Supabase project, go to the Table Editor.
// 2. Click "Create a new table".
// 3. Name it 'villas' and add the following columns:
//    - id: bigint (is identity, is primary key)
//    - created_at: timestamptz (default now())
//    - name: text
//    - description: text
//    - facilities: text[] (array of text)
//    - price: numeric
//    - commission: numeric
//    - google_maps_link: text
//    - photo_link: text
//    - owner_phone: text
//    - is_available: boolean (default true)
//    - marketing_caption: text
// 4. Supabase enables Row Level Security (RLS) by default. For this app to work,
//    you must create a policy to allow access. Go to Authentication > Policies, 
//    select the 'villas' table, and create a new policy.
//    For a simple start, you can "Enable read access for everyone" using the built-in templates.
// =================================================================================

export const isSupabaseConfigured =
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseUrl.startsWith('https') && 
  supabaseAnonKey !== 'your-anon-key';

// The createClient function can be called with placeholder values.
// It will only fail when you try to make a request.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
