import TextoFormatado from '../../../utilitarios/textoFormatado'

export default function TituloSecao({ label, title, highlight, subtitle }) {
  const hasTitle = Boolean(title && String(title).trim())
  const hasHighlight = Boolean(highlight && String(highlight).trim())
  const titleEqualsHighlight = hasTitle && hasHighlight && String(title).trim() === String(highlight).trim()

  return (
    <div className="section-head">
      <span className="sec-label">{label}</span>
      <h2>
        {/* Se o title for igual ao highlight, renderiza apenas em gradiente */}
        {titleEqualsHighlight ? (
          <span className="gradtext">
            <TextoFormatado texto={String(title).trim()} />
          </span>
        ) : (
          <>
            {hasTitle ? <TextoFormatado texto={String(title)} /> : null}
            {hasHighlight ? (
              hasTitle ? (
                <>
                  <br />
                  <span className="gradtext">
                    <TextoFormatado texto={highlight} />
                  </span>
                </>
              ) : (
                <span className="gradtext">
                  <TextoFormatado texto={highlight} />
                </span>
              )
            ) : null}
          </>
        )}
      </h2>
      {subtitle ? (
        <p>
          <TextoFormatado texto={subtitle} />
        </p>
      ) : null}
    </div>
  )
}
