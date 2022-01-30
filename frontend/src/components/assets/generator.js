export const generatePassword = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()'
  let val = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    val += charset.charAt(Math.floor(Math.random() * n))
  }
  return val
}