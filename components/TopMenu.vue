<template lang="pug">
  div
    el-menu.el-menu-head(mode="horizontal")
      nuxt-link.el-menu-item.home-link(tag="li" to="/" v-if="showHomeLink") Scandinaver
      nuxt-link.el-menu-item(:to="{path: '/', hash: 'languages'}" tag="li") {{$t('navMenu.languages')}}
      nuxt-link.el-menu-item(:to="{path: '/', hash: 'price'}" tag="li") {{$t('navMenu.price')}}
      li.el-menu-item(v-show="!loggedIn" @click="openLoginModal") {{$t('signIn')}}
      li.el-menu-item(v-show="!loggedIn" @click="openRegistrationModal") {{$t('registration')}}
      nuxt-link.el-menu-item(tag="li" to="/profile" v-if="loggedIn") {{$t('profile')}}
      li(v-show="loggedIn")
        NuxtLink(to="/profile")
          el-avatar(:size="40" :src="avatar")
      li.el-menu-item(v-show="loggedIn"  @click="logout") {{$t('signOut')}}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'TopMenu'
})
export default class TopMenu extends Vue {
  get showHomeLink (): boolean {
    return this.$nuxt.$route.path !== '/'
  }

  get loggedIn (): boolean {
    return this.$auth.loggedIn
  }

  get avatar () {
    return this.$auth.user?.avatar
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

<style scoped lang="scss">
.el-menu-head {
  display: flex;
  justify-content: flex-end;
  background-color: #1d1e26 !important;
  border: none;
  .el-menu-item:focus {
    color: #fff;
    background-color: #1d1e26 !important;
  }
  .el-menu-item {
    color: #fff;
    &.home-link {
      margin-right: auto;
      position: relative;
      &:before {
        background-image: url('~assets/2.svg');
        width: 20px;
        height: 20px;
        content: '';
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 22px;
        left: -5px;
      }
      &:hover, &:focus {
        color: #fff;
        background-color: #1d1e26 !important;
      }
    }
  }
}
.el-avatar.el-avatar--circle {
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
