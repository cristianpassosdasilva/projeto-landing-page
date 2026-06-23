import { useEffect, useRef, useState } from 'react'; // importa React, hooks e ref
import TituloSecao from '../../Comuns/TituloSecao/TituloSecao';
import './Galeria_module.css'; // importa o CSS local da galeria

// componente Galeria: bloco autoridade com carousel automático de miniaturas
export default function Galeria({ props }) {
    const safeProps = props || {}
    const circlePhoto = safeProps.image || ''
    const thumbs = (safeProps.items || [])
        .map((item) => item.image)
        .filter(Boolean) // só as miniaturas que já têm imagem enviada pelo admin
    const [index, setIndex] = useState(0) // controle do slide atual do carousel
    const refs = useRef([]) // refs para as miniaturas
    const intervalRef = useRef(null) // ref para o intervalo automático
    const [modalIndex, setModalIndex] = useState(null) // índice da imagem aberta no modal (null = fechado)
    const sectionRef = useRef(null) // ref da seção para observar visibilidade
    const trackRef = useRef(null) // ref da faixa de miniaturas para scroll horizontal
    const [isVisible, setIsVisible] = useState(false) // se a seção está visível na viewport

    // padroniza props do cabeçalho usando o mesmo padrão das outras seções
    const {
        label = 'NOSSO TRABALHO',
        title = '',
        highlight = 'Somos assim...',
        subtitle = 'Nós entendemos de beleza porque vivemos ela com você. Experiências personalizadas para sua beleza e bem-estar.',
    } = safeProps

    // função para avançar o carousel
    function next() {
        if (thumbs.length === 0) return
        setIndex((i) => (i + 1) % thumbs.length)
    }

    // função para retroceder o carousel
    function prev() {
        if (thumbs.length === 0) return
        setIndex((i) => (i - 1 + thumbs.length) % thumbs.length)
    }

    // centralizar miniatura ativa usando scroll horizontal do container (não faz scroll da página)
    useEffect(() => {
        const el = refs.current[index]
        const track = trackRef.current
        if (!el || !track) return
        const elCenter = el.offsetLeft + el.offsetWidth / 2
        const targetScroll = elCenter - track.clientWidth / 2
        track.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }, [index])

    // autoplay a cada 5 segundos; inicia apenas quando a seção estiver visível e o modal fechado
    useEffect(() => {
        clearInterval(intervalRef.current)
        if (isVisible && modalIndex === null && thumbs.length > 1) {
            intervalRef.current = setInterval(next, 5000)
        }
        return () => clearInterval(intervalRef.current)
    }, [isVisible, modalIndex, thumbs.length])

    // pausar autoplay ao passar o mouse
    function pause() {
        clearInterval(intervalRef.current)
    }

    function resume() {
        clearInterval(intervalRef.current)
        if (modalIndex === null && thumbs.length > 1) intervalRef.current = setInterval(next, 5000)
    }

    // funções do modal
    function openModal(i) {
        pause()
        setModalIndex(i)
    }

    function closeModal() {
        setModalIndex(null)
        resume()
    }

    function nextModal() {
        if (thumbs.length === 0) return
        setModalIndex((i) => (i + 1) % thumbs.length)
    }

    function prevModal() {
        if (thumbs.length === 0) return
        setModalIndex((i) => (i - 1 + thumbs.length) % thumbs.length)
    }

    // teclado para navegar no modal
    useEffect(() => {
        function onKey(e) {
            if (modalIndex === null) return
            if (e.key === 'Escape') closeModal()
            if (e.key === 'ArrowRight') nextModal()
            if (e.key === 'ArrowLeft') prevModal()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [modalIndex])

    // IntersectionObserver para detectar quando a seção entra na viewport
    useEffect(() => {
        if (!sectionRef.current) return
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.25)
            })
        }, { threshold: [0, 0.25, 0.5] })
        obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section ref={sectionRef} id="galeria" className="section gallery-section"> {/* seção padrão */}
            <div className="wrap gallery-layout"> {/* container */}
                <div className="authority-work-section"> {/* bloco com imagem circular */}
                    <div className="authority-work-layout">
                        <div className="author-right"> {/* imagem agora à esquerda visualmente via CSS invertido */}
                            {circlePhoto ? (
                                <div className="circle-photo-wrap">
                                    <img className="circle-photo" src={circlePhoto} alt="Laud's" />
                                </div>
                            ) : null}
                        </div>

                        <div className="author-left"> {/* texto à direita */}
                            <TituloSecao label={label} title={title} highlight={highlight} subtitle={subtitle} />
                        </div>
                    </div>

                    {thumbs.length > 0 ? (
                        <div className="thumbs-carousel" onMouseEnter={pause} onMouseLeave={resume}> {/* carousel de miniaturas */}
                            <button className="carousel-nav prev" onClick={prev} aria-label="Anterior">‹</button>
                            <div ref={trackRef} className="thumbs-track"> {/* faixa rolável */}
                                {thumbs.map((src, i) => (
                                    <div
                                        key={i}
                                        className={`thumb-item ${i === index ? 'active' : ''}`}
                                        ref={(el) => (refs.current[i] = el)}
                                        onClick={() => openModal(i)}
                                    >
                                        <img src={src} alt={`Thumb ${i + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-nav next" onClick={next} aria-label="Próxima">›</button>
                        </div>
                    ) : null}
                </div>
            </div>
            {modalIndex !== null && thumbs.length > 0 && (
                <div
                    className="modal-overlay"
                    onClick={(e) => { if (e.target.classList && e.target.classList.contains('modal-overlay')) closeModal() }}
                >
                    <div className="modal-inner" role="dialog" aria-modal="true">
                        <button className="modal-close" onClick={closeModal} aria-label="Fechar">✕</button>
                        <button className="modal-prev" onClick={prevModal} aria-label="Anterior">‹</button>
                        <div className="modal-content">
                            <img src={thumbs[modalIndex]} alt={`Imagem ${modalIndex + 1}`} />
                        </div>
                        <button className="modal-next" onClick={nextModal} aria-label="Próxima">›</button>
                    </div>
                </div>
            )}
        </section>
    )
}
