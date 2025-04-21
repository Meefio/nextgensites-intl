// Target date for the promotion
const TARGET_DATE = new Date('2025-04-19T23:59:59')

export function isPromoActive() {
  const now = new Date()
  return now < TARGET_DATE
}

export function getTimeLeft() {
  const now = new Date()
  const difference = +TARGET_DATE - +now

  if (difference <= 0) {
    return null
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: 0, // We'll set this to 0 in the server component since it needs client updates
  }
} 
