<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card shadow="never" class="box-card">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HistoryPage extends Vue {
  name: 'HistoryPage'
  public activities = [{
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'el-icon-more'
  }, {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }, {
    content: 'Default node',
    timestamp: '2018-04-03 20:46'
  }, {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }, {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }, {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }, {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }]
}
</script>

<style scoped lang="scss">
.el-card {
  height: 65vh;
  ::v-deep .el-card__body {
    height: 100%;
  }
}
::v-deep .el-timeline {
    height: 100%;
    overflow-y: scroll;
  }
</style>
