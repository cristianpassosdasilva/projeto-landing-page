import { useState } from 'react'
import TituloSecao from '../../Comuns/TituloSecao/TituloSecao'
import Carrossel from '../../Comuns/Carrossel/Carrossel'

export default function Servicos({ props }) {
  const [serviceSlide, setServiceSlide] = useState(0)
  const serviceImages = props.images.length
    ? props.images
    : [
<<<<<<< HEAD
      {
        label: 'Imagem do serviço',
        image: '',
        gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
      },
    ]
  const activeServiceSlide = serviceSlide % serviceImages.length
  const currentServiceImage = serviceImages[activeServiceSlide] || serviceImages[0]

  useEffect(() => {
    if (serviceImages.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setServiceSlide((current) => (current + 1) % serviceImages.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [serviceImages.length])
=======
        {
          label: 'Imagem do serviço',
          image: '',
          gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
        },
      ]
>>>>>>> origin/main

  return (
    <section id="servicos" className="section services-section">
      <div className="wrap">
        <TituloSecao
          label={props.label}
          title={props.title}
          subtitle={props.subtitle}
        />
        <div className="services-layout">
          <div className="service-grid">
            {props.items.map((service, index) => (
              <button
                className="service-item"
                key={`${service.label}-${index}`}
                type="button"
                onClick={() => setServiceSlide(index % serviceImages.length)}
              >
                <span className="service-icon">
                  {service.image ? (
                    <img src={service.image} alt={service.label} />
                  ) : (
                    service.icon
                  )}
                </span>
                <span>{service.label}</span>
              </button>
            ))}
          </div>
          <Carrossel
            images={serviceImages}
            className="image-carousel"
<<<<<<< HEAD
            style={imageStyle(currentServiceImage.image, currentServiceImage.gradient)}
          >
            <button
              className="carousel-nav prev"
              type="button"
              aria-label="Imagem anterior"
              onClick={() =>
                setServiceSlide(
                  (activeServiceSlide - 1 + serviceImages.length) %
                  serviceImages.length,
                )
              }
            >
              ‹
            </button>
            <span>{currentServiceImage.label}</span>
            <button
              className="carousel-nav next"
              type="button"
              aria-label="Próxima imagem"
              onClick={() =>
                setServiceSlide((activeServiceSlide + 1) % serviceImages.length)
              }
            >
              ›
            </button>
            <div className="dots">
              {serviceImages.map((item, index) => (
                <button
                  className={index === activeServiceSlide ? 'active' : ''}
                  key={`${item.label}-${index}`}
                  type="button"
                  aria-label={`Ver ${item.label}`}
                  onClick={() => setServiceSlide(index)}
                />
              ))}
            </div>
          </div>
=======
            activeIndex={serviceSlide}
            onChangeIndex={setServiceSlide}
          />
>>>>>>> origin/main
        </div>
      </div>
    </section>
  )
}
