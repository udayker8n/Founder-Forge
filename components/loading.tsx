export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#D4B98C]/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#D4B98C] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[#D4B98C] text-sm font-light">Loading Experience</p>
      </div>
    </div>
  )
}

