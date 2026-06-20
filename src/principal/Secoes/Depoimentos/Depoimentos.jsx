import React, { useMemo, useState } from 'react'
import TituloSecao from '../../Comuns/TituloSecao/TituloSecao'

export default function Depoimentos({ props }) {
  const [testimonialSlide, setTestimonialSlide] = useState(0)
  const testimonialGroups = useMemo(() => {
    const groups = []
    for (let index = 0; index < props.items.length; index += 3) {
      groups.push(props.items.slice(index, index + 3))
    }
    return groups.length ? groups : [[]]
  }, [props.items])
  const activeTestimonialSlide = testimonialSlide % testimonialGroups.length

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
          <button
            className='testimonial-nav prev'
            type='button'
            aria-label='Depoismentos anteriores'
            onClick={() =>
              setTestimonialSlide(
                (activeTestimonialSlide - 1 + testimonialGroups.length) %
                testimonialGroups.length
              )
            }
          >
            ‹
          </button>
          <div
            className='testimonial-track'
            style={{ transform: `translateX(-${activeTestimonialSlide * 100}%)` }}
          >
            {testimonialGroups.map((group, groupIndex) => (
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
                    <div className='stars'>★★★★★</div>
                    <p>“{testimonial.quote}”</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
          <button
            className='testimonial-nav next'
            type='button'
            aria-label='Próximos depoimentos'
            onClick={() => setTestimonialSlide(
              (activeTestimonialSlide + 1) % testimonialGroups.length
            )}
          >
            ›
          </button>
        </div>
        <div className='testimonial-dots'>
          {testimonialGroups.map((group, index) => (
            <button
              className={index === activeTestimonialSlide ? 'active' : ''}
              key={`testimonial-dot-${index}`}
              type='button'
              aria-label={`Ver grupo ${index + 1}`}
              onClick={() => setTestimonialSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
