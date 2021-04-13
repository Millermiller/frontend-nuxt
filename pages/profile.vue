<template>
  <el-container class="page-container" style="padding-bottom: 0">
    <el-aside>
      <section class="avatar-block">
        <el-row>
          <el-col>
            <el-avatar :size="300" :src="avatar" :shape="'square'" />
          </el-col>
          <el-col>
            <RatingComponent />
          </el-col>
          <el-col>
            <AchievementsComponent />
          </el-col>
          <el-col>
            <ProgressComponent />
          </el-col>
        </el-row>
      </section>
      <MenuComponent />
    </el-aside>
    <el-main style="margin-left: 20px;padding: 20px;">
      <nuxt-child />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MenuComponent from '~/components/profile/MenuComponent.vue'
import RatingComponent from '~/components/profile/RatingComponent.vue'
import AchievementsComponent from '~/components/profile/AchievementsComponent.vue'
import ProgressComponent from '~/components/profile/ProgressComponent.vue'

@Component({
  components: {
    MenuComponent,
    RatingComponent,
    AchievementsComponent,
    ProgressComponent
  },
  // head (this: ProfilePage) {
  //   return {
  //     title: 'ProfilePage',
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: 'Home page description'
  //       }
  //     ]
  //   }
  // },
  fetch ({ store }) {
    store.commit('CHANGE_NAME', 'foo')
  },
  middleware: ['auth']
})
export default class ProfilePage extends Vue {
  get value () {
    return this.$store.getters.name
  }

  get avatar () {
    return this.$auth.user?.avatar
  }

  logout () {
    this.$auth.logout()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables';
  .el-container {
    margin-top: 60px;
    .el-aside {
      color: #333;
      text-align: center;
      width: 265px;
      .avatar-block {
        background-color: white;
        .el-avatar--square {
          border-radius: 0;
        }
      }
    }
    .el-main {
      text-align: center;
      margin-top: 40px;
    }
  }
</style>
