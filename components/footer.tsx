"use client"
import { FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion"
import { Twitter, Instagram } from "lucide-react"
import LayoutContainer from "./layout-container"

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <footer className="relative py-16 border-t border-gray-200">
      <LayoutContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">
              Join FounderForge Today
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm">
              Request access now to be among the first to experience the power of elite founder connections.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-10">
            {[
              {
                icon: <Twitter size={20} />,
                label: "Twitter",
                link: "https://twitter.com/founderforgee",
              },
              {
                icon: <Instagram size={20} />,
                label: "Instagram",
                link: "https://instagram.com/founder.forge/",
              },
              {
                icon: <FaDiscord size={20} />,
                label: "Discord",
                link: "https://discord.gg/78qBVP3hJU",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link} // ✅ Correct usage
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 bg-gray-100 rounded-full"
                aria-label={item.label}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-gray-100 pt-8 text-center">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} FounderForge. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </LayoutContainer>
    </footer>
  )
}
