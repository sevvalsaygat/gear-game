export interface Punishment {
  id: number
  text: string
  emoji: string
  color: string
}

export const punishments: Punishment[] = [
  {
    id: 1,
    text: "Do 20 jumping jacks while singing your favorite song",
    emoji: "🏃‍♂️",
    color: "#FF6B6B"
  },
  {
    id: 2,
    text: "Tell a joke in a funny accent for 2 minutes",
    emoji: "🎭",
    color: "#4ECDC4"
  },
  {
    id: 3,
    text: "Dance like no one's watching for 30 seconds",
    emoji: "💃",
    color: "#45B7D1"
  },
  {
    id: 4,
    text: "Do your best celebrity impression",
    emoji: "⭐",
    color: "#96CEB4"
  },
  {
    id: 5,
    text: "Speak only in questions for the next 3 rounds",
    emoji: "❓",
    color: "#FECA57"
  },
  {
    id: 6,
    text: "Act like a chicken for 1 minute",
    emoji: "🐔",
    color: "#FF9FF3"
  },
  {
    id: 7,
    text: "Tell everyone your most embarrassing moment",
    emoji: "😳",
    color: "#54A0FF"
  },
  {
    id: 8,
    text: "Do 10 pushups while complimenting everyone",
    emoji: "💪",
    color: "#5F27CD"
  },
  {
    id: 9,
    text: "Sing 'Happy Birthday' in opera style",
    emoji: "🎵",
    color: "#00D2D3"
  },
  {
    id: 10,
    text: "Act out your favorite movie scene silently",
    emoji: "🎬",
    color: "#FF6348"
  },
  {
    id: 11,
    text: "Do a fashion show walk around the room",
    emoji: "👗",
    color: "#2ED573"
  },
  {
    id: 12,
    text: "Tell a bedtime story to an imaginary child",
    emoji: "📚",
    color: "#FFA502"
  },
  {
    id: 13,
    text: "Do your best robot dance for 45 seconds",
    emoji: "🤖",
    color: "#3742FA"
  },
  {
    id: 14,
    text: "Compliment everyone using only food words",
    emoji: "🍎",
    color: "#2F3542"
  },
  {
    id: 15,
    text: "Act like you're underwater for the next 2 minutes",
    emoji: "🌊",
    color: "#70A1FF"
  }
]

export const getRandomPunishment = (): Punishment => {
  const randomIndex = Math.floor(Math.random() * punishments.length)
  return punishments[randomIndex]
} 