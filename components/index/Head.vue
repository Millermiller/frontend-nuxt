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
  private imageSrc: string = require('@/assets/head-bg.jpg')
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
    padding: 300px 20%;
    z-index: 1000;
    h1 {
      border-bottom: 1px solid;
      margin-bottom: 10px;
      margin-right: 10%;
    }
    p {
      font-size: 16px
    }
  }
}
</style>
