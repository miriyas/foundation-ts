export const getEnv = (): string => {
  const l = window.location
  if (l.hostname.includes('netlify')) return 'prod'
  return 'dev'
}

export const getGaKey = (): string => {
  const env = getEnv()
  if (env === 'prod') return process.env.REACT_APP_GA_KEY_PROD ?? ''
  return process.env.REACT_APP_GA_KEY_DEV ?? ''
}
