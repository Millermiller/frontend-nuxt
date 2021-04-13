<template>
  <section class="menu-block">
    <el-row>
      <div class="profile-link">
        <NuxtLink to="/profile">
          <i class="el-icon-data-analysis" />
          {{ $t('information') }}
        </NuxtLink>
      </div>
    </el-row>
    <el-row>
      <div class="profile-link">
        <NuxtLink to="/profile/history">
          <i class="el-icon-time" />
          {{ $t('history') }}
        </NuxtLink>
      </div>
    </el-row>
    <el-row>
      <div class="profile-link">
        <NuxtLink to="/profile/settings">
          <i class="el-icon-setting" />
          {{ $t('settings') }}
        </NuxtLink>
      </div>
    </el-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class MenuComponent extends Vue {

}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.menu-block {
  background-color: white;
  .profile-link {
    border-bottom: 1px solid $border-color;
    cursor: pointer;
    position: relative;
    a {
      width: 100%;
      height: 100%;
      padding: 15px;
      display: inline-block;
      color: $lead-text-color;
      &:hover, &.nuxt-link-exact-active {
        background-color: $background-muted;
        color: #409EFF;
      }
      > i {
        position: absolute;
        left: 10px;
        top: 15px;
      }
    }
  }
}

</style>
