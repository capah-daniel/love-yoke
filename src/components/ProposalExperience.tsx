"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { RunawayNoButton } from "@/components/RunawayNoButton";
import { StarField } from "@/components/StarField";
import { TypewriterText } from "@/components/TypewriterText";
import { loveConfig } from "@/config/love";

type Scene = "intro" | "envelope" | "letter" | "gallery" | "question" | "celebration";

const sceneVariants = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 },
};

function fireCelebration() {
  const duration = 4000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#ff6b9d", "#ffc0cb", "#ffd700", "#ffffff", "#ff1493"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#ff6b9d", "#ffc0cb", "#ffd700", "#ffffff", "#ff1493"],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff6b9d", "#ffc0cb", "#ffd700", "#ffffff"],
  });
}

export function ProposalExperience() {
  const [scene, setScene] = useState<Scene>("intro");
  const [letterLineIndex, setLetterLineIndex] = useState(0);
  const [letterDone, setLetterDone] = useState(false);
  const [pulseHeart, setPulseHeart] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScene("envelope"), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scene === "celebration") fireCelebration();
  }, [scene]);

  const handleYes = useCallback(() => {
    setPulseHeart(true);
    setTimeout(() => setScene("celebration"), 400);
  }, []);

  const advanceLetter = useCallback(() => {
    if (letterLineIndex < loveConfig.letterLines.length - 1) {
      setLetterLineIndex((i) => i + 1);
    } else {
      setLetterDone(true);
    }
  }, [letterLineIndex]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#4a1942]" />
      <motion.div
        className="fixed inset-0 opacity-60"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(255,105,180,0.35) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(255,182,193,0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,20,147,0.25) 0%, transparent 55%)",
            "radial-gradient(circle at 20% 30%, rgba(255,105,180,0.35) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <StarField />
      <FloatingHearts count={scene === "celebration" ? 40 : 20} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          {scene === "intro" && (
            <motion.div
              key="intro"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6 text-7xl"
              >
                💌
              </motion.div>
              <motion.p
                className="font-display text-2xl text-rose-100 sm:text-3xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Something beautiful is loading…
              </motion.p>
            </motion.div>
          )}

          {scene === "envelope" && (
            <motion.div
              key="envelope"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex max-w-lg flex-col items-center text-center"
            >
              <motion.div
                initial={{ rotateX: 0 }}
                whileHover={{ scale: 1.05 }}
                className="relative mb-10 cursor-pointer"
                onClick={() => setScene("letter")}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="rounded-2xl border border-rose-300/30 bg-gradient-to-br from-rose-500/20 to-pink-600/20 px-14 py-10 shadow-2xl shadow-rose-900/40 backdrop-blur-md">
                    <motion.span
                      className="block text-6xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💝
                    </motion.span>
                  </div>
                  <motion.div
                    className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[70px] border-r-[70px] border-b-[40px] border-l-transparent border-r-transparent border-b-rose-400/40"
                    animate={{ rotateX: [0, -25, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              <motion.h1
                className="font-display mb-3 text-4xl font-light text-rose-50 sm:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Deee {loveConfig.herName},
              </motion.h1>
              <motion.p
                className="font-body mb-8 text-lg text-rose-200/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {loveConfig.openingLine}
              </motion.p>
              <motion.button
                type="button"
                onClick={() => setScene("letter")}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-4 text-lg font-medium text-white shadow-lg shadow-rose-900/50"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <span className="relative z-10">Tekan aingg!</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          )}

          {scene === "letter" && (
            <motion.div
              key="letter"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <motion.div
                  className="mb-8 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-3xl">🌹</span>
                  <h2 className="font-display text-2xl text-rose-100 sm:text-3xl">
                    Surat Buatmu
                  </h2>
                </motion.div>

                <div className="mb-8 min-h-[200px] space-y-4">
                  {loveConfig.letterLines.slice(0, letterLineIndex).map((line, i) => (
                    <p
                      key={`done-${i}`}
                      className="font-body text-lg leading-relaxed text-rose-100/95 sm:text-xl"
                    >
                      {line}
                    </p>
                  ))}
                  {letterLineIndex < loveConfig.letterLines.length && (
                    <TypewriterText
                      key={`typing-${letterLineIndex}`}
                      text={loveConfig.letterLines[letterLineIndex]}
                      className="font-body text-lg leading-relaxed text-rose-100/95 sm:text-xl"
                      onComplete={advanceLetter}
                      startDelay={letterLineIndex === 0 ? 300 : 0}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {letterDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-6 border-t border-white/10 pt-8"
                    >

                      <motion.button
                        type="button"
                        onClick={() => setScene("gallery")}
                        className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-10 py-4 text-lg font-medium text-white shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,105,180,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Tekan aing lagi !!!
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {scene === "gallery" && (
            <motion.div
              key="gallery"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex w-full max-w-2xl flex-col items-center text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-10 w-full"
              >
                <PhotoCarousel photos={loveConfig.photos} />
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setScene("question")}
                className="rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-10 py-4 text-lg font-medium text-white shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,105,180,0.5)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Ada lagi!!! 💖
              </motion.button>
            </motion.div>
          )}

          {scene === "question" && (
            <motion.div
              key="question"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex w-full max-w-xl flex-col items-center text-center"
            >
              <motion.div
                animate={
                  pulseHeart
                    ? { scale: [1, 1.5, 1.2], rotate: [0, 10, -10, 0] }
                    : { scale: [1, 1.12, 1] }
                }
                transition={
                  pulseHeart
                    ? { duration: 0.6 }
                    : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                }
                className="mb-8 text-8xl"
              >
                💖
              </motion.div>

              <motion.h2
                className="font-display mb-4 text-4xl font-light text-rose-50 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {loveConfig.question}
              </motion.h2>

              <motion.p
                className="font-body mb-12 text-lg text-rose-200/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
              </motion.p>

              <div className="relative flex min-h-[120px] w-full max-w-md items-center justify-center gap-6">
                <motion.button
                  type="button"
                  onClick={handleYes}
                  className="rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 px-12 py-4 text-xl font-semibold text-white shadow-xl shadow-rose-900/40"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(255,105,180,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  Mauu! 💕
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <RunawayNoButton onGiveUp={handleYes} disabled={pulseHeart} />
                </motion.div>
              </div>
            </motion.div>
          )}

          {scene === "celebration" && (
            <motion.div
              key="celebration"
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex max-w-2xl flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-8 text-9xl"
              >
                🥰
              </motion.div>

              <motion.h2
                className="font-display mb-6 text-5xl font-light text-rose-50 sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {loveConfig.celebrationTitle}
              </motion.h2>

              <motion.p
                className="font-body mb-10 text-xl leading-relaxed text-rose-100/90 sm:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {loveConfig.celebrationMessage}
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {["💑", "🌹", "✨", "💍", "🦋", "🌙"].map((emoji, i) => (
                  <motion.span
                    key={emoji}
                    animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                className="font-script mt-12 text-3xl text-rose-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
