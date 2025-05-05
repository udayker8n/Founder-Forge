"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Smoke particles
    const particles: {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      opacity: number
      life: number
      maxLife: number
    }[] = []

    // Create initial particles
    const createParticles = () => {
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        addParticle()
      }
    }

    // Add a single particle
    const addParticle = () => {
      const size = Math.random() * 100 + 50
      const maxLife = Math.random() * 200 + 100
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.05,
        life: 0,
        maxLife: maxLife,
      })
    }

    createParticles()

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent white
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Update life
        p.life++
        if (p.life >= p.maxLife) {
          // Reset particle
          p.life = 0
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.size = Math.random() * 100 + 50
          p.opacity = Math.random() * 0.2 + 0.05
        }

        // Calculate current opacity based on life
        const lifeRatio = p.life / p.maxLife
        const currentOpacity = p.opacity * (1 - lifeRatio)

        // Draw smoke particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `rgba(30, 30, 30, ${currentOpacity})`)
        gradient.addColorStop(1, "rgba(30, 30, 30, 0)")

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Add new particles occasionally
    const particleInterval = setInterval(() => {
      if (particles.length < 70) {
        addParticle()
      }
    }, 1000)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(particleInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base white background */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Smoke canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" aria-hidden="true" />

      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30"></div>

      {/* Accent elements */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 opacity-40 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
