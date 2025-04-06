import { Twitter, Instagram, Linkedin } from "lucide-react";
import { FaDiscord } from "react-icons/fa";


export default function Footer() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E8E3D9] to-[#D4B98C]">
          Join FounderForge Today
        </h2>
        <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#D4B98C] to-[#A67C52] mx-auto mb-4 sm:mb-6"></div>
        <p className="text-sm sm:text-base text-[#A9A9A9] max-w-md mx-auto">
          Request access now to be among the first to experience the power of elite founder connections.
        </p>
      </div>

      
      <div className="flex justify-center space-x-6 mb-6 sm:mb-8">
        <a href="https://x.com/founderforgee" className="text-gray-400 hover:text-[#D4B98C] transition-colors">
          <Twitter size={16} className="sm:w-5 sm:h-5" />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://www.instagram.com/founder.forge/" className="text-gray-400 hover:text-[#D4B98C] transition-colors">
          <Instagram size={16} className="sm:w-5 sm:h-5" />
          <span className="sr-only">Instagram</span>
        </a>
        <a href="https://discord.gg/gWJMWHPj" className="text-gray-400 hover:text-[#D4B98C] transition-colors">
        <FaDiscord size={16} className="sm:w-5 sm:h-5" />
          <span className="sr-only">Discord</span>
        </a>
    
        {/* <a href="#" className="text-gray-400 hover:text-[#D4B98C] transition-colors">
          <Discord size={16} className="sm:w-5 sm:h-5" />
          <span className="sr-only">Discord</span>
        </a> */}
      </div>

      {/* <div className="border-t border-[#D4B98C]/10 pt-4 sm:pt-6 text-center mx-4">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} FounderForge. All rights reserved.</p>
        <div className="mt-3 sm:mt-4 flex justify-center space-x-4 sm:space-x-6">
          <a href="#" className="text-xs text-gray-500 hover:text-[#D4B98C] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-[#D4B98C] transition-colors">
            Terms of Service
          </a>
        </div>
      </div> */}
    </div>
  )
}

