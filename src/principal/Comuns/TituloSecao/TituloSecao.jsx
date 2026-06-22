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
          <span className="gradtext">{String(title).trim()}</span>
        ) : (
          <>
            {hasTitle ? String(title) : null}
            {hasHighlight ? (
              hasTitle ? (
                <>
                  <br />
                  <span className="gradtext">{highlight}</span>
                </>
              ) : (
                <span className="gradtext">{highlight}</span>
              )
            ) : null}
          </>
        )}
      </h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}
