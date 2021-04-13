<template lang="pug">
  el-container.is-vertical
    el-row
      el-col(:span="24")
        div
          Head
    .section-light
      .page-container
        Slider
    .section-dark
      .page-container
        Test
    .section-light
      .page-container
        Puzzle
    .section-dark
      .page-container
        TextComponent
    .section-light
      .page-container
        Mobile
    .section-dark
      .page-container.full-width
        Languages
    .section-light
      .page-container.full-width
        Price
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Head from '~/components/index/Head.vue'
import { RootState } from '~/store'
import Slider from '~/components/index/Slider.vue'
import Test from '~/components/index/Test.vue'
import Puzzle from '~/components/index/Puzzle.vue'
import TextComponent from '~/components/index/Text.vue'
import Mobile from '~/components/index/Mobile.vue'
import Languages from '~/components/index/Languages.vue'
import Price from '~/components/index/Price.vue'

@Component({
  components: {
    Head,
    Slider,
    Test,
    Puzzle,
    TextComponent,
    Mobile,
    Languages,
    Price
  }
})
export default class extends Vue {
  get name () {
    return (this.$store.state as RootState).name
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.page-container {
  width: 1140px;
  padding: 0;
  margin: 0 auto;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.is-vertical {

}
</style>
