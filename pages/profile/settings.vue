<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card shadow="never" class="box-card">
        <el-tabs style="height: 530px">
          <el-tab-pane :label="$t('photo')">
            <PhotoUploadComponent />
          </el-tab-pane>
          <el-tab-pane :label="$t('account')">
            <SettingsFormComponent />
          </el-tab-pane>
          <el-tab-pane :label="$t('notifications')" />
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PhotoUploadComponent from '~/components/profile/PhotoUploadComponent.vue'
import SettingsFormComponent from '~/components/profile/SettingsFormComponent.vue'

@Component({
  components: { PhotoUploadComponent, SettingsFormComponent }
})
export default class SettingsPage extends Vue {

}
</script>

<style scoped lang="scss"></style>
