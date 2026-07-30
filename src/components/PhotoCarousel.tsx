"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type LovePhoto = {
  src: string;
  caption: string;
  admiration: string;
};

type PhotoCarouselProps = {
  photos: LovePhoto[];
  autoPlayMs?: number;
};

export function PhotoCarousel({ photos, autoPlayMs = 5000 }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number) => {
      if (photos.length <= 1) return;
      setDirection(next > index ? 1 : -1);
      setIndex((next + photos.length) % photos.length);
    },
    [index, photos.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, next, photos.length]);

  const photo = photos[index];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 280 : -280, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -280 : 280, opacity: 0, scale: 0.92 }),
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="relative overflow-hidden rounded-3xl border border-rose-300/25 bg-black/20 shadow-2xl shadow-rose-900/30 backdrop-blur-sm">
        {/* Glow ring */}
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-rose-400/30 via-pink-500/20 to-fuchsia-500/30"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:aspect-[3/4]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={photo.src}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/90 via-[#1a0a2e]/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating heart badge */}
          <motion.div
            className="absolute right-4 top-4 rounded-full bg-rose-500/80 px-3 py-1.5 text-sm text-white shadow-lg backdrop-blur-sm"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.div>

          {/* Caption overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-x-0 bottom-0 p-6 text-left"
            >
              <p className="font-script mb-1 text-2xl text-rose-100">{photo.caption}</p>
              <p className="font-body text-sm leading-relaxed text-rose-200/90 sm:text-base">
                {photo.admiration}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur-md transition hover:bg-black/50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 text-white backdrop-blur-md transition hover:bg-black/50"
            >
              ›
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => goTo(i)}
              className="group p-1"
            >
              <motion.span
                className={`block h-2 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-rose-400"
                    : "w-2 bg-white/30 group-hover:bg-white/50"
                }`}
                layout
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
