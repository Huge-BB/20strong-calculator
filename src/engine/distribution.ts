import { DIE_FACES, type DieColor } from './dice'

export type Pool = Partial<Record<DieColor, number>>

export function poolToDice(pool: Pool): DieColor[] {
  const dice: DieColor[] = []
  for (const [color, count] of Object.entries(pool) as [DieColor, number][]) {
    for (let i = 0; i < (count ?? 0); i++) dice.push(color)
  }
  return dice
}

export function damageDistribution(pool: Pool): number[] {
  let dist = [1]
  for (const color of poolToDice(pool)) {
    const next = new Array(dist.length + 2).fill(0)
    for (let total = 0; total < dist.length; total++) {
      for (const face of DIE_FACES[color]) next[total + face] += dist[total] / 6
    }
    dist = next
  }
  return dist
}

export function killProbability(pool: Pool, target: number): number {
  const dist = damageDistribution(pool)
  return dist.reduce((sum, p, damage) => sum + (damage >= target ? p : 0), 0)
}

export function expectedDamage(pool: Pool): number {
  return damageDistribution(pool).reduce((sum, p, damage) => sum + damage * p, 0)
}

export function critProbability(pool: Pool): number {
  const dice = poolToDice(pool).length
  return dice === 0 ? 0 : 1 - Math.pow(5 / 6, dice)
}
