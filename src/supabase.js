import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxqelydwsyyxugmqgmcv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cWVseWR3c3l5eHVnbXFnbWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNDEwMDAsImV4cCI6MTk5NDkxNzAwMH0.6SaGhVTfBHY0lDbNs5ZOi1DdGl64juaiLk7We_GSaVE";

export const supabase = createClient(supabaseUrl, supabaseKey);
