import './Chamada_module.css';
import TextoFormatado from '../../../utilitarios/textoFormatado';

function SecaoChamada({ props }) {
    const isCtaFinal = 'buttonText' in (props || {}) || 'href' in (props || {});

    if (isCtaFinal) {
        const { title, text, buttonText, href } = props || {};

        return (
            <div className="pagina-lauds">
                <main className="main-lauds">
                    <section className="secao-chamada secao-chamada-simples" aria-label="Chamada final">
                        <div className="col-esquerda">
                            <div className="texto-bloco">
                                {title ? <h2 className="chamada-title"><TextoFormatado texto={title} /></h2> : null}
                                {text ? <p className="chamada-subtitle"><TextoFormatado texto={text} /></p> : null}
                            </div>
                        </div>
                        {buttonText ? (
                            <div className="botoes">
                                <div className="botao-caixa">
                                    <a href={href || '#contato'} className="botao botao-agendar">
                                        {buttonText}
                                    </a>
                                </div>
                            </div>
                        ) : null}
                    </section>
                </main>
            </div>
        );
    }

    const { badge, title, highlight, subtitle, primaryCta, secondaryCta, image } = props || {};

    return (
        <div className="pagina-lauds">
            <main className="main-lauds">
                <section className="secao-chamada" aria-label="Seção de chamada principal">
                    <div className="col-esquerda">
                        <div className="texto-bloco">
                            {badge ? <span className="chamada-badge"><TextoFormatado texto={badge} /></span> : null}
                            {title ? <h1 className="chamada-title"><TextoFormatado texto={title} /></h1> : null}
                            {highlight ? <span className="chamada-highlight"><TextoFormatado texto={highlight} /></span> : null}
                            {subtitle ? <p className="chamada-subtitle"><TextoFormatado texto={subtitle} /></p> : null}
                        </div>
                    </div>

                    <div className="col-direita">
                        <img src={image} alt="Mulher com cabelo estilizado" />
                        <div className="botoes">
                            {primaryCta ? (
                                <div className="botao-caixa">
                                    <a href="#contato" className="botao botao-agendar">
                                        {primaryCta}
                                    </a>
                                </div>
                            ) : null}
                            {secondaryCta ? (
                                <div className="botao-caixa">
                                    <a href="#servicos" className="botao botao-servicos">
                                        {secondaryCta}
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default SecaoChamada;
