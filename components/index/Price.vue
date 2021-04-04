<template lang="pug">
  el-row#price(:gutter="20")
    el-col(:span="6")
      ul.pricing.p-yel
        li.invisible
          big !
          span {{$tc('priceList.unlimited')}}
          li {{$tc('priceList.words')}}
          li {{$tc('priceList.sentences')}}
          li {{$tc('priceList.translate')}}
          li {{$tc('priceList.puzzle')}}
          li {{$tc('priceList.personal')}}
          li {{$tc('priceList.mobile')}}
          li
            h3.invisible 0
              span
                i.rub
            span.invisible 0
              span.rub
                i / месяц
          li.invisible(v-show="loggedIn")
            button.btn.btn-danger {{$tc('select')}}

    el-col(:span="6")
      ul.pricing.p-green
        li
          big Basic
          span {{$tc('priceList.unlimited')}}
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
          h3 0₽
          span 0₽ / месяц
        li.no-border(v-show="loggedIn")
          button.btn.btn-danger.invisible {{$tc('select')}}

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
          h3 200₽
          span 200₽ / месяц
        li(v-show="loggedIn")
          a.btn.btn-danger {{$tc('select')}}

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
          h3 450₽
          span 150₽ / месяц
        li(v-show="loggedIn")
          a.btn.btn-danger {{$tc('select')}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Price'
})
export default class Price extends Vue {
  get loggedIn () {
    return this.$auth.loggedIn
  }
}
</script>

<style scoped lang="scss">
.pricing {
  text-align: center;
  border: 1px solid #e7e7e7;
  color: #777;
  font-size: 14px;
  padding-left: 0;
  margin-bottom: 30px;
  li {
    &:first-child {
      padding: 20px 13px;
    }
    &:last-child {
      padding: 20px 13px;
    }
    + {
      li {
        border-top: 1px solid #e7e7e7;
      }
    }
    list-style: none;
    padding: 13px 0;
  }
  big {
    font-size: 32px;
    font-family: 'Julius Sans One', sans-serif;
    display: block;
  }
}
.invisible {
  visibility: hidden;
}
.p-yel {
  big {
    color: #ffbb42;
  }
  h3 {
    color: #ffbb42;
  }
}
.p-green {
  big {
    color: #4c7737;
  }
  h3 {
    color: #4c7737;
  }
}
.btn.color-Medium {
  color: #e13c4c;
}
.color-Medium {
  color: #e13c4c;
}
.p-red {
  big {
    color: #e13c4c;
  }
  h3 {
    color: #e13c4c;
  }
}
.btn.color-Large {
  color: #3f4bb8;
}
.color-Large {
  color: #3f4bb8;
}
.p-blue {
  big {
    color: #3f4bb8;
  }
  h3 {
    color: #3f4bb8;
  }
}
.el-icon-check {
  font-size: 24px;
}
.el-icon-close {
  font-size: 24px;
}
.color-success {
  color: #4c7737;
}
.color-warning {
  color: #e13c4c;
}
.color-info {
  color: #3f4bb8;
}
</style>
