<template lang="pug">
  el-row
    el-col(:span="7", style="padding-top: 40px;")
      small {{copyright}}{{version}}
    el-col(:span="5", :offset="12")
      el-row
        el-col(:span="8")
          el-image(:src="ivonaLogo")
        el-col(:span="8")
          el-image(:src="forvoLogo")
        el-col(:span="8")
          el-image(:src="playLogo")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { version } from '../package.json'
  @Component({
    name: 'Footer'
  })
export default class Footer extends Vue {
  private copyright: string = 'Copyright © Scandinaver 2020 | support@scandinaver.org | '
  private version: string = `v.${version}`
  private ivonaLogo: string = require('@/assets/ivona_tts_amzn.png')
  private forvoLogo: string = require('@/assets/forvo-logo.png')
  private playLogo: string = require('@/assets/google-play-badge.png')
}
</script>

<style lang="scss">
@import "assets/scss/variables";
  .el-footer{
    .el-image{
      height: 40px;
      padding: 5px;
    }
  }
</style>
