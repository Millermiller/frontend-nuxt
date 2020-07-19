import axios from 'axios'
import Vue from 'vue'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.BROWSER_BASE_URL
      : 'https://api.scandinaver.org',
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers.common.Authorization = window.$nuxt.$auth.$storage.getCookie(
      'authfrontend._token.local',
    )
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export default service
