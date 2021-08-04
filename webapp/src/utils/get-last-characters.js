export const getLastCharacters = (text, length = 6) => {
  if (!text) {
    return ''
  }

  return text.substr(text.length - length, length)
}
