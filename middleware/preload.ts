
import { Middleware } from '@nuxt/types'

// eslint-disable-next-line require-await
const myMiddleware: Middleware = async (context) => {
  if (process.server) {
    // return context.$auth.fetchUser()
  }
}

export default myMiddleware
