<template lang="pug">
  el-row#languages(:gutter="30")
    el-col.text-center(:span="6", :xs="24", data-aos="fade-up", data-aos-offset="200", data-aos-delay="50", data-aos-duration="1000")
      el-card(:body-style="{ padding: '0px' }")
        div.clearfix(slot="header")
          span Исландский язык
        el-image(style="width: 100%", :src="imagePath", :fit="'fit'")
        p.lead.
          Здесь нет ни насекомых, ни деревьев, вообще ничего.
          Люди живут здесь, только потому что здесь родились.
          Понимай, как хочешь, то ли божья кара, то ли благодать.
        div.bottom.clearfix
         el-link(href="https://learn.scandinaver.org/is", type="text").button Перейти
          i.el-icon-caret-right
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Languages',
})
export default class Languages extends Vue {
  private imagePath: string = require('@/assets/s600.jpg')
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
