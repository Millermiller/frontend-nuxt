import Vue from 'vue'
import 'reflect-metadata'
const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$eventHub = new Vue()
}

Vue.use(eventBus)
