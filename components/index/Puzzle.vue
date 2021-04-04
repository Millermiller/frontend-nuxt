<template>
  <el-row>
    <el-col :span="12" :xs="24">
      <h2 class="section-heading">
        {{ $tc('blocks.puzzle.title') }}
      </h2>
      <p class="lead">
        {{ $tc('blocks.puzzle.description') }}
      </p>
    </el-col>
    <el-col
      :span="10"
      :offset="2"
      :xs="{span: 24, offset: 0}"
      data-aos="fade-left"
      data-aos-offset="10"
      data-aos-delay="100"
      data-aos-duration="1000"
    >
      <div v-cloak id="puzzle_view" class="row">
        <div class="cov-progress" :style="{width: progress + '%'}" />
        <div class="col-lg-12">
          <h3 class="text-center">
            {{ translate }}
            <i
              :class="[
                'el-icon-refresh-right pointer',
                {'rotating': isRotate}]"
              @click="refresh(puzzle)"
            />
          </h3>
        </div>
        <div class="col-lg-12 drop-wrapper">
          <drop
            v-for="(zone, index) in dropZones"
            :key="index"
            :class="['drop', 'list', zone.class]"
            @drop="handleDrop(zone, ...arguments)"
            @dragenter="handleDragEnter(zone, ...arguments)"
            @dragleave="handleDragLeave(zone, ...arguments)"
          >
            <transition name="bounce">
              <drag
                v-for="(item, i) in zone.content"
                :key="i"
                class="drag"
                :transfer-data="{ zone: zone, item: item, list: zone.content}"
              >
                {{ item.word }}
              </drag>
            </transition>
          </drop>
        </div>
        <div class="col-lg-12">
          <p class="text-center">
            разместите слова в правильном порядке
            <i class="el-icon-d-caret" />
          </p>
        </div>
        <div class="col-lg-12">
          <drop
            v-if="puzzle.pieces"
            :class="[
              'drop-wrapper',
              { 'gray-bordered': puzzle.pieces.count() > 0 },
            ]"
            @drop="handleBackDrop(puzzle.pieces, ...arguments)"
          >
            <drag
              v-for="item in puzzle.pieces.all()"
              :key="item.word"
              class="drag elem"
              :transfer-data="{
                item: item,
                list: puzzle.pieces.all(),
                example: 'lists',
              }"
            >
              {{ item.word }}
            </drag>
          </drop>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RadialProgressBar from '~/components/index/RadialProgressBar.vue'
import PuzzleService from '~/src/Scandinaver/Puzzle/Application/puzzle.service'
import { Puzzle } from '~/src/Scandinaver/Puzzle/Domain/Puzzle'

@Component({
  name: 'PuzzleComponent',
  components: { RadialProgressBar }
})
export default class PuzzleComponent extends Vue {
  private service: PuzzleService = new PuzzleService()

  public puzzle: Puzzle = new Puzzle()
  public words: string[] = []
  public dropZones: {}[] = []
  public success: number = 0
  public isRotate: boolean = false
  private translate: string = 'Вдруг она увидела белого кролика'
  private sentence: string = 'skyndilega hún sá á hvíta kanínu'
  private progress: number = 0
  private wordsCount: number = 0

  mounted () {
    this.puzzle.text = this.translate
    this.puzzle.translate = this.sentence
    this.createPuzzle(this.puzzle)
  }

  async createPuzzle (puzzle: Puzzle) {
    this.puzzle = this.service.create(puzzle)
    puzzle.active = true
    this.success = 0
    this.progress = 0
    this.wordsCount = this.puzzle.pieces.count()
    this.words = this.puzzle.translate.split(' ')
    this.dropZones = []

    for (let i = 0; i < this.words.length; i++) {
      this.dropZones.push({
        for: this.words[i],
        content: [],
        class: 'dragover'
      })
    }
  }

  handleDrop (toList: any, data: any) {
    const fromList = data.list

    if (data.item.word === toList.for) {
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
      toList.add(data.item)
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
    if (!ev.content.length) {
      ev.class = 'dragover'
    }
  }

  async refresh (puzzle: Puzzle) {
    this.isRotate = true
    await this.createPuzzle(puzzle)
    setTimeout(() => {
      this.isRotate = false
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
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
h2 {
  border-bottom: 1px solid #777;
  margin-bottom: 10px;
}
#puzzle_view {
  border: 1px solid #e7e7e7;
  padding: 10px;
  min-height: 290px;
  h3 {
    padding: 5px;
  }
  .drop-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
    .drop {
      background: #fff;
      border: 1px solid #ccc;
      height: 50px;
      min-width: 50px;
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
      position: relative;
      text-align: center;
      vertical-align: top;
    }

  }
}

.drag {
  font-family: sans-serif;
  position: relative;
  text-align: center;
  vertical-align: top;
  padding: 5px 10px;
  cursor: grab;
}

.dragenter {
  border-color: #20a0ff;
}
.gray-bordered {
  border: 1px solid #e7e7e7;
}
.drag.elem {
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 5px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
