<template lang="pug">
  el-row#price(:gutter="20")
    el-col(:span="6")
      ul.pricing.p-yel
        li.invisible
          big !
            span бессрочно
          li Доступных наборов "слова"
          li Доступных наборов "предложения"
          li Доступных текстов для перевода
          li Словарные паззлы
          li Создание персональных наборов
          li Мобильное приложение
          li
            h3.invisible 0
              span
                i.rub
            span.invisible 0
              span.rub
                i / месяц
          li.invisible(v-show="loggiedIn")
            button.btn.btn-danger Выбрать

    el-col(:span="6")
      ul.pricing.p-green
        li
          big Basic
          span бессрочно
        li
          span.color-success 10
        li
          span.color-success 5
        li
          span.color-success 3
        li
          svg(viewBox="0 45 200 100", height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z", stroke-width="10" stroke="#4c7737")
        li
          i.el-icon-close.color-success
        li
          i.el-icon-check.color-success
        li
          h3 0
            span.rub i
          span 0
            span
              i.rub / месяц
        li.no-border(v-show="loggiedIn")
          button.btn.btn-danger.invisible Выбрать

    el-col(:span="6")
      ul.pricing.p-red
        li
          big Medium
          span 1 месяц
        li
          svg(viewBox="0 45 200 100", height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z", stroke-width="10" stroke="#e13c4c")
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z", stroke-width="10", stroke="#e13c4c")
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z" stroke-width="10" stroke="#e13c4c")
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z" stroke-width="10" stroke="#e13c4c")
        li
          i.el-icon-check.color-warning
        li
          i.el-icon-check.color-warning
        li
          h3 200
            span.rub
              i
          span 200
            span.rub
            i / месяц
        li(v-show="loggiedIn")
          a.btn.btn-danger Выбрать

    el-col(:span="6")
      ul.pricing.p-blue
        li
          big Large
          span 3 месяца
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z" stroke-width="10", stroke="#3f4bb8")
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z", stroke-width="10", stroke="#3f4bb8")
        li
          svg(viewBox="0 45 200 100" height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z", stroke-width="10", stroke="#3f4bb8")
        li
          svg(viewBox="0 45 200 100", height="16")
            path(fill="none", d="M100,100 C200,0 200,200 100,100  C0,0 0,200 100,100z" stroke-width="10" stroke="#3f4bb8")
        li
          i.el-icon-check.color-info
        li
          i.el-icon-check.color-info
        li
          h3 450
           span.rub
             i
          span 150
            span.rub
              i / месяц
        li(v-show="loggiedIn")
          a.btn.btn-danger Выбрать
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Price'
  })
export default class Price extends Vue {
  get loggiedIn () {
    return this.$auth.loggedIn
  }
}
</script>

<style scoped>
  .rub {
    font-family: ALSRubl,serif;
  }
  .pricing {
    text-align: center;
    border: 1px solid #e7e7e7;
    color: #777;
    font-size: 14px;
    padding-left: 0;
    margin-bottom: 30px;
  }
  .pricing li:first-child, .pricing li:last-child {
    padding: 20px 13px;
  }
  .invisible {
    visibility: hidden;
  }
  .p-yel big, .p-yel h3 {
    color: #ffbb42;
  }
  .pricing big {
    font-size: 32px;
    font-family: 'Julius Sans One',sans-serif;
    display: block;
  }
  .p-green big, .p-green h3 {
    color: #4c7737;
  }
  .btn.color-Medium, .color-Medium, .p-red big, .p-red h3 {
    color: #e13c4c;
  }
  .btn.color-Large, .color-Large, .p-blue big, .p-blue h3 {
    color: #3f4bb8;
  }
  .pricing li + li {
    border-top: 1px solid #e7e7e7;
  }
  .pricing li {
    list-style: none;
    padding: 13px 0;
  }
  .el-icon-check, .el-icon-close{
    font-size: 24px;
  }
  .color-success {
    color: #4c7737;
  }
  .color-warning {
    color: #e13c4c;
  }
  .color-info {
    color:  #3f4bb8;
  }
</style>
