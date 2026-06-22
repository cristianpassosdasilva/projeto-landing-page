import FormularioWhatsApp from '../../../componentes/FormularioWhatsApp/FormularioWhatsApp'

export default function Contato({props}) {
  return (
    <section id='contato' className='section contact-section'>
        <div className='wrap narrow'>
            <span className='sec-label centered'>{props.label}</span>
            <h2>
                {props.title}
                <br />
                <span className='gradtext'>{props.highlight}</span>
            </h2>
            <p className='contact-subtitle'>
                {props.subtitle}
                <br />
                <a href="{props.phoneHref}">☎ {props.phone}</a>
                <span> | </span>
                <a href="{props.whatsappHref}">☏ {props.whatsapp}</a>
            </p>
            <FormularioWhatsApp 
                subjects={props.subjects}
                whatsappHref={props.whatsappHref}
            />
        </div>
    </section>
  )
}
