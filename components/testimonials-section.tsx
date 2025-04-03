"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "FounderForge connected me with a founder who had faced the exact scaling challenges I was struggling with. Their insights helped me avoid months of costly mistakes.",
    name: "Sarah Chen",
    title: "CEO, TechVision",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The quality of conversations I've had through this platform is unmatched. These aren't generic mentors – they're successful founders who've been in your shoes.",
    name: "Michael Rodriguez",
    title: "Founder, Quantum AI",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "What sets FounderForge apart is the caliber of founders in the network. Every conversation delivers actionable insights that have directly impacted my business growth.",
    name: "Aisha Patel",
    title: "Founder, EcoSolutions",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          Founder Success Stories
        </h2>
        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4B98C] to-[#A67C52] mx-auto mb-4 sm:mb-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="backdrop-blur-sm bg-black/30 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10 h-full"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 sm:mb-6 flex-grow">
                <p className="text-xs sm:text-sm text-[#E8E3D9] italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover border border-[#D4B98C]/30"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-[#E8E3D9]">{testimonial.name}</h4>
                  <p className="text-xs text-[#A9A9A9]">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

