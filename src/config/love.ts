import type { LovePhoto } from "@/components/PhotoCarousel";

/** Personalize these before sharing the link */
export const loveConfig = {
  herName: "Yokebett",
  yourName: "Daniell",
  /** Shown on the opening envelope */
  openingLine: "Ku mau ngomong sesuatu, bolehh takkk??",
  /** Photos for the admiration carousel — add images to public/pictures/ */
  photos: [
    {
      src: "/pictures/photo-1.jpeg",
      caption: "Wanita dengan senyum paling cantiiikk",
      admiration:
        "Setiap malam ku lihat fotomu dan berkata dalam hati: 'Betapa beruntungnya aku bisa bertemu dengan mu'",
    },
  ] satisfies LovePhoto[],
  /** Carousel scene heading */
  galleryTitle: "Reasons I admire you",
  gallerySubtitle: "Every photo reminds me how lucky I am to know you.",
  /** Typewriter lines in the love letter */
  letterLines: [
    "Sejak dengan mu, hidup ku berubah, jadi lebih berwarna.",
    "Ku jadi diriku sendiri, ku bisa cerita tentang apapun tampa takut di judge baik keluargaku, pekerjaan, cita-cita maupun keluah kesahku.",
    "Perhatian mu, Canda tawa mu",
    "Ingin rasanya kumiliki seutuhnya.",
  ],
  /** The big question */
  question: "Dee Yokee, Mau takk jadi pacarku?",
  /** After she says yes */
  celebrationTitle: "Seriusann!",
  celebrationMessage:
    "Love You Dee Yokeeee 💕",
};
