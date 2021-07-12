export const getUALError = error => {
  return error?.message.replace('assertion failure with message: ', '')
}
