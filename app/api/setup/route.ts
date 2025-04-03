import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { env } from "@/lib/env"

export async function GET() {
  try {
    // Check if we have the required environment variables
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Supabase environment variables",
          instructions:
            "Please set up your Supabase project and add the URL and anon key to your environment variables.",
        },
        { status: 400 },
      )
    }

    // Test database connection
    try {
      // Test a simple query to check connection
      const { error: connectionError } = await supabase.from("waitlist").select("count", { count: "exact", head: true })

      if (connectionError) {
        // If the table doesn't exist, provide instructions
        if (connectionError.code === "42P01") {
          // relation does not exist
          return NextResponse.json(
            {
              success: false,
              message: "Waitlist table does not exist",
              instructions: [
                "Please create a 'waitlist' table in your Supabase project with the following columns:",
                "- id: uuid (primary key)",
                "- email: text (unique)",
                "- created_at: timestamp with time zone",
                "- ip_address: text",
                "- user_agent: text",
                "- country: text",
                "- city: text",
                "- region: text",
                "- referrer: text",
                "- status: text (default: 'pending')",
              ],
            },
            { status: 400 },
          )
        } else {
          throw connectionError
        }
      }

      return NextResponse.json({
        success: true,
        message: "Supabase connection successful",
        note: "Your waitlist system is ready to collect emails",
      })
    } catch (dbError) {
      console.error("Database connection error:", dbError)
      return NextResponse.json(
        {
          success: false,
          message: "Supabase connection failed",
          error: dbError,
          troubleshooting: [
            "Check if your SUPABASE_URL and SUPABASE_ANON_KEY are correct",
            "Make sure your Supabase project is active",
            "Check if you have the correct permissions",
            "Create the waitlist table in your Supabase project",
          ],
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in setup route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
        error,
      },
      { status: 500 },
    )
  }
}

