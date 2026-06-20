import { imageStyle } from '../../../utilitarios/estiloImagem'

export default function Historia({ props }) {
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
                    <div className='history-image' style={imageStyle(props.image)}>
                        <span>{props.imageLabel}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
