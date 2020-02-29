<template lang="pug">
  transition(name="fade")
    #scroller(v-if="visible")
      i.el-icon-arrow-up(@click="scroll")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'Scroller'
  })
export default class extends Vue {
  private visible: boolean = false

  handleScroll () {
    this.visible = window.scrollY > 0
  }

  scroll () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  created () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style scoped>
  #scroller {
    position: fixed;
    bottom: 40px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    right: 30px;
    font-size: 46px;
    color:#ff4949;
    z-index: 100;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter,
  .fade-leave-to{
    opacity: 0
  }
</style>
