import HeroSection from "@/components/hero-section"
import EmailCapture from "@/components/email-capture"
import Footer from "@/components/footer"
import FloatingActionButton from "@/components/floating-action-button"
import SmokeBackground from "@/components/smoke-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <SmokeBackground />
      <HeroSection />
      <EmailCapture />
      <Footer />
      <FloatingActionButton />
    </main>
  )
}
