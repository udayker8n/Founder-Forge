import { Suspense } from "react"
import dynamic from "next/dynamic"
import NetworkBackground from "@/components/network-background"
import HeroSection from "@/components/hero-section"
import EmailCapture from "@/components/email-capture"
import AboutSection from "@/components/about-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

// Import PageSlider with no SSR to avoid hydration issues
const PageSlider = dynamic(() => import("@/components/page-slider"), { ssr: true })

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#111111] to-black text-white overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<Loading />}>
        <NetworkBackground />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 w-full h-screen">
        <PageSlider>
          <HeroSection />
          <EmailCapture />
          <AboutSection />
          <FeaturesSection />
          {/* <TestimonialsSection /> */}
          <Footer />
        </PageSlider>
      </div>
    </div>
  )
}