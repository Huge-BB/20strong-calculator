import { describe, expect, it } from 'vitest'
import { critProbability, damageDistribution, expectedDamage, killProbability } from './distribution'

describe('20 Strong core dice', () => {
  it('red die never misses and averages 7/6 damage', () => {
    expect(killProbability({ red: 1 }, 1)).toBeCloseTo(1)
    expect(expectedDamage({ red: 1 })).toBeCloseTo(7 / 6)
  })

  it('yellow die hits for at least one damage 2/6 of the time', () => {
    expect(killProbability({ yellow: 1 }, 1)).toBeCloseTo(2 / 6)
  })

  it('crit chance depends only on dice count', () => {
    expect(critProbability({ yellow: 4 })).toBeCloseTo(1 - Math.pow(5 / 6, 4))
    expect(critProbability({ purple: 4 })).toBeCloseTo(1 - Math.pow(5 / 6, 4))
  })

  it('distribution sums to one', () => {
    const dist = damageDistribution({ yellow: 2, blue: 1, purple: 1 })
    expect(dist.reduce((a, b) => a + b, 0)).toBeCloseTo(1)
  })
})
