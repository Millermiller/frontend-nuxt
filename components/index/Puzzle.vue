<template lang="pug">
  el-row
    el-col(:span="12")
      h2.section-heading {{title}}
      p.lead {{description}}
    el-col(:span="10", :offset="2", data-aos="fade-left", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#puzzle_view.row(v-cloak)
        div.cov-progress(:style="{width: progress + '%'}")
        div.col-lg-12
          h3.text-center {{translate}}
            i(@click="refresh" :class="['el-icon-refresh-right pointer', {'rotating': isRotate}]")
        div.col-lg-12.drop-wrapper
          drop(:class="['drop', 'list', zone.class]",
            v-for="(zone, index) in dropzones",
            :key="index",
            @drop="handleDrop(zone, ...arguments)",
            @dragenter="handleDragEnter(zone, ...arguments)",
            @dragleave="handleDragLeave(zone, ...arguments)")
            transition(name="bounce")
              drag.drag(:key="item", v-for="item in zone.content", :transfer-data="{ zone: zone, item: item, list: zone.content}") {{ item }}
        div.col-lg-12
          p.text-center разместите слова в правильном порядке
            i.ion.ion-android-arrow-up
        div.col-lg-12
          drop(:class="['drop-wrapper', {'gray-bordered': shufflewords.length > 0}]" @drop="handleBackDrop(shufflewords, ...arguments)")
            drag.drag.elem(v-for="item in shufflewords", :key="item" :transfer-data="{ item: item, list: shufflewords, example: 'lists' }") {{ item }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RadialProgressBar from '@/components/index/RadialProgressBar.vue'

  @Component({
    name: 'Test',
    components: { RadialProgressBar }
  })
export default class extends Vue {
    private title: string = 'Словарные паззлы'
    private description: string = 'Разместите слова в правильном порядке.'
    private translate: string = 'Вдруг она увидела белого кролика'
    private sentence: string = 'skyndilega hún sá á hvíta kanínu'
    private words: any [] = []
    private shufflewords: any [] = []
    private dropzones: any [] = []
    private progress: number = 0
    private success: number = 0
    private wordsCount: number = 0
    private isRotate: boolean = false

    mounted () {
      this.words = this.sentence.split(' ')
      this.shufflewords = this.sentence.split(' ')
      // this.shufflewords.shuffle()
      this.wordsCount = this.words.length

      for (let i = 0; i < this.words.length; i++) {
        this.dropzones.push({
          for: this.words[i],
          content: [],
          class: 'dragover'
        })
      }
    }

    handleDrop (toList: any, data: any) {
      const fromList = data.list

      if (data.item === toList.for) {
        toList.content.push(data.item)
        fromList.splice(fromList.indexOf(data.item), 1)
        this.success++
        this.progress = Math.floor((this.success * 100) / this.wordsCount)
      } else {
        toList.class = 'dragover'
      }
    }

    handleBackDrop (toList: any, data: any) {
      const fromList = data.list

      if (data.zone) {
        toList.push(data.item)
        fromList.splice(fromList.indexOf(data.item), 1)
        data.zone.class = 'dragover'
        this.success--
        this.progress = Math.floor((this.success * 100) / this.wordsCount)
      }
    }

    handleDragEnter (ev: any, data: any) {
      ev.class = 'dragenter'
    }

    handleDragLeave (ev: any, data: any) {
      if (!ev.content.length) { ev.class = 'dragover' }
    }

    refresh () {
      const self = this
      this.isRotate = true
      this.words = this.sentence.split(' ')
      this.shufflewords = this.sentence.split(' ')
      // this.shufflewords.shuffle()
      this.dropzones = []
      this.progress = 0
      this.success = 0
      this.wordsCount = this.words.length

      for (let i = 0; i < this.words.length; i++) {
        this.dropzones.push({
          for: this.words[i],
          content: [],
          class: 'dragover'
        })
      }

      setTimeout(function () {
        self.isRotate = false
      }, 1000)
    }
}
</script>

<style scoped>
  #puzzle_view {
    border: 1px solid #e7e7e7;
    padding: 10px;
  }
  .drop-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .drop {
    background: #fff;
    border: 1px solid #ccc;
    height: 50px;
    min-width: 50px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .drag, .drop {
    font-family: sans-serif;
    position: relative;
    text-align: center;
    vertical-align: top;
  }
  .drag {
    padding: 5px 10px;
    cursor: grab;
  }
  .dragenter {
    border-color: #20a0ff;
  }
  .gray-bordered {
    border: 1px solid #e7e7e7;
  }
  .drop-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .drag.elem {
    background: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 5px;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
