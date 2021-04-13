<template>
  <DashboardComponent />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashboardComponent from '~/components/profile/DashboardComponent.vue'

@Component({
  components: { DashboardComponent }
})
export default class IndexPage extends Vue {
  name: 'IndexPage'
}
</script>

<style scoped lang="scss">

</style>
