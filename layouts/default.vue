<template lang="pug">
  el-container(style="height: 100%;")
    el-header
      TopMenu
    el-main
      nuxt
    el-footer(:height="'60px'")
      Footer
    Scroller
    LoginForm(:visible="loginFormVisible")
    RegistrationForm(:visible="registrationFormVisible")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
import Scroller from '~/components/Scroller.vue'
import LoginForm from '~/components/LoginForm.vue'
import RegistrationForm from '~/components/RegistrationForm.vue'

@Component({
  components: { TopMenu, Footer, Scroller, LoginForm, RegistrationForm },
})
export default class DefaultLayout extends Vue {
  private loginFormVisible: boolean = false
  private registrationFormVisible: boolean = false

  created() {
    this.$eventHub.$on('closeLoginModal', this.closeLoginModal)
    this.$eventHub.$on('openLoginModal', this.openLoginModal)
    this.$eventHub.$on('closeRegistrationModal', this.closeRegistrationModal)
    this.$eventHub.$on('openRegistrationModal', this.openRegistrationModal)
  }

  closeLoginModal() {
    this.loginFormVisible = false
  }

  closeRegistrationModal() {
    this.registrationFormVisible = false
  }

  openLoginModal() {
    this.loginFormVisible = true
  }

  openRegistrationModal() {
    this.registrationFormVisible = true
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
