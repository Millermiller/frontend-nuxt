<template lang="pug">
  el-row
    el-col(:span="10", :offset="2")
      h2.section-heading {{title}}
      p.lead {{description}}
    el-col.text-center(:span="12", data-aos="fade-left", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      el-image(style="height: 400px" :src="imagePath" :fit="'contain'")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Mobile'
  })
export default class extends Vue {
  private title: string = 'Всегда с собой'
  private description: string = 'Наше приложение доступно в Google Play бесплатно и без рекламы.'
  private imagePath: string = require('@/assets/mobile.png')
}
</script>

<style scoped>

</style>
