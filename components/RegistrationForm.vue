<template lang="pug">
  el-dialog(:visible.sync="visible" :title="$t('registration')" :before-close="close")
    .registration
      el-form.registration-form(ref="form" v-loading="loading" :model="form" :rules="rules" @submit.native.prevent="submit")
        el-form-item(prop="login" :error="errors.login")
          el-input(v-model="form.login" :placeholder="$t('login')" prefix-icon="el-icon-user")

        el-form-item(prop="email" :error="errors.email")
          el-input(v-model="form.email" :placeholder="$t('email')" prefix-icon="el-icon-message")

        el-form-item(prop="password" :error="errors.password")
          el-input(v-model="form.password" :placeholder="$t('password')" type="password" prefix-icon="el-icon-lock")

        el-form-item(prop="password_confirmation" :error="errors.password")
          el-input(v-model="form.password_confirmation" :placeholder="$t('confirmPassword')" type="password" autocomplete="off" prefix-icon="el-icon-lock")

        el-form-item
          el-button.registration-button(type="primary" native-type="submit" block) {{$t('registration')}}
          el-button(@click="resetForm()") {{$t('close')}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import IRegistrationForm from '~/models/IRegistrationForm'
import userAPI from '~/api/userAPI'

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
    password_confirmation: ''
  }

  private errors: any = {
    login: '',
    email: '',
    password: ''
  }

  private loading: boolean = false
  private error: string = ''

  rules: {} = {
    login: [{ required: true, message: 'Введите логин', trigger: 'submit' }],
    email: [{ required: true, message: 'Введите email', trigger: 'submit' }],
    password: [
      { required: true, message: 'Введите пароль', trigger: 'submit' }
    ],
    password_confirmation: [
      {
        required: true,
        validator: this.validatePass2,
        message: 'Пароли не совпадают',
        trigger: 'submit'
      }
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validatePass2 (rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== this.form.password) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }

  close () {
    this.$eventHub.$emit('closeRegistrationModal')
  }

  submit () {
    this.errors.login = ''
    this.errors.email = ''
    this.errors.password = ''
    // @ts-ignore
    this.$refs.form.validate((valid) => {
      if (valid) {
        userAPI.signup(this.form).then((response) => {
          this.$auth.setUser(response.data.user)
          this.$auth.setToken('local', `Bearer ${response.data.access_token}`)
          this.$eventHub.$emit('closeRegistrationModal')
          this.$notify({
            title: '',
            message: 'Вы успешно зарегистрировались',
            type: 'success'
          })
        })
          .catch((error) => {
            this.errors.login = error.response.data.errors.login ? error.response.data.errors.login[0] : ''
            this.errors.email = error.response.data.errors.email ? error.response.data.errors.email[0] : ''
            this.errors.password = error.response.data.errors.password ? error.response.data.errors.password[0] : ''
            this.loading = false
          })
      }
    })
  }

  resetForm () {
    // @ts-ignore
    this.$refs.form.resetFields()
    this.errors.login = ''
    this.errors.email = ''
    this.errors.password = ''
    this.$eventHub.$emit('closeRegistrationModal')
  }
}
</script>

<style scoped></style>
