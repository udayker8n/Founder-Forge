"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { submitEmail } from "@/app/actions/email-actions"
import type { SubmissionResult } from "@/app/actions/email-actions"
import LayoutContainer from "./layout-container"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section id="request-access" className="relative py-20 scroll-mt-20">
      <LayoutContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200"
        >
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 mb-3">
              LIMITED AVAILABILITY
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">Request Exclusive Access</h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Join our waitlist to be among the first to connect with our elite founder network.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-md mx-auto">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative rounded-md p-1 mx-4"
            >
              {!result?.success ? (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row overflow-hidden rounded-full shadow-sm">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Enter your email"
                      className={`w-full bg-white px-5 py-3 sm:rounded-l-full rounded-t-full sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm transition-all duration-300 border ${
                        focused ? "border-gray-400" : "border-gray-200"
                      }`}
                      required
                      disabled={isSubmitting}
                      aria-label="Email address"
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? "email-error" : undefined}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gray-900 hover:bg-black text-white font-medium px-6 py-3 sm:rounded-r-full rounded-b-full sm:rounded-bl-none
                        flex items-center justify-center space-x-2
                        transition-all duration-300 text-sm
                        disabled:opacity-70 disabled:cursor-not-allowed"
                      aria-label="Submit email"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Access</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 px-4 sm:px-6 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-center mb-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                    </motion.div>
                    <p className="text-gray-800 font-medium text-sm">{result.message}</p>
                  </div>
                  <p className="text-gray-600 text-xs mt-2">We'll be in touch with exclusive access details.</p>
                </motion.div>
              )}

              {/* Error message */}
              {result && !result.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="text-center mt-2 text-red-500 text-xs px-4 py-1 flex items-center justify-center"
                >
                  <AlertCircle size={12} className="mr-1" />
                  {result.message}
                </motion.div>
              )}

              {/* Validation error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="text-center mt-2 text-red-500 text-xs px-4 py-1 flex items-center justify-center"
                >
                  <AlertCircle size={12} className="mr-1" />
                  {error}
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                <span className="font-semibold">Why join the waitlist?</span> We're carefully curating our community to
                ensure the highest quality experience.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutContainer>
    </section>
  )
}
