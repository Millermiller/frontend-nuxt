<template lang="pug">
  el-dialog(:visible.sync="visible" , :title="$t('signIn')" :before-close="close")
    div.login
      el-form.login-form(ref="form" v-loading="loading" :model="form" :rules="rules" @submit.native.prevent="submit")

        el-form-item(prop="login" :error="errors.login")
          el-input(v-model="form.login" :placeholder="$t('loginOrEmail')" prefix-icon="el-icon-user")

        el-form-item(prop="password" :error="errors.password")
          el-input(v-model="form.password" :placeholder="$t('password')" type="password" prefix-icon="el-icon-lock")

        el-form-item
          el-button.login-button(type="primary" native-type="submit" block) {{$t('signIn')}}
          el-button(@click="resetForm()") {{$t('close')}}

        <!-- a.forgot-password(href="##") {{$t('forgotPassword')}} -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ILoginForm from '~/models/ILoginForm'

  @Component({
    name: 'LoginForm'
  })
export default class LoginForm extends Vue {
    @Prop({ required: true })
    private visible!: any

    private form: ILoginForm = {
      login: '',
      password: ''
    }

    private loading: boolean = false

    private errors: any = {
      login: '',
      password: ''
    }

    rules: {} = {
      login: [
        { required: true, message: 'Введите логин или email', trigger: 'submit' }
      ],
      password: [
        { required: true, message: 'Введите пароль', trigger: 'submit' }
      ]
    }

    close () {
      this.$eventHub.$emit('closeLoginModal')
    }

    submit () {
      // @ts-ignore
      this.$refs.form.validate((valid) => {
        if (valid) {
          // @ts-ignore
          this.$auth.loginWith('local', {
            data: {
              login: this.form.login,
              password: this.form.password
            }
          })
            .then(() => {
              this.close()
              this.$notify({
                title: '',
                message: 'Вы успешно авторизовались',
                type: 'success'
              })
            })
            .catch((error) => {
              this.$notify({
                title: 'Ошибка',
                message: error.response.data,
                type: 'error'
              })
              // this.errors.email = data.response.data.errors.login ? data.response.data.errors.login[0] : ''
              //  this.errors.password = data.response.data.errors.password ? data.response.data.errors.password[0] : ''
              // this.loading = false
            })
        }
      })
    }

    resetForm () {
      // @ts-ignore
      this.$refs.form.resetFields()
      this.$eventHub.$emit('closeLoginModal')
    }
}
</script>

<style scoped>

</style>
