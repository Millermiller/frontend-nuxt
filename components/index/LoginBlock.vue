<template lang="pug">
  el-row#languages(:gutter="30")
    el-col.text-center(:span="24")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Languages'
  })
export default class extends Vue {
    private imagePath: string = require('@/assets/is.jpg')
}
</script>

<style scoped>

</style>
