<template>
  <div class="rating-block">
    <el-rate
      v-model="rating"
      disabled
      :max="10"
      show-score
      text-color="#ff9900"
      score-template="{value}"
    />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class RatingComponent extends Vue {
  get rating () {
    return 1
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.rating-block{
  background-color: white;
  border-bottom: 1px solid $border-color;
  padding: 15px;
}
</style>
