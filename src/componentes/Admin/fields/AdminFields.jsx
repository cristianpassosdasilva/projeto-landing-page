export function AdminGroup({ title, action, children }) {
  return (
    <div className="admin-group">
      <div className="admin-group-head">
        <h2>{title}</h2>
        {action}
      </div>
      <div className="admin-fields">{children}</div>
    </div>
  )
}

export function AdminCard({ children }) {
  return <div className="admin-card">{children}</div>
}

export function TextInput({ label, value = '', onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export function TextArea({ label, value = '', onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export function RatingInput({ label, value = 5, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {[1, 2, 3, 4, 5].map((option) => (
          <option key={option} value={option}>
            {'★'.repeat(option)}
            {'☆'.repeat(5 - option)}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CheckboxInput({ label, value = false, onChange }) {
  return (
    <label className="check-field">
      <input
        checked={value}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

export function MiniButton({ children, className = '', ...props }) {
  return (
    <button className={`mini-btn ${className}`} type="button" {...props}>
      {children}
    </button>
  )
}

export function ImageInput({ label, value = '', onChange, onUpload }) {
  async function handleFile(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (onUpload) {
      const url = await onUpload(file)
      onChange(url)
      return
    }

    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="image-field">
      <TextInput label={`${label} (URL)`} value={value} onChange={onChange} />
      <div className="image-tools">
        <label className="file-btn">
          Enviar arquivo
          <input accept="image/*" type="file" onChange={handleFile} />
        </label>
        <MiniButton className="ghost" onClick={() => onChange('')}>
          Limpar
        </MiniButton>
      </div>
      {value ? <img src={value} alt="" /> : null}
    </div>
  )
}
