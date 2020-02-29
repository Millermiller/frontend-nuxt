module.exports = {

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
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
          user: { url: '/user', method: 'get', propertyName: false }
        },
        tokenType: 'Bearer',
        tokenRequired: true
      },
      'laravel.passport': {
        url: 'https://api.scandinaver.local',
        client_id: '3',
        client_secret: 'poFBLStHoDt09k5vju77ETBBCE8HKSW3xvOiukYE'
      }
    }

  },

  axios: {
    baseURL: 'https://api.scandinaver.local',
    credentials: true
    //  proxy: true
  },

  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    'aos/dist/aos.css',
    '@assets/css/main.css'
  ],

  /*
    ** Add element-ui in our app, see plugins/element-ui.js file
    */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/drag',
    { src: '@/plugins/parallax', mode: 'client' },
    { src: '@/plugins/swiper.js', mode: 'client' },
    { src: '@/plugins/aos.js', mode: 'client' },
    { src: '~/plugins/event-bus' }
  ],

  /*
    ** Headers of the page
    */
  head: {
    title: 'front',
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
