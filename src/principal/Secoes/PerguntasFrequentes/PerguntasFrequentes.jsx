export default function PerguntasFrequentes({ props }) {
  const perguntas = props.items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  )

  return (
    <section id="faq" className="section faq-section">
      <div className="wrap narrow">
        <span className="sec-label centered">{props.label}</span>
        <h2>{props.title}</h2>
        <div className="faq-list">
          {perguntas.map((item, index) => (
            <details className="faq-item" key={`${item.question}-${index}`}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <a className="faq-cta" href="#contato">
          <span>{props.cta}</span>
          <strong>⌄</strong>
        </a>
      </div>
    </section>
  )
}
