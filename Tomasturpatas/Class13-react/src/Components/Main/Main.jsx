import { useState } from 'react'
import './Main.css'

function Main() {
  const [count, setCount] = useState(0)

  return (
    <main className="counter-main">
      <section className="counter-card" aria-labelledby="counter-title">
        <h2 id="counter-title">Valor actual</h2>
        <output className="counter-value" aria-live="polite">
          {count}
        </output>
        <div className="counter-actions">
          <button
            className="counter-button counter-button--decrement"
            type="button"
            onClick={() => setCount((currentCount) => currentCount - 1)}
            aria-label="Decrementar contador"
          >
            −
          </button>
          <button
            className="counter-button counter-button--increment"
            type="button"
            onClick={() => setCount((currentCount) => currentCount + 1)}
            aria-label="Incrementar contador"
          >
            +
          </button>
        </div>
        <p className="counter-help">Usa los botones para cambiar el valor.</p>
      </section>
    </main>
  )
}

export default Main