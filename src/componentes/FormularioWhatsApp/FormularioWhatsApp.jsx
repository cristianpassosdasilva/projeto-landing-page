import { useState } from 'react'

export default function FormularioWhatsApp({ subjects, whatsappHref }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const whatsappMessage = [
      "Olá, vim pelo site da Laud's.",
      '',
      `Nome: ${formData.get('name')}`,
      `Telefone: ${formData.get('phone')}`,
      `E-mail: ${formData.get('email') || 'Não informado'}`,
      `Assunto: ${formData.get('subject')}`,
      `Mensagem: ${formData.get('message')}`,
    ].join('\n')
    const separator = whatsappHref.includes('?') ? '&' : '?'

    window.open(
      `${whatsappHref}${separator}text=${encodeURIComponent(whatsappMessage)}`,
      '_blank',
      'noopener,noreferrer',
    )
    setSent(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-col">
          <input
            className="input"
            name="name"
            placeholder="Seu nome completo"
            required
            type="text"
          />
          <input
            className="input"
            name="phone"
            placeholder="+55 ( ) _____-____"
            required
            type="tel"
          />
          <input
            className="input"
            name="email"
            placeholder="Seu e-mail"
            type="email"
          />
          <select className="input" defaultValue="" name="subject" required>
            <option value="" disabled>
              Selecione um assunto
            </option>
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <textarea
          className="input"
          name="message"
          placeholder="Sua mensagem"
          required
        />
      </div>
      <div className="form-submit">
        <button className="btn btn-primary" type="submit">
          Enviar mensagem
        </button>
      </div>
      {sent ? (
        <p className="form-status">Abrindo WhatsApp com sua mensagem...</p>
      ) : null}
    </form>
  )
}
