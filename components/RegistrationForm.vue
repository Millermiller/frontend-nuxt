<template lang="pug">
  el-dialog(:visible.sync="visible" title="Вход" :before-close="close")
    .registration
      el-form.registration-form(ref="form" v-loading="loading" :model="form" :rules="rules" @submit.native.prevent="submit")
        el-form-item(prop="login")
          el-input(v-model="form.login" placeholder="Username" prefix-icon="el-icon-user")

        el-form-item(prop="email")
          el-input(v-model="form.email" placeholder="Email" prefix-icon="el-icon-message")

        el-form-item(prop="password")
          el-input(v-model="form.password" placeholder="Password" type="password" prefix-icon="el-icon-lock")

        el-form-item(prop="checkPass")
          el-input(v-model="form.checkPass" type="password" autocomplete="off" prefix-icon="el-icon-lock")

        el-form-item
          el-button.registration-button(type="primary" native-type="submit" block) registration
          el-button(@click="resetForm()") Cancel

        a.forgot-password(href="https://oxfordinformatics.com/") Forgot password ?
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import IRegistrationForm from '@/models/IRegistrationForm'

  @Component({
    name: 'RegistrationForm'
  })
export default class RegistrationForm extends Vue {
    @Prop({ required: true })
    private visible!: any

    private form: IRegistrationForm = {
      login: '',
      email: '',
      password: '',
      checkPass: ''
    }

    private loading: boolean = false
    private error: string = ''

    rules: {} = {
      login: [
        { required: true, message: 'Введите логин', trigger: 'submit' }
      ],
      email: [
        { required: true, message: 'Введите email', trigger: 'submit' }
      ],
      password: [
        { required: true, message: 'Введите пароль', trigger: 'submit' }
      ],
      checkPass: [
        { required: true, validator: this.validatePass2, message: 'Пароли не совпадают', trigger: 'submit' }
      ]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validatePass2 (rule:any, value:any, callback:any) {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }

    close () {
      this.$eventHub.$emit('closeRegistrationModal')
    }

    submit () {
      // @ts-ignore
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$auth.loginWith('local', {
            data: {
              username: this.form.login,
              password: this.form.password
            }
          })
        }
      })
    }

    resetForm () {
      // @ts-ignore
      this.$refs.form.resetFields()
      this.$eventHub.$emit('closeRegistrationModal')
    }
}
</script>

<style scoped>

</style>
