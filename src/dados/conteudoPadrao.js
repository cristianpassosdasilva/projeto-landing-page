import { defaultContent } from '../content'

export const defaultSiteSettings = {
  id: 'default',
  brand: defaultContent.brand,
  contact: defaultContent.contact,
  footer: defaultContent.footer,
}

export const defaultSections = [
  {
    id: 'hero-default',
    type: 'hero',
    order_index: 0,
    enabled: true,
    props: defaultContent.hero,
  },
  {
    id: 'about-default',
    type: 'about',
    order_index: 1,
    enabled: true,
    props: defaultContent.about,
  },
  {
    id: 'services-default',
    type: 'services',
    order_index: 2,
    enabled: true,
    props: defaultContent.services,
  },
  {
    id: 'gallery-default',
    type: 'gallery',
    order_index: 3,
    enabled: true,
    props: defaultContent.gallery,
  },
  {
    id: 'history-default',
    type: 'history',
    order_index: 4,
    enabled: true,
    props: defaultContent.history,
  },
  {
    id: 'testimonials-default',
    type: 'testimonials',
    order_index: 5,
    enabled: true,
    props: defaultContent.testimonials,
  },
  {
    id: 'faq-default',
    type: 'faq',
    order_index: 6,
    enabled: true,
    props: defaultContent.faq,
  },
  {
    id: 'contact-default',
    type: 'contact',
    order_index: 7,
    enabled: true,
    props: defaultContent.contact,
  },
]

export const defaultLandingData = {
  settings: defaultSiteSettings,
  sections: defaultSections,
}
