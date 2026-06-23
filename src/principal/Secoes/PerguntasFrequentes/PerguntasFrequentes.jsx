import { useState } from 'react'

export default function PerguntasFrequentes({ props }) {
  const [mostrarTodas, setMostrarTodas] = useState(false)

  const perguntas = props.items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  )

  const perguntasDestaque = perguntas.filter((item) => item.featured ?? false)
  const perguntasExtras = perguntas.filter((item) => !(item.featured ?? false))

  const perguntasExibidas = mostrarTodas
    ? perguntas
    : perguntasDestaque.length > 0
      ? perguntasDestaque
      : perguntas.slice(0, 4)

  const temMais = perguntasExtras.length > 0 || (perguntasDestaque.length === 0 && perguntas.length > 4)

  return (
    <section id="faq" className="section faq-section">
      <div className="wrap narrow">
        <span className="sec-label centered">{props.label}</span>
        <h2>{props.title}</h2>
        <div className="faq-list">
          {perguntasExibidas.map((item, index) => (
            <details className="faq-item" key={`${item.question}-${index}`}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        {temMais ? (
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <button
              className="faq-mais"
              type="button"
              onClick={() => setMostrarTodas((atual) => !atual)}
            >
              {mostrarTodas ? '- perguntas' : '+ perguntas'}
            </button>
          </div>
        ) : null}
        <a className="faq-cta" href="#contato">
          <span>{props.cta}</span>
          <strong>⌄</strong>
        </a>
      </div>
    </section>
  )
}
