"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const HEARTS = ["💕", "💖", "💗", "💓", "❤️", "✨", "🌸"];

type HeartParticle = {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

export function FloatingHearts({ count = 24 }: { count?: number }) {
  const hearts = useMemo<HeartParticle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: HEARTS[i % HEARTS.length],
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 6,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute bottom-[-10%] select-none opacity-0"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
            filter: "drop-shadow(0 0 8px rgba(255,120,160,0.5))",
          }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "-120vh",
            x: heart.drift,
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.span>
      ))}
    </div>
  );
}
