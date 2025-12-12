import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const VerifiedBadge = ({ className, size = "md" }: VerifiedBadgeProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-orange-500 text-white",
        sizeClasses[size],
        className
      )}
      title="Early Adopter - First 200 Members"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3/4 h-3/4"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    </div>
  );
};

export default VerifiedBadge;
