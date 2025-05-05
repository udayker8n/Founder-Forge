"use client"

export default function SubtleGradientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Base white background */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Subtle charcoal gradient overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #e0e0e0 50%, #d0d0d0 75%, #c0c0c0 100%)",
        }}
      ></div>

      {/* Very subtle texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  )
}
