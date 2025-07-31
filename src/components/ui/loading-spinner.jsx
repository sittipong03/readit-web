import { LoaderCircle } from "lucide-react"

export function LoadingSpinner({ size = "medium", className = "", ...props }) {
  const sizeClasses = {
    small: "w-3 h-3",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  }

  return <LoaderCircle className={`${sizeClasses[size]} animate-spin ${className}`} {...props} />
}
