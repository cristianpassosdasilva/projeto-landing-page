import { useMemo, useState } from 'react'
import TituloSecao from '../../Comuns/TituloSecao/TituloSecao'

export default function Depoimentos({ props }) {
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  const testimonialWindows = useMemo(() => {
    const items = props.items

    if (items.length <= 3) {
      return [items]
    }

    const windows = []
    for (let index = 0; index <= items.length - 3; index += 1) {
      windows.push(items.slice(index, index + 3))
    }
    return windows
  }, [props.items])
  const activeTestimonialSlide = Math.min(testimonialSlide, testimonialWindows.length - 1)
  const hasPrev = activeTestimonialSlide > 0
  const hasNext = activeTestimonialSlide < testimonialWindows.length - 1

  return (
    <section id='depoimentos' className='section testimonials-section'>
      <div className='wrap'>
        <TituloSecao
          label={props.label}
          title={props.title}
          highlight={props.highlight}
          subtitle={props.ratingText}
        />
        <div className='testimonial-carousel'>
          {hasPrev ? (
            <button
              className='testimonial-nav prev'
              type='button'
              aria-label='Depoismentos anteriores'
              onClick={() => setTestimonialSlide(activeTestimonialSlide - 1)}
            >
              ‹
            </button>
          ) : null}
          <div className='testimonial-viewport'>
            <div
              className='testimonial-track'
              style={{ transform: `translateX(-${activeTestimonialSlide * 100}%)` }}
            >
              {testimonialWindows.map((group, groupIndex) => (
                <div className='testimonial-slide' key={`group-${groupIndex}`}>
                  {group.map((testimonial, index) => (
                    <article
                      className={`testimonial-card ${index === 1 ? 'featured' : ''}`}
                      key={`${testimonial.name}-${index}`}
                    >
                      <div className='testimonial-who'>
                        <span className='avatar'>{testimonial.initial}</span>
                        <div>
                          <strong>{testimonial.name}</strong>
                          <small>{testimonial.location}</small>
                        </div>
                      </div>
                      <div className='stars'>
                      {'★'.repeat(testimonial.rating ?? 5)}
                      {'☆'.repeat(5 - (testimonial.rating ?? 5))}
                    </div>
                      <p>“{testimonial.quote}”</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {hasNext ? (
            <button
              className='testimonial-nav next'
              type='button'
              aria-label='Próximos depoimentos'
              onClick={() => setTestimonialSlide(activeTestimonialSlide + 1)}
            >
              ›
            </button>
          ) : null}
        </div>
        {testimonialWindows.length > 1 ? (
          <div className='testimonial-dots'>
            {testimonialWindows.map((group, index) => (
              <button
                className={index === activeTestimonialSlide ? 'active' : ''}
                key={`testimonial-dot-${index}`}
                type='button'
                aria-label={`Ver depoimentos a partir do ${index + 1}`}
                onClick={() => setTestimonialSlide(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
