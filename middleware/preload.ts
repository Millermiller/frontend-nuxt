
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = async (context) => {
  if (process.server) {
    return await context.$auth.fetchUser()
  }
}

export default myMiddleware
