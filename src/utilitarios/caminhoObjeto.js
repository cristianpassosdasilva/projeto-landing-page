export function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function getValueAtPath(source, path) {
  return path.reduce((current, key) => current?.[key], source)
}

export function setValueAtPath(source, path, value) {
  const next = clone(source)
  let current = next

  path.slice(0, -1).forEach((key) => {
    current = current[key]
  })

  current[path[path.length - 1]] = value
  return next
}

export function moveItem(items, fromIndex, toIndex) {
  const next = [...items]
  const [item] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, item)
  return next
}
