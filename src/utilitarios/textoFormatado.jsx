export default function TextoFormatado({ texto }) {
  if (!texto) return null

  const partes = String(texto).split(/\*\*(.+?)\*\*/g)

  return partes.map((parte, index) =>
    index % 2 === 1 ? <strong key={index}>{parte}</strong> : parte
  )
}
