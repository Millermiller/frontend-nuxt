import axios from 'axios'
import cookieUniversal from 'cookie-universal'
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.BROWSER_BASE_URL
      : 'https://api.scandinaver.org',
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const options = { parseJson: true }
    const Cookies = cookieUniversal(undefined, undefined, options.parseJson)
    config.headers.common.Authorization = Cookies.get(
      'authfrontend._token.local'
    )
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default service
