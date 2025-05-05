"use client"

export default function NetworkBackground() {
  return (
    <>
      {/* Vibrant, energetic gradient background inspired by modern Apple designs */}
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #FF9E7D 25%, #FFD166 50%, #06D6A0 75%, #118AB2 100%)",
        }}
      ></div>

      {/* Subtle overlay pattern for depth and texture */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
    </>
  )
}
