import { useEffect, useState } from 'react'
import { imageStyle } from '../../../utilitarios/estiloImagem'

export default function Historia({ props }) {
  const [historySlide, setHistorySlide] = useState(0)
  const historyImages = props.images?.length
    ? props.images
    : [
        {
          label: props.imageLabel || "Foto da Laud's",
          image: props.image || '',
          gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
        },
      ]
  const activeHistorySlide = historySlide % historyImages.length
  const currentHistoryImage = historyImages[activeHistorySlide] || historyImages[0]

  useEffect(() => {
    if (historyImages.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setHistorySlide((current) => (current + 1) % historyImages.length)
    }, 10000)

    return () => window.clearInterval(timer)
  }, [historyImages.length])

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
          <div
            className='history-image'
            style={imageStyle(currentHistoryImage.image, currentHistoryImage.gradient)}
          >
            {historyImages.length > 1 ? (
              <button
                className='carousel-nav prev'
                type='button'
                aria-label='Imagem anterior'
                onClick={() =>
                  setHistorySlide(
                    (activeHistorySlide - 1 + historyImages.length) % historyImages.length,
                  )
                }
              >
                ‹
              </button>
            ) : null}
            {currentHistoryImage.label ? <span>{currentHistoryImage.label}</span> : null}
            {historyImages.length > 1 ? (
              <button
                className='carousel-nav next'
                type='button'
                aria-label='Próxima imagem'
                onClick={() => setHistorySlide((activeHistorySlide + 1) % historyImages.length)}
              >
                ›
              </button>
            ) : null}
            {historyImages.length > 1 ? (
              <div className='dots'>
                {historyImages.map((item, index) => (
                  <button
                    className={index === activeHistorySlide ? 'active' : ''}
                    key={`${item.label}-${index}`}
                    type='button'
                    aria-label={`Ver ${item.label}`}
                    onClick={() => setHistorySlide(index)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
