<template>
  <div class="rating-block">
    <div class="achievements-block">
      <i class="el-icon-medal" />
      <i class="el-icon-medal" />
      <i class="el-icon-medal" />
      <i class="el-icon-trophy" />
      <i class="el-icon-trophy" />
      <i class="el-icon-trophy" />
      <i class="el-icon-trophy" />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AchievementsComponent extends Vue {

}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.achievements-block {
  background-color: white;
  border-bottom: 1px solid $border-color;
  padding: 15px;
  i {
    font-size: 30px;
    color: $background-muted;
    cursor: pointer;
  }
  i:first-child {
    color: $gold-color;
  }
}
</style>
