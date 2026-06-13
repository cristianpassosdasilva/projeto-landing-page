import { useEffect, useState } from 'react'
import { registroSecoes } from '../../registroSecoes'
import {
  deleteSection,
  getCurrentSession,
  hasSupabaseConfig,
  saveSection,
  saveSectionsOrder,
  saveSettings,
  signInAdmin,
  signOutAdmin,
  uploadLandingImage,
} from '../../servicos/conteudoService'
import { moveItem, setValueAtPath } from '../../utilitarios/caminhoObjeto'
import EditorSecaoGenerico from './editors/EditorSecaoGenerico'
import {
  AdminCard,
  AdminGroup,
  MiniButton,
  TextArea,
  TextInput,
} from './fields/AdminFields'

export default function PaginaAdmin({ data, onDataChange, onReload }) {
  const [session, setSession] = useState(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [status, setStatus] = useState('')
  const [selectedSectionId, setSelectedSectionId] = useState(data.sections[0]?.id)

  useEffect(() => {
    let isMounted = true

    getCurrentSession()
      .then((currentSession) => {
        if (isMounted) {
          setSession(currentSession)
          setIsCheckingSession(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsCheckingSession(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (!hasSupabaseConfig) {
    return <SupabaseSetup />
  }

  if (isCheckingSession) {
    return <AdminShell title="Carregando admin..." />
  }

  if (!session) {
    return <LoginForm onLogin={setSession} />
  }

  const selectedSection =
    data.sections.find((section) => section.id === selectedSectionId) ||
    data.sections[0]

  async function runAction(action, successMessage) {
    try {
      setStatus('Salvando...')
      await action()
      setStatus(successMessage)
    } catch (error) {
      setStatus(error.message)
    }
  }

  function updateSettings(path, value) {
    onDataChange({
      ...data,
      settings: setValueAtPath(data.settings, path, value),
    })
  }

  function updateSection(nextSection) {
    onDataChange({
      ...data,
      sections: data.sections.map((section) =>
        section.id === nextSection.id ? nextSection : section,
      ),
    })
  }

  function reorderSection(sectionId, direction) {
    const currentIndex = data.sections.findIndex((section) => section.id === sectionId)
    const nextIndex = currentIndex + direction

    if (nextIndex < 0 || nextIndex >= data.sections.length) {
      return
    }

    const reorderedSections = moveItem(data.sections, currentIndex, nextIndex).map(
      (section, index) => ({ ...section, order_index: index }),
    )

    onDataChange({ ...data, sections: reorderedSections })
    runAction(
      () => saveSectionsOrder(reorderedSections),
      'Ordem das seções salva.',
    )
  }

  function removeSection(sectionId) {
    const sections = data.sections
      .filter((section) => section.id !== sectionId)
      .map((section, index) => ({ ...section, order_index: index }))
    onDataChange({ ...data, sections })
    setSelectedSectionId(sections[0]?.id)
    runAction(async () => {
      await deleteSection(sectionId)
      await saveSectionsOrder(sections)
    }, 'Bloco removido.')
  }

  async function handleUpload(file) {
    setStatus('Enviando imagem...')
    const url = await uploadLandingImage(file)
    setStatus('Imagem enviada.')
    return url
  }

  return (
    <main className="admin-page">
      <header className="admin-top">
        <div>
          <span className="sec-label">Admin seguro</span>
          <h1>Editar landing page</h1>
          <p>Conteúdo salvo no Supabase com autenticação e regras RLS.</p>
          {status ? <p className="admin-status">{status}</p> : null}
        </div>
        <div className="admin-actions">
          <a className="btn btn-outline" href="#site">
            Ver site
          </a>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => onReload({ includeDisabled: true })}
          >
            Recarregar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={async () => {
              await signOutAdmin()
              setSession(null)
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <div className="admin-shell">
        <aside className="admin-tabs section-list">
          <button
            className={selectedSectionId === 'settings' ? 'active' : ''}
            type="button"
            onClick={() => setSelectedSectionId('settings')}
          >
            Configurações
          </button>
          {data.sections.map((section) => (
            <button
              className={selectedSectionId === section.id ? 'active' : ''}
              key={section.id}
              type="button"
              onClick={() => setSelectedSectionId(section.id)}
            >
              {section.enabled ? '●' : '○'} {registroSecoes[section.type]?.label || section.type}
            </button>
          ))}
        </aside>

        <section className="admin-panel">
          {selectedSectionId === 'settings' ? (
            <SettingsEditor
              settings={data.settings}
              updateSettings={updateSettings}
              onSave={() =>
                runAction(() => saveSettings(data.settings), 'Configurações salvas.')
              }
            />
          ) : null}

          {selectedSection && selectedSectionId !== 'settings' ? (
            <AdminGroup
              title={`Bloco: ${registroSecoes[selectedSection.type]?.label || selectedSection.type}`}
              action={
                <div className="section-actions">
                  <MiniButton onClick={() => reorderSection(selectedSection.id, -1)}>
                    Subir
                  </MiniButton>
                  <MiniButton onClick={() => reorderSection(selectedSection.id, 1)}>
                    Descer
                  </MiniButton>
                  <MiniButton
                    className="ghost"
                    onClick={() => {
                      const nextSection = {
                        ...selectedSection,
                        enabled: !selectedSection.enabled,
                      }
                      updateSection(nextSection)
                      runAction(() => saveSection(nextSection), 'Visibilidade salva.')
                    }}
                  >
                    {selectedSection.enabled ? 'Desativar' : 'Ativar'}
                  </MiniButton>
                  <MiniButton className="danger" onClick={() => removeSection(selectedSection.id)}>
                    Remover
                  </MiniButton>
                </div>
              }
            >
              <EditorSecaoGenerico
                onChange={updateSection}
                onUpload={handleUpload}
                section={selectedSection}
              />
              <MiniButton
                onClick={() =>
                  runAction(() => saveSection(selectedSection), 'Bloco salvo.')
                }
              >
                Salvar bloco
              </MiniButton>
            </AdminGroup>
          ) : null}
        </section>
      </div>
    </main>
  )
}

function AdminShell({ title, children }) {
  return (
    <main className="admin-page">
      <header className="admin-top">
        <div>
          <span className="sec-label">Admin</span>
          <h1>{title}</h1>
          {children}
        </div>
      </header>
    </main>
  )
}

function SupabaseSetup() {
  return (
    <AdminShell title="Supabase não configurado">
      <p>Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no `.env`.</p>
    </AdminShell>
  )
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      const session = await signInAdmin(email, password)
      onLogin(session)
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  return (
    <main className="admin-page login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="sec-label">Admin</span>
        <h1>Entrar</h1>
        <TextInput label="E-mail" value={email} onChange={setEmail} />
        <label className="field">
          <span>Senha</span>
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Acessar admin
        </button>
        {error ? <p className="form-status error">{error}</p> : null}
      </form>
    </main>
  )
}

function SettingsEditor({ settings, updateSettings, onSave }) {
  return (
    <AdminGroup title="Configurações globais" action={<MiniButton onClick={onSave}>Salvar</MiniButton>}>
      <AdminCard>
        <TextInput label="Nome da marca" value={settings.brand.name} onChange={(value) => updateSettings(['brand', 'name'], value)} />
        <TextInput label="Subtítulo" value={settings.brand.subtitle} onChange={(value) => updateSettings(['brand', 'subtitle'], value)} />
        <TextInput label="Frase curta" value={settings.brand.tagline} onChange={(value) => updateSettings(['brand', 'tagline'], value)} />
      </AdminCard>
      <AdminCard>
        <TextInput label="Telefone" value={settings.contact.phone} onChange={(value) => updateSettings(['contact', 'phone'], value)} />
        <TextInput label="Link telefone" value={settings.contact.phoneHref} onChange={(value) => updateSettings(['contact', 'phoneHref'], value)} />
        <TextInput label="WhatsApp" value={settings.contact.whatsapp} onChange={(value) => updateSettings(['contact', 'whatsapp'], value)} />
        <TextInput label="Link WhatsApp" value={settings.contact.whatsappHref} onChange={(value) => updateSettings(['contact', 'whatsappHref'], value)} />
      </AdminCard>
      <AdminCard>
        <TextInput label="CNPJ" value={settings.footer.cnpj} onChange={(value) => updateSettings(['footer', 'cnpj'], value)} />
        <TextInput label="Horário" value={settings.footer.hours} onChange={(value) => updateSettings(['footer', 'hours'], value)} />
        <TextInput label="Texto do mapa" value={settings.footer.mapLabel} onChange={(value) => updateSettings(['footer', 'mapLabel'], value)} />
        <TextInput label="URL embed do Google Maps" value={settings.footer.mapEmbedUrl} onChange={(value) => updateSettings(['footer', 'mapEmbedUrl'], value)} />
        <TextInput label="Link público do mapa" value={settings.footer.mapLink} onChange={(value) => updateSettings(['footer', 'mapLink'], value)} />
        <TextArea label="Copyright" value={settings.footer.copyright} onChange={(value) => updateSettings(['footer', 'copyright'], value)} />
      </AdminCard>
    </AdminGroup>
  )
}
