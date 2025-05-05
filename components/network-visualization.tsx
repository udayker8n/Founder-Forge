"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Sample founder data
const founders = [
  { id: 1, name: "Sarah Chen", company: "TechVision", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Michael Rodriguez", company: "Quantum AI", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Aisha Patel", company: "EcoSolutions", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "David Kim", company: "FinanceFlow", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "Elena Volkov", company: "MedInnovate", avatar: "/placeholder.svg?height=80&width=80" },
]

export default function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const resizeCanvas = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    type Node = {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
    }

    const nodes: Node[] = []

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create nodes
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, ${Math.random() * 0.5 + 0.2})`,
      })
    }

    // Animation loop
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

    // Define the animate function
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
    
          // Update and draw nodes
          nodes.forEach((node) => {
            node.x += node.vx
            node.y += node.vy
    
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1
    
            // Draw node
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
            ctx.fillStyle = node.color
            ctx.fill()
          })
    
          // Draw connections
          ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
          ctx.lineWidth = 0.5
    
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x
              const dy = nodes[i].y - nodes[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)
    
              if (distance < 100) {
                ctx.beginPath()
                ctx.moveTo(nodes[i].x, nodes[i].y)
                ctx.lineTo(nodes[j].x, nodes[j].y)
                ctx.stroke()
              }
            }
          }
    
          requestAnimationFrame(animate)
        }
    
        animate()

        return () => {
          window.removeEventListener("resize", resizeCanvas)
        }
  }, [])

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Elite Founder Network</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect with founders who have built and scaled successful companies across industries.
        </p>
      </div>

      <div className="relative h-[400px] mb-16">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 h-full">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center backdrop-blur-sm bg-black/30 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all"
            >
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={founder.avatar || "/placeholder.svg"}
                  alt={founder.name}
                  fill
                  className="rounded-full object-cover border-2 border-blue-500/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              </div>
              <h3 className="font-medium text-white">{founder.name}</h3>
              <p className="text-xs text-blue-300">{founder.company}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block backdrop-blur-sm bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg px-6 py-3 border border-white/10"
        >
          <p className="text-sm text-gray-300">
            Our network is invitation-only and highly selective.
            <br />
            Apply now to be considered for membership.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
