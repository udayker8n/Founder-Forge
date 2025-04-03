"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { submitEmail } from "@/app/actions/email-actions"
import type { SubmissionResult } from "@/app/actions/email-actions"

export default function EmailCapture() {
  const [email, setEmail] = useState("")
  const [focused, setFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("email", email)

      const response = await submitEmail(formData)
      setResult(response)

      if (response.success) {
        setEmail("")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setError("An unexpected error occurred. Please try again later.")
      setResult(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clear result message after 5 seconds if it's an error
  useEffect(() => {
    if (result && !result.success) {
      const timer = setTimeout(() => {
        setResult(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [result])

  // Clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          Request Exclusive Access
        </h2>
        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4B98C] to-[#A67C52] mx-auto mb-4 sm:mb-6"></div>
        <p className="text-sm sm:text-base text-[#A9A9A9] max-w-md mx-auto px-4">
          Join our waitlist to be among the first to connect with our elite founder network.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`
          relative backdrop-blur-md rounded-xl p-1 mx-4
          ${focused ? "bg-gradient-to-r from-[#D4B98C]/30 to-[#A67C52]/30" : "bg-white/5"}
          transition-colors duration-300 border border-[#D4B98C]/10
          shadow-lg
        `}
      >
        {!result?.success ? (
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter your email"
              className="w-full bg-black/40 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg focus:outline-none text-sm sm:text-base"
              required
              disabled={isSubmitting}
              aria-label="Email address"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "email-error" : undefined}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-1/2 transform -translate-y-1/2
                bg-gradient-to-r from-[#D4B98C] to-[#A67C52]
                text-black font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                flex items-center space-x-1 sm:space-x-2
                transition-colors duration-300 text-xs sm:text-sm 
                hover:from-[#E8E3D9] hover:to-[#D4B98C]
                disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Submit email"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Request Access</span>
                  <ArrowRight size={14} className="hidden sm:inline" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-4 px-4 sm:px-6">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="text-[#D4B98C] mr-2" size={20} />
              <p className="text-[#D4B98C] font-medium text-sm sm:text-base">{result.message}</p>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">We'll be in touch with exclusive access details.</p>
          </div>
        )}

        {/* Error message */}
        {result && !result.success && (
          <div
            id="email-error"
            className="text-center mt-2 text-red-400 text-xs sm:text-sm px-4 py-1 flex items-center justify-center"
          >
            <AlertCircle size={12} className="mr-1" />
            {result.message}
          </div>
        )}

        {/* Validation error message */}
        {error && (
          <div
            id="email-error"
            className="text-center mt-2 text-red-400 text-xs sm:text-sm px-4 py-1 flex items-center justify-center"
          >
            <AlertCircle size={12} className="mr-1" />
            {error}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 sm:mt-10 text-center px-4"
      >
        <div className="inline-block backdrop-blur-sm bg-gradient-to-r from-[#D4B98C]/10 to-[#A67C52]/10 rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-[#D4B98C]/20">
          <p className="text-xs sm:text-sm text-[#E8E3D9]">
            <span className="font-semibold">Why join the waitlist?</span> We're carefully curating our community to
            ensure the highest quality experience.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

