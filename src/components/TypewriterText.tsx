"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
};

export function TypewriterText({
  text,
  speed = 38,
  className = "",
  onComplete,
  startDelay = 0,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay <= 0) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete, started]);

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
    >
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-0.5 inline-block"
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
}
