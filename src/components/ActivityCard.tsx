import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function ActivityCard({
  title,
  icon: Icon,
  color,
  onClick,
}: ActivityCardProps) {
  // Generate beautiful multi-color gradients based on the base color
  const getGradient = (baseColor: string) => {
    const gradients: { [key: string]: string } = {
      "var(--pastel-lavender)":
        "linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)",
      "var(--pastel-sky)":
        "linear-gradient(135deg, #60a5fa 0%, #7dd3fc 50%, #38bdf8 100%)",
      "var(--pastel-mint)":
        "linear-gradient(135deg, #34d399 0%, #6ee7b7 50%, #a7f3d0 100%)",
    };
    return (
      gradients[baseColor] ||
      `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}f5 50%, ${baseColor}e8 100%)`
    );
  };

  return (
    <motion.button
      onClick={onClick}
      className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-outline)] cursor-pointer"
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Enhanced gradient background with glass effect */}
      <div
        className="relative w-40 h-48 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 backdrop-blur-sm border-2 border-white/50 overflow-hidden"
        style={{
          background: getGradient(color),
          boxShadow:
            "0 10px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(139, 127, 184, 0.25)",
        }}
      >
        {/* Subtle shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-60" />

        {/* Icon container with enhanced glass effect */}
        <motion.div
          className="relative w-16 h-16 bg-white/85 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/60"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-[var(--foreground)]" />
        </motion.div>

        <p className="relative text-[var(--foreground)] text-center font-semibold drop-shadow-md">
          {title}
        </p>
      </div>

      {/* Enhanced glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}88, ${color}44 50%, transparent 70%)`,
          filter: "blur(24px)",
          zIndex: -1,
        }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}66, transparent)`,
          padding: "2px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </motion.button>
  );
}
