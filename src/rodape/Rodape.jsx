import Marca from '../principal/Comuns/Marca/Marca'

export default function Rodape({ settings }) {
  const { brand, contact, footer } = settings

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Marca brand={brand} />
            <p className="foot-tagline">{brand.tagline}</p>
            <div className="foot-social">
              {footer.socials.map((social) => (
                <a
                  className="soc-btn"
                  href={social.href}
                  key={social.label}
                  target="_blank"
                  rel="noreferrer"
                  title={social.label}
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>
          <div className="foot-info">
            <h4>Informações</h4>
            <p>
              {brand.name} {brand.subtitle}
            </p>
            <p>CNPJ: {footer.cnpj}</p>
            <a href={contact.phoneHref}>☎ {contact.phone}</a>
            <a href={contact.whatsappHref}>☏ {contact.whatsapp}</a>
            <p>◷ {footer.hours}</p>
          </div>
          <div className="foot-map">
            {footer.mapEmbedUrl ? (
              <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={footer.mapEmbedUrl}
                title={footer.mapLabel}
              />
            ) : (
              <a
                href={footer.mapLink || '#'}
                rel="noreferrer"
                target={footer.mapLink ? '_blank' : undefined}
              >
                ⌖ {footer.mapLabel}
              </a>
            )}
          </div>
        </div>
        <div className="foot-bottom">{footer.copyright}</div>
      </div>
    </footer>
  )
}
