"use client"

export default function SpaceBackground() {
  return (
    <>
      {/* Base gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#020c1b] opacity-90" />

      {/* Earth image with overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: 'url("/earth-from-space.jpg")',
          backgroundPosition: "center 30%",
        }}
      />

      {/* Subtle vignette effect */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent to-black/70 opacity-80" />
    </>
  )
}
