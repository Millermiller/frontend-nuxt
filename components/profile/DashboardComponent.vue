<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card shadow="never" class="box-card profile-block">
        <div class="value">
          <span>100</span>
        </div>
        <div class="description">
          description
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never" class="box-card profile-block">
        <div class="value">
          <span>100</span>
        </div>
        <div class="description">
          description
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never" class="box-card profile-block">
        <div class="value">
          <span>100</span>
        </div>
        <div class="description">
          description
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never" class="box-card profile-block">
        <div class="value">
          <span>100</span>
        </div>
        <div class="description">
          description
        </div>
      </el-card>
    </el-col>
    <el-col>
      <el-card shadow="never" class="box-card">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DashboardComponent extends Vue {

}
</script>

<style scoped lang="scss">
.profile-block {
  margin-bottom: 15px;
  border-radius: 0;
  height: 140px;
  ::v-deep .el-card__body {
    display: flex;
    height: 100%;
    align-items: center;
    .value {
      width: 30%;
      span {
        font-size: 2em;
      }
    }
    .description {
      flex-grow: 1;
      text-align: center;
    }
  }
}
</style>
