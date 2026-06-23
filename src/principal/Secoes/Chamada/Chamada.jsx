import './Chamada_module.css';

function SecaoChamada({ props }) {
    const image = props?.image;

    return (
        <div className="pagina-lauds">
            <main className="main-lauds">
                <section className="secao-chamada" aria-label="Seção de chamada principal">
                    <div className="col-esquerda">
                        <span className="nao-e">NÃO É</span>
                        <span className="apenas">APENAS</span>
                        <span className="um">UM</span>
                        <span className="salao">SALÃO,</span>
                        <span className="e-o-seu">É O SEU</span>
                        <span className="novo">NOVO</span>
                        <span className="momento">MOMENTO.</span>
                        <span className="sinta-se">SINTA-SE</span>
                        <span className="incrivel">INCRÍVEL</span>
                        <span className="hoje">HOJE.</span>

                    </div>

                    <div className="col-direita">
                        <img src={image} alt="Mulher com cabelo estilizado" />
                        <div className="botoes">
                            <div className="botao-caixa">
                                <a href="#contato" className="botao botao-agendar">
                                    Agendar agora
                                </a>
                            </div>
                            <div className="botao-caixa">
                                <a href="#servicos" className="botao botao-servicos">
                                    Ver serviços
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default SecaoChamada;
