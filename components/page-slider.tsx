"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PageSliderProps {
  children: ReactNode[]
}

export default function PageSlider({ children }: PageSliderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      if (e.key === "ArrowRight" && currentPage < children.length - 1) {
        navigateTo(currentPage + 1)
      } else if (e.key === "ArrowLeft" && currentPage > 0) {
        navigateTo(currentPage - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, children.length, isTransitioning])

  const navigateTo = (pageIndex: number) => {
    if (isTransitioning || pageIndex === currentPage) return

    setIsTransitioning(true)
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Touch handling for mobile swipe
  const touchStart = useRef({ x: 0, y: 0 })
  const touchEnd = useRef({ x: 0, y: 0 })

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    touchEnd.current = { ...touchStart.current }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = () => {
    if (isTransitioning) return

    const diffX = touchStart.current.x - touchEnd.current.x
    const diffY = touchStart.current.y - touchEnd.current.y

    // Only handle horizontal swipes (when x movement is greater than y movement)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0 && currentPage < children.length - 1) {
        // Swipe left, go to next page
        navigateTo(currentPage + 1)
      } else if (diffX < 0 && currentPage > 0) {
        // Swipe right, go to previous page
        navigateTo(currentPage - 1)
      }
    }
  }

  // Variants for page transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  // For mobile, we'll use a modified layout with swipe support
  if (isMobile) {
    return (
      <div
        className="w-full h-screen overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full overflow-y-auto"
            onAnimationComplete={() => setIsTransitioning(false)}
          >
            <div className="min-h-screen flex flex-col justify-center py-12 px-4">{children[currentPage]}</div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile navigation dots */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {children.map((_, index: number) => (
            <button
              key={index}
              onClick={() => navigateTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentPage ? "bg-[#D4B98C] w-5" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
          onAnimationComplete={() => setIsTransitioning(false)}
        >
          <div className="w-full h-full overflow-y-auto flex flex-col justify-center py-16 px-6">
            {children[currentPage]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        {children.map((_, index: number) => (
          <button
            key={index}
            onClick={() => navigateTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentPage ? "bg-[#D4B98C] w-6" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => currentPage > 0 && navigateTo(currentPage - 1)}
        className={`absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 
          w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-[#D4B98C]/20
          flex items-center justify-center text-white
          transition-colors hover:bg-black/50 hover:border-[#D4B98C]/40
          ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        disabled={currentPage === 0}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => currentPage < children.length - 1 && navigateTo(currentPage + 1)}
        className={`absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20
          w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-[#D4B98C]/20
          flex items-center justify-center text-white
          transition-colors hover:bg-black/50 hover:border-[#D4B98C]/40
          ${currentPage === children.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        disabled={currentPage === children.length - 1}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

