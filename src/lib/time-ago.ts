const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ]

  for (const [unit, secs] of units) {
    const value = Math.floor(seconds / secs)
    if (value >= 1) return rtf.format(-value, unit)
  }
  return 'just now'
}
