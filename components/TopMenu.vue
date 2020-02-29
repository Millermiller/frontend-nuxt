<template lang="pug">
  div
    el-menu.el-menu-head(mode="horizontal")
      nuxt-link.el-menu-item(tag="li" to="/") Главная
      nuxt-link.el-menu-item(:to="{path: '/', hash: 'languages'}" tag="li") Языки
      nuxt-link.el-menu-item(:to="{path: '/', hash: 'price'}" tag="li") Цены
      li.el-menu-item(v-if="!loggiedIn" @click="openLoginModal") Вход
      li.el-menu-item(v-if="!loggiedIn" @click="openRegistrationModal") Регистрация
      li.el-menu-item(v-if="loggiedIn"  @click="logout") Выход
      li(v-if="loggiedIn")
        el-avatar(:size="40" :src="avatar")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'TopMenu'
  })
export default class extends Vue {
  get loggiedIn () {
    return this.$auth.loggedIn
  }

  get avatar () {
    return this.$auth.user.avatar
  }

  openLoginModal () {
    this.$eventHub.$emit('openLoginModal')
  }

  openRegistrationModal () {
    this.$eventHub.$emit('openRegistrationModal')
  }

  logout () {
    this.$auth.logout()
  }
}
</script>

<style scoped>
  .el-menu-head{
    display: flex;
    justify-content: flex-end;
  }
  .el-avatar.el-avatar--circle{
    margin-top: 10px;
  }
  .login {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-button {
    width: 100%;
    margin-top: 40px;
  }
  .login-form {
    width: 290px;
  }
  .forgot-password {
    margin-top: 10px;
  }

  .login .el-input input {
    padding-left: 35px;
  }
  .login .el-card {
    padding-top: 0;
    padding-bottom: 30px;
  }
  h2 {
    letter-spacing: 1px;
    font-family: Roboto, sans-serif;
    padding-bottom: 20px;
  }
  .login .el-card {
    width: 340px;
    display: flex;
    justify-content: center;
  }
</style>
