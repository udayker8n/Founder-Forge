import type { ReactNode } from "react"

interface LayoutContainerProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export default function LayoutContainer({ children, className = "", fullWidth = false }: LayoutContainerProps) {
  return (
    <div className={`w-full px-4 sm:px-6 ${fullWidth ? "" : "lg:px-0"}`}>
      <div
        className={`mx-auto ${
          fullWidth ? "w-full" : "w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[40%]"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
