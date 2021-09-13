export const isValidAccountName = name => {
  if (
    !name ||
    typeof name !== 'string' ||
    name.length > 12 ||
    !/[a-z]/.test(name[0])
  )
    return false

  return !/[^abcdefghijklmnopqrstuvwxyz12345.]/.test(name)
}
