import Marca from '../principal/Comuns/Marca/Marca'

const links = [
  ['#servicos', 'Serviços'],
  ['#galeria', 'Galeria'],
  ['#historia', 'Sobre'],
  ['#depoimentos', 'Depoimentos'],
  ['#contato', 'Contato'],
]

export default function Cabecalho({ brand }) {
  return (
    <nav className="site-nav">
      <div className="wrap nav-in">
        <Marca brand={brand} />
        <div className="nav-links">
          {links.map(([href, label]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
          <a href="#contato" className="btn btn-primary">
            Agendar
          </a>
          <a href="#admin" className="admin-link">
            Admin
          </a>
        </div>
      </div>
    </nav>
  )
}
