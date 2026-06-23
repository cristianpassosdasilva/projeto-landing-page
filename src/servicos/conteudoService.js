import { defaultLandingData, defaultSiteSettings } from '../dados/conteudoPadrao'
import { hasSupabaseConfig, supabase } from './supabaseClient'

export { hasSupabaseConfig }

const SETTINGS_ID = 'default'
const IMAGE_BUCKET = 'landing-images'

function normalizeSections(sections) {
  return [...sections].sort((first, second) => first.order_index - second.order_index)
}

export async function getLandingData({ includeDisabled = false } = {}) {
  if (!hasSupabaseConfig) {
    return {
      ...defaultLandingData,
      source: 'fallback',
      error:
        'Supabase não configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.',
    }
  }

  const [settingsResponse, sectionsResponse] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', SETTINGS_ID).single(),
    supabase
      .from('landing_sections')
      .select('*')
      .order('order_index', { ascending: true })
      .then((response) => {
        if (includeDisabled || response.error) {
          return response
        }

        return {
          ...response,
          data: response.data.filter((section) => section.enabled),
        }
      }),
  ])

  if (settingsResponse.error || sectionsResponse.error) {
    return {
      ...defaultLandingData,
      source: 'fallback',
      error:
        settingsResponse.error?.message ||
        sectionsResponse.error?.message ||
        'Não foi possível carregar o conteúdo do Supabase.',
    }
  }

  return {
    settings: settingsResponse.data || defaultSiteSettings,
    sections: normalizeSections(sectionsResponse.data || []),
    source: 'supabase',
    error: null,
  }
}

export async function getCurrentSession() {
  if (!hasSupabaseConfig) {
    return null
  }

  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function signInAdmin(email, password) {
  if (!hasSupabaseConfig) {
    throw new Error('Configure o Supabase antes de acessar o admin.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data.session
}

export async function signOutAdmin() {
  if (hasSupabaseConfig) {
    await supabase.auth.signOut()
  }
}

export async function saveSettings(settings) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ ...settings, id: SETTINGS_ID, updated_at: new Date().toISOString() })

  if (error) {
    throw error
  }
}

export async function saveSection(section) {
  const { error } = await supabase.from('landing_sections').upsert({
    ...section,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    throw error
  }
}

export async function deleteSection(sectionId) {
  const { error } = await supabase.from('landing_sections').delete().eq('id', sectionId)

  if (error) {
    throw error
  }
}

export async function saveSectionsOrder(sections) {
  await Promise.all(
    sections.map((section, index) =>
      saveSection({ ...section, order_index: index }),
    ),
  )
}

export async function fetchGoogleReviews() {
  const { data, error } = await supabase.functions.invoke('google-reviews')

  if (error) {
    throw new Error(error.message || 'Não foi possível buscar as avaliações do Google.')
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  return data
}

export async function uploadLandingImage(file) {
  const extension = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
