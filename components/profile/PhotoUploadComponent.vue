<template>
  <div>
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action="https:api.scandinaver.local/avatar"
      :show-file-list="false"
      :auto-upload="false"
      :multiple="false"
      :name="'file'"
      :thumbnail-mode="false"
      :on-change="onChange"
      :on-preview="onPreview"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-row style="margin-top: 10px">
      <el-button :disabled="file === ''" @click="upload()">
        {{ $t('upload') }}
      </el-button>
      <el-button @click="clear()">
        {{ $t('clear') }}
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import request from '../../utils/request'

@Component({
  name: 'PhotoUploadComponent'
})
export default class PhotoUploadComponent extends Vue {
  private imageUrl: string = ''
  private file = ''

  onChange (file, fileList) {
    this.$refs.upload.clearFiles()
    this.imageUrl = URL.createObjectURL(file.raw)
    this.file = file
    return true
  }

  onPreview (file, fileList) {
    this.imageUrl = URL.createObjectURL(file.raw)
    return true
  }

  clear (): void {
    this.imageUrl = ''
    this.file = ''
    this.$refs.upload.clearFiles()
  }

  upload (): void {
    const formData = new FormData()
    formData.append('file', this.file.raw)

    request.post('/profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(() => {
      this.$auth.fetchUser().then(() => {
        this.$notify({
          title: '',
          message: this.$tc('photoUpdated'),
          type: 'success'
        })
      })
    })
      .catch((err) => {
        this.$notify({
          title: 'Ошибка',
          message: err,
          type: 'error'
        })
      })
  }
}
</script>

<style scoped lang="scss">
::v-deep .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    width: 350px;
    height: 350px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      cursor: pointer;
    }
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
}
</style>
