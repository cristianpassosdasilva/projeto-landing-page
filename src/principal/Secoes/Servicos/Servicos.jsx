import { useState } from 'react'
import TituloSecao from '../../Comuns/TituloSecao/TituloSecao'
import Carrossel from '../../Comuns/Carrossel/Carrossel'

export default function Servicos({ props }) {
  const [serviceSlide, setServiceSlide] = useState(0)
  const serviceImages = props.images.length
    ? props.images
    : [
        {
          label: 'Imagem do serviço',
          image: '',
          gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
        },
      ]

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
            activeIndex={serviceSlide}
            onChangeIndex={setServiceSlide}
          />
        </div>
      </div>
    </section>
  )
}
