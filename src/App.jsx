import { useEffect, useState } from 'react'
import Cabecalho from './cabecalho/Cabecalho'
import PaginaAdmin from './componentes/Admin/PaginaAdmin'
import IconeWhatsApp from './componentes/IconeWhatsApp/IconeWhatsApp'
import Principal from './principal/Principal'
import Rodape from './rodape/Rodape'
import { getLandingData } from './servicos/conteudoService'

function getCurrentView() {
  return window.location.hash === '#admin' ? 'admin' : 'site'
}

export default function App() {
  const [view, setView] = useState(getCurrentView)
  const [landingData, setLandingData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  async function loadData(options = {}) {
    setIsLoading(true)
    const data = await getLandingData({
      includeDisabled: options.includeDisabled || getCurrentView() === 'admin',
    })
    setLandingData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    getLandingData({ includeDisabled: getCurrentView() === 'admin' }).then((data) => {
      if (isMounted) {
        setLandingData(data)
        setIsLoading(false)
      }
    })

    function syncHash() {
      const nextView = getCurrentView()
      setView(nextView)

      if (window.location.hash === '#site') {
        window.location.hash = ''
      }

      loadData({ includeDisabled: nextView === 'admin' })
    }

    window.addEventListener('hashchange', syncHash)
    return () => {
      isMounted = false
      window.removeEventListener('hashchange', syncHash)
    }
  }, [])

  if (isLoading || !landingData) {
    return <div className="app-loading">Carregando landing...</div>
  }

  if (view === 'admin') {
    return (
      <PaginaAdmin
        data={landingData}
        onDataChange={setLandingData}
        onReload={loadData}
      />
    )
  }

  return (
    <>
      {landingData.error ? (
        <div className="fallback-alert">{landingData.error}</div>
      ) : null}
      <Cabecalho brand={landingData.settings.brand} />
      <Principal sections={landingData.sections} />
      <Rodape settings={landingData.settings} />
      <a
        className="whatsapp-btn"
        href={landingData.settings.contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <IconeWhatsApp className="whatsapp-icon" />
      </a>
    </>
  )
}
