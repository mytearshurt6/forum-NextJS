export function bigNumberNormalizer(n: number): string {
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''

  if (abs < 1000) return `${n}`

  const units = [
    { limit: 1e12, suffix: 'T' },
    { limit: 1e9, suffix: 'B' },
    { limit: 1e6, suffix: 'M' },
    { limit: 1e3, suffix: 'K' },
  ] as const

  for (const { limit, suffix } of units) {
    if (abs >= limit) {
      const truncated = Math.floor((abs / limit) * 10) / 10
      const formatted = truncated.toFixed(1).replace(/\.0$/, '')
      return `${sign}${formatted}${suffix}`
    }
  }
  return `${n}`
}

//AI refactored my handwritten version, gonna try write functions like this from now on
// export function bigNumberNormalizer(number: number): string {
//   if (number < 1000) return `${number}`
//   if (number < 1000000) return `${(Math.floor((number / 1000) * 10) / 10).toFixed(1)}K`
//   if (number < 1000000000) return `${(Math.floor((number / 1000000) * 10) / 10).toFixed(1)}M`
//   return `${(Math.floor((number / 1000000000) * 10) / 10).toFixed(1)}B`
// }
