"use client"

import { motion } from "framer-motion"
import { Users, Calendar, MessageSquare, Shield } from "lucide-react"

const features = [
  {
    icon: <Users size={20} />,
    title: "Elite Founder Network",
    description: "Connect with founders who've built $10M+ companies across diverse industries and markets.",
  },
  {
    icon: <Calendar size={20} />,
    title: "1:1 Sessions",
    description: "Schedule personalized, one-on-one mentorship sessions with founders who match your specific needs.",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "Direct Communication",
    description: "Engage in meaningful conversations through our seamless, secure communication channels.",
  },
  {
    icon: <Shield size={20} />,
    title: "Vetted Community",
    description: "Our rigorous selection process ensures quality interactions with proven entrepreneurs.",
  },
]

export default function FeaturesSection() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          How FounderForge Works
        </h2>
        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4B98C] to-[#A67C52] mx-auto mb-4 sm:mb-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="backdrop-blur-sm bg-black/30 p-4 sm:p-6 rounded-xl border border-[#D4B98C]/10 hover:border-[#D4B98C]/30 transition-colors"
          >
            <div className="flex items-start">
              <div className="mr-3 sm:mr-4 p-2 sm:p-3 rounded-full bg-gradient-to-br from-[#D4B98C]/20 to-[#A67C52]/20 text-[#D4B98C]">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-[#E8E3D9]">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-[#A9A9A9]">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

