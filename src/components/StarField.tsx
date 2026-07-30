"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

export function StarField({ count = 60 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
