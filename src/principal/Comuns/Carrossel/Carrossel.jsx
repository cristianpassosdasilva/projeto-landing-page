import { useEffect, useState } from 'react'
import { imageStyle } from '../../../utilitarios/estiloImagem'

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #e9cfe4, #d080c0)'

export default function Carrossel({
  images,
  className,
  intervalMs = 10000,
  activeIndex,
  onChangeIndex,
}) {
  const [internalSlide, setInternalSlide] = useState(0)
  const slides = images?.length
    ? images
    : [{ label: '', image: '', gradient: DEFAULT_GRADIENT }]
  const isControlled = typeof activeIndex === 'number' && typeof onChangeIndex === 'function'
  const slide = isControlled ? activeIndex : internalSlide

  function setSlide(updater) {
    if (isControlled) {
      onChangeIndex(updater)
    } else {
      setInternalSlide(updater)
    }
  }

  const activeSlide = slide % slides.length
  const current = slides[activeSlide] || slides[0]

  useEffect(() => {
    if (slides.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setSlide((value) => (value + 1) % slides.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, intervalMs])

  return (
    <div className={className} style={imageStyle(current.image, current.gradient)}>
      {slides.length > 1 ? (
        <button
          className="carousel-nav prev"
          type="button"
          aria-label="Imagem anterior"
          onClick={() => setSlide((activeSlide - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
      ) : null}
      {current.label ? <span>{current.label}</span> : null}
      {slides.length > 1 ? (
        <button
          className="carousel-nav next"
          type="button"
          aria-label="Próxima imagem"
          onClick={() => setSlide((activeSlide + 1) % slides.length)}
        >
          ›
        </button>
      ) : null}
      {slides.length > 1 ? (
        <div className="dots">
          {slides.map((item, index) => (
            <button
              className={index === activeSlide ? 'active' : ''}
              key={`${item.label}-${index}`}
              type="button"
              aria-label={`Ver ${item.label || `imagem ${index + 1}`}`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
