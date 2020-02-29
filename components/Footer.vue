<template lang="pug">
  el-row
    el-col(:span="6", style="padding-top: 40px;")
      small {{copyright}}
    el-col(:span="6", :offset="12")
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

  @Component({
    name: 'Footer'
  })
export default class extends Vue {
  private copyright: string = 'Copyright © Scandinaver 2020 | All Rights Reserved | support@scandinaver.org'
  private ivonaLogo: string = require('@/assets/ivona_tts_amzn.png')
  private forvoLogo: string = require('@/assets/forvo-logo.png')
  private playLogo: string = require('@/assets/google-play-badge.png')
}
</script>

<style scoped>
  .el-footer{
    height: 60px;
    padding: 10px 20px;
  }
  footer.el-footer .el-image{
    height: 40px;
    padding: 5px;
    margin: 10px;
  }
</style>
