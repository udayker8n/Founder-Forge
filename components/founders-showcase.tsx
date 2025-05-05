"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LayoutContainer from "./layout-container"

// Sample founder data - you can replace this with your actual data
const founders = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "TechVision",
    title: "Founder & CEO",
    expertise: "AI & Machine Learning",
    bio: "Built TechVision from zero to $50M ARR in 3 years. Previously led AI research at Google.",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "Quantum AI",
    title: "Co-founder & CTO",
    expertise: "Quantum Computing",
    bio: "Serial entrepreneur with 3 successful exits. Pioneer in quantum computing applications for finance.",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Aisha Patel",
    company: "EcoSolutions",
    title: "Founder & CEO",
    expertise: "Sustainability & CleanTech",
    bio: "Transformed waste management with IoT. Raised $75M in venture funding across two startups.",
    avatar: "/placeholder.svg?height=200&width=200",
  }
]

export default function FoundersShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(founders.length / itemsPerPage)

  // Adjust items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3
  }

  const nextSlide = () => {
    if (activeIndex < totalPages - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0) // Loop back to the first page
    }
  }

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(totalPages - 1) // Loop to the last page
    }
  }

  const currentFounders = founders.slice(activeIndex * getItemsPerPage(), (activeIndex + 1) * getItemsPerPage())

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
    <section id="founders" className="relative py-20 scroll-mt-20">
      <LayoutContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 mb-3">
              NETWORK MEMBERS
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">Meet Our Elite Founders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm">
              Connect with proven entrepreneurs who have built and scaled successful companies worth $10M+.
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {currentFounders.map((founder, index) => (
                  <motion.div
                    key={founder.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-100 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="relative w-24 h-24 mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <Image
                          src={founder.avatar || "/placeholder.svg"}
                          alt={founder.name}
                          fill
                          className="rounded-full object-cover border-2 border-gray-100"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gray-500/10"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0, 0.3, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: Math.random() * 2 + 1,
                          }}
                        />
                      </motion.div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{founder.name}</h3>
                      <p className="text-gray-700 text-sm mb-1">{founder.company}</p>
                      <p className="text-gray-500 text-xs mb-3">{founder.title}</p>
                      <motion.div
                        className="bg-gray-50 px-3 py-1 rounded-full mb-4 border border-gray-100"
                        whileHover={{ backgroundColor: "#f9fafb", scale: 1.05 }}
                      >
                        <p className="text-gray-700 text-xs font-medium">{founder.expertise}</p>
                      </motion.div>
                      <p className="text-center text-gray-600 text-xs">{founder.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex justify-center items-center space-x-4">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 shadow-md"
                aria-label="Previous founders"
              >
                <ChevronLeft size={18} />
              </motion.button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex ? "bg-gray-900 w-6" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : "false"}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 shadow-md"
                aria-label="Next founders"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </LayoutContainer>
    </section>
  )
}
