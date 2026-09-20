import { useMemo, useState } from 'react'
import { DIE_LABELS, DIE_ORDER, type DieColor } from './engine/dice'
import { critProbability, damageDistribution, expectedDamage, killProbability, type Pool } from './engine/distribution'

const initialPool: Pool = { yellow: 0, green: 0, blue: 0, purple: 0, red: 0 }

export function App() {
  const [pool, setPool] = useState<Pool>(initialPool)
  const [target, setTarget] = useState(3)

  const dist = useMemo(() => damageDistribution(pool), [pool])
  const kill = useMemo(() => killProbability(pool, target), [pool, target])
  const expected = useMemo(() => expectedDamage(pool), [pool])
  const crit = useMemo(() => critProbability(pool), [pool])

  const adjust = (color: DieColor, delta: number) =>
    setPool((current) => ({ ...current, [color]: Math.max(0, (current[color] ?? 0) + delta) }))

  return <main>
    <header>
      <p className="eyebrow">20 Strong Probability Lab</p>
      <h1>Build a dice pool. Know your odds.</h1>
      <p className="lede">Exact core-die probability calculations, entirely in your browser.</p>
    </header>

    <section className="panel">
      <label>Target damage
        <input type="number" min="1" value={target} onChange={(e) => setTarget(Math.max(1, Number(e.target.value) || 1))} />
      </label>

      <div className="dice-grid">
        {DIE_ORDER.map((color) => <div className={`die-card ${color}`} key={color}>
          <strong>{DIE_LABELS[color]}</strong>
          <div className="counter">
            <button onClick={() => adjust(color, -1)} aria-label={`Remove ${color} die`}>−</button>
            <span>{pool[color] ?? 0}</span>
            <button onClick={() => adjust(color, 1)} aria-label={`Add ${color} die`}>+</button>
          </div>
        </div>)}
      </div>
    </section>

    <section className="stats">
      <article><span>Kill probability</span><strong>{(kill * 100).toFixed(1)}%</strong></article>
      <article><span>Expected damage</span><strong>{expected.toFixed(2)}</strong></article>
      <article><span>≥1 Crit</span><strong>{(crit * 100).toFixed(1)}%</strong></article>
    </section>

    <section className="panel">
      <h2>Damage distribution</h2>
      <div className="distribution">
        {dist.map((p, damage) => p > 0.0001 && <div className="bar-row" key={damage}>
          <span>{damage}</span>
          <div className="bar"><i style={{ width: `${p * 100}%` }} /></div>
          <em>{(p * 100).toFixed(1)}%</em>
        </div>)}
      </div>
    </section>

    <footer>Strategy rerolls and pool optimization are intentionally not modeled yet; the first release establishes a tested exact core-dice engine.</footer>
  </main>
}
