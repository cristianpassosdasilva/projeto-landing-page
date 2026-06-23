import TituloSecao from '../../Comuns/TituloSecao/TituloSecao'
// import './AutoridadeQuemSomos_module.css'

export default function AutoridadeQuemSomos({ props }) {
    const safeProps = props || {}
    const {
        label = 'Quem somos',
        title = 'Não somos apenas um',
        highlight = 'salão de beleza',
        subtitle = 'Somos um espaço premium onde técnica, acolhimento e sofisticação se encontram.',
        text = '.',
        image = '',
        highlights = ['Atendimento personalizado', 'Equipe especializada', 'Resultados sofisticados', 'Ambiente acolhedor e famiiliar'],
    } = safeProps

    const paragraphs = Array.isArray(safeProps.paragraphs)
        ? safeProps.paragraphs.filter(Boolean)
        : [text].filter(Boolean)

    const highlightItems = Array.isArray(highlights) ? highlights.filter(Boolean) : []

    return (
        <section
            id="historia"
            className="section about-section"
        >
            <div className="wrap about-layout">
                <div className="about-copy">
                    <TituloSecao label={label} title={title} highlight={highlight} subtitle={subtitle} />
                    <div className="about-text-block">
                        {paragraphs.map((paragraph, index) => (
                            <p key={`${paragraph}-${index}`}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="about-highlights" aria-label="Principais diferenciais">
                        {highlightItems.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
