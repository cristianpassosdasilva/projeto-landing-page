import Carrossel from '../../Comuns/Carrossel/Carrossel'

export default function Historia({ props }) {
  const historyImages = props.images?.length
    ? props.images
    : [
        {
          label: props.imageLabel || "Foto da Laud's",
          image: props.image || '',
          gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
        },
      ]

  return (
    <section id='historia' className='section history-section'>
      <div className='wrap'>
        <span className='sec-label centered'>{props.label}</span>
        <h2 className='section-title'>{props.title}</h2>
        <div className='history-grid'>
          <div>
            <h3>
              {props.heading}
              <br />
              <span className='gradtext'>{props.highlight}</span>
            </h3>
            {props.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
          <Carrossel images={historyImages} className='history-image' />
        </div>
      </div>
    </section>
  )
}
