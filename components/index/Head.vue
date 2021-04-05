<template lang="pug">
  div
    div.parallax-container
      div.parallax-wrapper
        el-image(v-parallax="0.5", style="width: 100%;", :src="imageSrc", :fit="'cover'")
        div.row(style="position: relative;")
          div.col-lg-12
            div.intro-message(style="color: rgb(255, 255, 255)")
              h1 Scandinaver
              p(v-html="$t('mainText')")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Head'
})
export default class HeadComponent extends Vue {
  private imageSrc: string = require('~/assets/head-bg-4.jpg')
  private logoSrc: string = require('~/assets/1.svg')
}
</script>

<style scoped lang="scss">
.parallax-container {
  height: 800px;
  overflow: hidden;
  .el-image {
    width: 100%;
    transform: translate3d(0px, 92.25px, 0px);
    overflow: hidden;
    position: absolute;
    height: 800px;
    .el-image__inner {
      object-fit: contain;
      position: absolute;
      top: 0;
    }
  }
  .intro-message {
    color: rgb(255, 255, 255);
    padding: 100px 20px;
    z-index: 1000;
    h1 {
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 200;
      margin-bottom: 10px;
      margin-right: 10%;
      margin-left: 5%;
      color: #333;
      font-size: 48px;
      position: relative;
      &:before {
        background-image: url('~assets/1.svg');
        width: 42px;
        height: 40px;
        content: '';
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 16px;
        left: -50px;
      }
    }
    p {
      font-size: 14px;
      text-align: right;
      margin-top: 440px;
    }
  }
}
</style>
