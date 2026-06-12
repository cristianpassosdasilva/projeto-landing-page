export default function TituloSecao({ label, title, highlight, subtitle }) {
  return (
    <div className="section-head">
      <span className="sec-label">{label}</span>
      <h2>
        {title}
        {highlight ? (
          <>
            <br />
            <span className="gradtext">{highlight}</span>
          </>
        ) : null}
      </h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}
