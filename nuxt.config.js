import { messages } from '~/locales/ru.json'
require('dotenv').config()

module.exports = {
  server: {
    // nuxt.js server options ( can be overrided by environment variables )
    port: 8000,
    host: 'scandinaver.local'
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    ['nuxt-i18n',
      {
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.js' },
          { code: 'ru', iso: 'ru-RU', file: 'ru.js' }
        ],
        defaultLocale: 'ru',
        lazy: true,
        langDir: 'locales/'
      }]
  ],

  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: false }
        },
        tokenType: 'Bearer',
        tokenRequired: true
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/',
      callback: '/'
    },
    cookie: {
      prefix: 'authfrontend.',
      options: {
        path: '/',
        secure: false,
        domain: process.env.NODE_ENV === 'development'
          ? process.env.COOKIE_DOMAIN
          : '.scandinaver.org'
      }
    }
  },

  axios: {
    baseURL: process.env.NODE_ENV === 'development'
      ? process.env.API_BASE_URL
      : 'https://api.scandinaver.org',
    browserBaseURL: process.env.NODE_ENV === 'development'
      ? process.env.BROWSER_BASE_URL
      : 'https://api.scandinaver.org',
    credentials: false
  },

  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    'aos/dist/aos.css',
    '@assets/scss/main.scss'
  ],

  /*
    ** Add element-ui in our app, see plugins/element-ui.js file
    */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/drag',
    '~/plugins/axios',
    { src: '~/plugins/parallax', mode: 'client' },
    { src: '~/plugins/swiper.js', mode: 'client' },
    { src: '~/plugins/aos.js', mode: 'client' },
    { src: '~/plugins/event-bus.js' },
    '~/plugins/typedi.js'
  ],

  /*
    ** Headers of the page
    */
  head: {
    title: 'Scandinaver',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
    ** Customize the progress bar color
    */
  loading: { color: '#3B8070' },

  router: {
    middleware: [
    //  'preload'
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      // eslint-disable-next-line require-await
      const findEl = async (hash, x = 0) => {
        return (
          document.querySelector(hash) ||
            new Promise((resolve) => {
              if (x > 50) {
                return resolve(document.querySelector('#app'))
              }
              setTimeout(() => {
                resolve(findEl(hash, ++x || 1))
              }, 1000)
            })
        )
      }

      if (to.hash) {
        const el = await findEl(to.hash)

        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  },

  /*
    ** Build configuration
    */
  build: {}
}
