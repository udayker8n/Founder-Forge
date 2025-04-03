import { createClient } from "@supabase/supabase-js"
import { validateEnv } from "./env"

// Validate required environment variables
const env = validateEnv([
  { name: "SUPABASE_URL", required: true },
  { name: "SUPABASE_ANON_KEY", required: true },
])

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and ANON key must be provided!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Create a single supabase client for the entire app
// const supabaseUrl = env.SUPABASE_URL

// const supabaseAnonKey = env.SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("Missing Supabase environment variables")
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: false,
//   },
// })

// Helper function to handle database errors
export async function handleDatabaseOperation<T>(
  operation: () => Promise<T>,
  errorMessage = "Database operation failed",
): Promise<[T | null, Error | null]> {
  try {
    const result = await operation()
    return [result, null]
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    return [null, error instanceof Error ? error : new Error(String(error))]
  }
}

