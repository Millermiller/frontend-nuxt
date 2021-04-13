<template>
  <div class="progress-block">
    <el-progress :percentage="50" :stroke-width="2" />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ProgressComponent extends Vue {

}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.progress-block {
  background-color: white;
  border-bottom: 1px solid $border-color;
  padding: 15px;
}
</style>
