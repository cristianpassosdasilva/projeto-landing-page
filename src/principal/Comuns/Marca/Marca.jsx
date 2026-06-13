export default function Marca({ brand }) {
  return (
    <div className="brand-mark">
      <div className="logo-text">{brand.name}</div>
      <span className="logo-sub">{brand.subtitle}</span>
    </div>
  )
}
