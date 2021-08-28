<template lang="pug">
  el-row#languages(:gutter="30")
    el-col.text-center(
      v-for="(language, index) in languages", :key="language.getId()"
      :span="6",
      :xs="24",
      data-aos="fade-up",
      data-aos-offset="200",
      data-aos-delay="50",
      data-aos-duration="1000"
      )
      el-card(:body-style="{ padding: '0px' }")
        div.clearfix(slot="header")
          span {{language.title}}
        el-image(style="width: 100%", :src="language.image", :fit="'fit'")
        p.lead {{language.description}}
        div.bottom.clearfix
         el-link(:href="link(language)", type="text").button {{$tc('goTo')}}
          i.el-icon-caret-right
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LanguageService from '../../src/Scandinaver/Language/Application/language.service'
import { Language } from '../../src/Scandinaver/Language/Domain/Language'

@Component({
  name: 'Languages'
})
export default class Languages extends Vue {
  private service: LanguageService = new LanguageService()

  public languages: Language[] = []
  private url: string

  private imagePath: string = require('@/assets/s600.jpg')

  public async created () {
    this.url = process.env.NODE_ENV === 'development'
      ? process.env.SUB_APP_URL
      : 'https://learn.scandinaver.org'
    this.languages = await this.service.getAll()
  }

  public link(language: Language): string {
    return this.url + '/' + language.letter
  }
}
</script>

<style scoped lang="scss">
.el-card__header span {
  font-size: 18px;
}
.el-card__body p.lead {
  padding: 10px;
}
.bottom.clearfix {
  text-align: right;
  padding: 10px;
}
</style>
