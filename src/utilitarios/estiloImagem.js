export function imageStyle(
  image,
  gradient = 'linear-gradient(135deg, #f3e6f1, #d080c0)',
) {
  if (!image) {
    return { backgroundImage: gradient }
  }

  return {
    backgroundImage: `linear-gradient(rgba(94, 47, 91, .18), rgba(94, 47, 91, .18)), url("${image}")`,
  }
}

export function splitLines(text = '') {
  return text.split('\n').filter(Boolean)
}
