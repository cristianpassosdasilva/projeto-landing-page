import { useState } from 'react'
import Marca from '../principal/Comuns/Marca/Marca'

const links = [
  ['#servicos', 'Serviços'],
  ['#galeria', 'Galeria'],
  ['#historia', 'Sobre'],
  ['#depoimentos', 'Depoimentos'],
  ['#contato', 'Contato'],
]

export default function Cabecalho({ brand }) {
  const [menuAberto, setMenuAberto] = useState(false)

  function navegarParaSecao(event, href) {
    event.preventDefault()
    const section = document.getElementById(href.replace('#', ''))
    setMenuAberto(false)
    window.requestAnimationFrame(() => {
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    window.history.pushState(null, '', href)
  }

  return (
    <nav className="site-nav">
      <div className="wrap nav-in">
        <div className="nav-top">
          <Marca brand={brand} />
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>
        <div className={`nav-links${menuAberto ? ' open' : ''}`}>
          {links.map(([href, label]) => (
            <a href={href} key={href} onClick={(event) => navegarParaSecao(event, href)}>
              {label}
            </a>
          ))}
          <a
            href="#contato"
            className="btn btn-primary"
            onClick={(event) => navegarParaSecao(event, '#contato')}
          >
            Agendar
          </a>
          <a
            href="#admin"
            className="admin-link"
            onClick={() => setMenuAberto(false)}
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  )
}
