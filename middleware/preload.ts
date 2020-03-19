
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context) => {
  if (process.server) {
    return context.$auth.fetchUser()
  }
}

export default myMiddleware
