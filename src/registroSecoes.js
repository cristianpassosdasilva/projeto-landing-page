import ChamadaAcao from './principal/Secoes/ChamadaAcao/ChamadaAcao'
import Contato from './principal/Secoes/Contato/Contato'
import Depoimentos from './principal/Secoes/Depoimentos/Depoimentos'
import DestaqueInicial from './principal/Secoes/DestaqueInicial/DestaqueInicial'
import Galeria from './principal/Secoes/Galeria/Galeria'
import Historia from './principal/Secoes/Historia/Historia'
import PerguntasFrequentes from './principal/Secoes/PerguntasFrequentes/PerguntasFrequentes'
import Servicos from './principal/Secoes/Servicos/Servicos'
import Sobre from './principal/Secoes/Sobre/Sobre'

export const registroSecoes = {
  hero: {
    label: 'Destaque inicial',
    component: DestaqueInicial,
    defaultProps: {
      badge: 'Nova chamada',
      title: 'Título principal',
      highlight: 'Destaque',
      subtitle: 'Texto de apoio da seção principal.',
      primaryCta: 'Agendar agora',
      secondaryCta: 'Ver serviços',
      image: '',
    },
  },
  about: {
    label: 'Texto institucional',
    component: Sobre,
    defaultProps: {
      label: 'Quem somos',
      title: 'Título da seção',
      highlight: 'destaque',
      text: 'Texto da seção institucional.',
    },
  },
  services: {
    label: 'Serviços',
    component: Servicos,
    defaultProps: {
      label: 'O que fazemos',
      title: 'Nossos serviços',
      subtitle: 'Descreva os serviços oferecidos.',
      items: [{ icon: '✨', label: 'Novo serviço' }],
      images: [
        {
          label: 'Imagem do serviço',
          image: '',
          gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
        },
      ],
    },
  },
  gallery: {
    label: 'Galeria',
    component: Galeria,
    defaultProps: {
      label: 'Nosso trabalho',
      title: 'Galeria',
      subtitle: 'Veja alguns registros.',
      items: [{ label: 'Nova imagem', image: '', wide: false }],
    },
  },
  history: {
    label: 'História',
    component: Historia,
    defaultProps: {
      label: 'Nossa trajetória',
      title: 'Título da história',
      heading: 'Chamada',
      highlight: 'Destaque',
      paragraphs: ['Primeiro parágrafo da história.'],
      imageLabel: 'Foto',
      image: '',
    },
  },
  testimonials: {
    label: 'Depoimentos',
    component: Depoimentos,
    defaultProps: {
      label: 'Clientes reais',
      title: 'Experiências reais,',
      highlight: 'resultados incríveis',
      ratingText: '5.0 nas avaliações',
      items: [
        {
          initial: 'C',
          name: 'Cliente',
          location: 'Cidade - UF',
          quote: 'Novo depoimento.',
        },
      ],
    },
  },
  faq: {
    label: 'FAQ',
    component: PerguntasFrequentes,
    defaultProps: {
      label: 'Dúvidas',
      title: 'Você pode querer saber',
      cta: 'Ainda ficou com alguma dúvida? Fale conosco!',
      items: [{ question: 'Nova pergunta?', answer: 'Nova resposta.' }],
    },
  },
  contact: {
    label: 'Contato',
    component: Contato,
    defaultProps: {
      label: 'Fale conosco',
      title: 'O primeiro passo para',
      highlight: 'sua transformação',
      subtitle: 'Fale com quem entende de beleza',
      phone: '(34) 3261-4709',
      phoneHref: 'tel:3432614709',
      whatsapp: '(34) 9 9643-4420',
      whatsappHref: 'https://wa.me/5534996434420',
      subjects: ['Corte de cabelo', 'Maquiagem', 'Outro'],
    },
  },
  cta: {
    label: 'Chamada',
    component: ChamadaAcao,
    defaultProps: {
      label: 'Chamada',
      title: 'Pronta para se transformar?',
      text: 'Agende seu horário agora.',
      buttonText: 'Falar no WhatsApp',
      href: '#contato',
    },
  },
}

export function createSection(type, orderIndex) {
  const registryItem = registroSecoes[type]

  return {
    id: crypto.randomUUID(),
    type,
    order_index: orderIndex,
    enabled: true,
    props: JSON.parse(JSON.stringify(registryItem.defaultProps)),
  }
}
