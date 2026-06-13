import { useState } from 'react'

const PERGUNTAS_VISIVEIS = 4

export default function PerguntasFrequentes({ props }) {
  const [mostrarTodas, setMostrarTodas] = useState(false)

  const perguntas = props.items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  )

  const perguntasExibidas = mostrarTodas ? perguntas : perguntas.slice(0, PERGUNTAS_VISIVEIS)
  const temMais = perguntas.length > PERGUNTAS_VISIVEIS

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
        {temMais && !mostrarTodas ? (
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <button
              className="faq-mais"
              type="button"
              onClick={() => setMostrarTodas(true)}
            >
              + perguntas
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
