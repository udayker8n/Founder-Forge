"use server"

import { z } from "zod"
import { headers } from "next/headers"
import { supabase } from "@/lib/supabase"

// Email validation schema
const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type SubmissionResult = {
  success: boolean
  message: string
}

// Get basic user info from request headers
async function getUserInfo() {
  try {
    const headersList = await headers()
    const userAgent = headersList.get("user-agent") || ""
    const referer = headersList.get("referer") || ""
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1"

    return {
      ipAddress: ip,
      userAgent,
      referrer: referer,
    }
  } catch (error) {
    console.error("Error getting user info:", error)
    return {
      ipAddress: "127.0.0.1",
      userAgent: "Unknown",
      referrer: "Unknown",
    }
  }
}

export async function submitEmail(formData: FormData): Promise<SubmissionResult> {
  try {
    // Extract and validate email
    const email = formData.get("email") as string

    if (!email) {
      return {
        success: false,
        message: "Email is required",
      }
    }

    const validationResult = EmailSchema.safeParse({ email })

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Get user tracking information
    const userInfo = await getUserInfo()

    // Check if email already exists
    const { data: existingEmails, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .limit(1)

    if (checkError) {
      console.error("Error checking for existing email:", checkError)
      throw checkError
    }

    if (existingEmails && existingEmails.length > 0) {
      return {
        success: true,
        message: "You're already on our waitlist!",
      }
    }

    // Store email and tracking data in database
    const { error: insertError } = await supabase.from("waitlist").insert([
      {
        email,
        ip_address: userInfo.ipAddress,
        user_agent: userInfo.userAgent,
        referrer: userInfo.referrer,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      // Handle unique constraint violation
      if (insertError.code === "23505") {
        return {
          success: true,
          message: "You're already on our waitlist!",
        }
      }
      throw insertError
    }

    console.log(`Email ${email} submitted successfully`)

    return {
      success: true,
      message: "Thank you for your interest! We'll be in touch soon.",
    }
  } catch (error) {
    console.error("Error submitting email:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

