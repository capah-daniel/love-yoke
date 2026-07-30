"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const NO_MESSAGES = [
  "Tak",
  "Seriusan? 🥺",
  "Beneran nih?",
  "Coba pikirin lagi…",
  "Kesempatan terakhir?",
  "Agah tahee 💔",
  "Bilang Iya ajah 😊",
];

type RunawayNoButtonProps = {
  onGiveUp: () => void;
  disabled?: boolean;
};

export function RunawayNoButton({ onGiveUp, disabled }: RunawayNoButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const dodge = useCallback(() => {
    if (disabled) return;

    const next = attempts + 1;
    setAttempts(next);

    if (next >= NO_MESSAGES.length) {
      onGiveUp();
      return;
    }

    const container = containerRef.current?.parentElement;
    if (!container) return;

    const maxX = Math.max(container.clientWidth - 160, 40);
    const maxY = Math.max(container.clientHeight - 60, 40);

    setPosition({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  }, [attempts, disabled, onGiveUp]);

  const label = NO_MESSAGES[Math.min(attempts, NO_MESSAGES.length - 1)];

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        type="button"
        onMouseEnter={dodge}
        onTouchStart={dodge}
        onClick={dodge}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/15 sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.button>
    </div>
  );
}
