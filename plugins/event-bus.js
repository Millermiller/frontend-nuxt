import Vue from 'vue'

const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$eventHub = new Vue()
}

Vue.use(eventBus)
