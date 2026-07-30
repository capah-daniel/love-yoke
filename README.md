# Will You Be Mine? 💕

A romantic, animated Next.js website to ask that special someone to be your girlfriend.

## Features

- ✨ Starry night aurora background with floating hearts
- 💌 Interactive envelope opening scene
- 📝 Typewriter love letter
- 💖 The big question with a playful runaway "No" button
- 🎉 Confetti celebration when she says yes

## Personalize

Edit `src/config/love.ts` to add her name, your name, and your custom messages:

```ts
export const loveConfig = {
  herName: "Sarah",
  yourName: "Daniel",
  openingLine: "I made something just for you…",
  letterLines: [ /* your romantic lines */ ],
  question: "Will you be my girlfriend?",
  celebrationTitle: "She said yes!",
  celebrationMessage: "Your custom message here…",
};
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

Deploy to [Vercel](https://vercel.com) for free — push to GitHub and import the project, or run:

```bash
npx vercel
```

Good luck! 🍀💕
