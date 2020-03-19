<template lang="pug">
  el-row#languages(:gutter="30")
    el-col.text-center(:span="6", data-aos="fade-up", data-aos-offset="200", data-aos-delay="50", data-aos-duration="1000")
      el-card(:body-style="{ padding: '0px' }")
        div.clearfix(slot="header")
          span Card name
        el-image(style="width: 100%", :src="imagePath", :fit="'fit'")
        p.lead.
          Здесь нет ни насекомых, ни деревьев, вообще ничего.
          Люди живут здесь, только потому что здесь родились.
          Понимай, как хочешь, то ли божья кара, то ли благодать.
        div.bottom.clearfix
         el-link.button(type="text") Перейти
    el-col.text-center(:span="6", data-aos="fade-up", data-aos-offset="200", data-aos-delay="150", data-aos-duration="1000")
      el-card(:body-style="{ padding: '0px' }")
        div.clearfix(slot="header")
          span Card name
        el-image(style="width: 100%", :src="imagePath", :fit="'fit'")
        p.lead.
          Здесь нет ни насекомых, ни деревьев, вообще ничего.
          Люди живут здесь, только потому что здесь родились.
          Понимай, как хочешь, то ли божья кара, то ли благодать.
        div.bottom.clearfix
          el-link.button(type="text") Перейти
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Languages'
  })
export default class Languages extends Vue {
    private imagePath: string = require('@/assets/is.jpg')
}
</script>

<style scoped>
  .bottom.clearfix{
    text-align: right;
    padding: 10px;
  }
</style>
