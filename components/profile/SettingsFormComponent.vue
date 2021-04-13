<template>
  <el-form ref="settingsForm"
           v-loading="loading"
           :label-position="'top'"
           label-width="100px"
           :model="settingsForm"
           :rules="rules"
           style="width: 460px;"
           @submit.native.prevent="submit()"
  >
    <el-form-item prop="login" :label="$t('login')" :error="errors.login">
      <el-input v-model="settingsForm.login" />
    </el-form-item>
    <el-form-item prop="email" :label="$t('email')" :error="errors.email">
      <el-input v-model="settingsForm.email" />
    </el-form-item>
    <el-form-item prop="password" :label="$t('password')" :error="errors.password">
      <el-input v-model="settingsForm.password" show-password />
    </el-form-item>
    <el-form-item prop="password_confirmation" :label="$t('confirmPassword')" :error="errors.password">
      <el-input v-model="settingsForm.password_confirmation" show-password :disabled="settingsForm.password === ''" />
    </el-form-item>
    <el-form-item>
      <el-button :native-type="'submit'">
        {{ $t('save') }}
      </el-button>
      <el-button>
        {{ $t('cancel') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import request from '../../utils/request'

@Component({
  name: 'SettingsFormComponent'
})
export default class SettingsFormComponent extends Vue {
  private settingsForm = {
    login: this.$auth.user.login,
    email: this.$auth.user.email,
    password: '',
    password_confirmation: ''
  }

  private errors: any = {
    login: '',
    email: '',
    password: ''
  }

  rules: {} = {
    login: [{ required: true, message: 'Введите логин', trigger: 'submit' }],
    email: [{ required: true, message: 'Введите email', trigger: 'submit' }],
    password: [],
    password_confirmation: [
      {
        required: this.settingsForm.password !== '',
        validator: this.validatePass2,
        message: 'Пароли не совпадают',
        trigger: 'submit'
      }
    ]
  }

  submit () {
    this.$refs.settingsForm.validate((valid) => {
      if (valid) {
        request.post('/profile/settings',
          this.settingsForm
        ).then(() => {
          this.$auth.fetchUser().then(() => {
            this.$notify({
              title: '',
              message: this.$tc('settingsUpdated'),
              type: 'success'
            })
          })
        })
          .catch((err) => {
            this.$notify({
              title: this.$tc('error'),
              message: err,
              type: 'error'
            })
          })
      }
    })
  }

  validatePass2 (rule: any, value: any, callback: any) {
    const password = this.settingsForm.password
    const passwordConfirmation = value

    if (password === '' && passwordConfirmation === '') {
      callback()
    }

    if (password !== '') {
      if (passwordConfirmation === password) {
        callback()
      } else {
        callback(new Error("Two inputs don't match!"))
      }
    }
  }

  private loading: boolean = false


}
</script>

<style scoped lang="scss">
.el-form-item {
  text-align: left;
}
::v-deep .el-form-item__label {
  padding: 0;
}
</style>
