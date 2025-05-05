"use client"

import { motion } from "framer-motion"

export default function CharcoalAccent() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Top-right accent */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-70 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-left accent */}
      <motion.div
        className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 opacity-70 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Charcoal accent line - top */}
      <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30" />

      {/* Charcoal accent line - bottom */}
      <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30" />
    </div>
  )
}
