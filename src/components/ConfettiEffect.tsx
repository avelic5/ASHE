import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  delay: number;
}

export function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = [
        "var(--pastel-lavender)",
        "var(--pastel-mint)",
        "var(--pastel-peach)",
        "var(--pastel-sky)",
        "var(--pastel-rose)",
      ];

      const newConfetti = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
      }));

      setConfetti(newConfetti);

      setTimeout(() => {
        setConfetti([]);
      }, 2000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: piece.x,
            y: piece.y,
            opacity: 0,
            rotate: piece.rotation,
          }}
          transition={{
            duration: 1.5,
            delay: piece.delay,
            ease: "easeOut",
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}
    </div>
  );
}
