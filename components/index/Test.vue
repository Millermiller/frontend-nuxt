<template lang="pug">
  el-row
    el-col(:span="12", :xs="24", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#test_view(v-cloak)
        div(:class="['cov-progress', {'cov-error': error}]" :style="{width: progress + '%'}")
        p.text-center(v-if="question.word") {{question.word}}
        div.translate-area
          template(v-if="!question.word")
            radial-progress-bar(
              :total-steps="quantity",
              :diameter="300",
              :completed-steps="result",
              timing-func="ease-in",
              start-color="#20a0ff",
              stop-color="#20a0ff",
              inner-stroke-color="#eaeaea",
              :stroke-width="5",
              :animateSpeed="400")
              p.demo-result {{percent}}%
              el-button(@click="getAsset") еще раз
          ul.variants(v-if="question.word")
            li.pointer(v-for="(variant, index) in variants.data", @click="check(variant)")
              span.counter {{ index + 1 }}. {{variant.text}}
    el-col(:span="10", :offset="2", :xs="{span: 24, offset: 0}")
      h2.section-heading {{$tc('blocks.test.title')}}
      p.lead {{$tc('blocks.test.description')}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RadialProgressBar from '~/components/index/RadialProgressBar.vue'
import { cardsArray } from '~/assets/cards'
import { Collection } from '~/models/Collection'

@Component({
  name: 'Test',
  components: { RadialProgressBar }
})
export default class Test extends Vue {
  private cards: any[] = []
  private translates: Collection = new Collection([]) // массив всех translates
  private quantity: number = 0 // количество вопросов
  private question: any = {} // текущий вопрос
  private variants: Collection = new Collection([]) // 4 варианта ответа на текущий вопрос
  private answers: number = 0 // количество данных ответов
  private success: number = 0 // количество правильных ответов
  private percent: number = 0 // процент правильных ответов
  private fail: number = 0 // количество неправильных ответов
  private errors: any[] = [] // массив ошибок
  private result: number = 0
  private speed: number = 10
  private progress: number = 0
  private loading: boolean = false
  private error: boolean = false

  mounted () {
    this.getAsset()
  }

  reload () {
    this.getAsset()
  }

  getAsset () {
    this.cards = cardsArray.slice()
    this.loading = true
    this.quantity = this.cards.length
    this.translates = new Collection([])
    this.success = 0
    this.answers = 0
    this.errors = []
    this.percent = 0
    this.cards.forEach((el) => {
      this.translates.add(el.value)
    })
    this.progress = 0
    this.createTest()
    this.result = 0
    this.error = false
  }

  check (variant: any) {
    this.answers++
    this.progress = Math.floor((this.answers * 100) / this.quantity)
    if (variant.correct) {
      this.error = false
      this.success++
      this.percent = Math.floor((this.success * 100) / this.quantity)
      this.next()
    } else {
      this.error = true
      this.fail++
      this.errors.push(this.question) // todo: use store
      this.next()
    }
  }

  next () {
    if (this.cards.length > 0) {
      this.createTest()
    } else {
      this.question = {}
      this.variants = new Collection([])
      this.progress = 100
      const self = this
      setTimeout(function () {
        self.result = self.success
      }, 1000)
    }
  }

  createTest () {
    this.question = this.cards.pop()
    this.variants = new Collection([
      { text: this.question.value, correct: true }
    ])
    const indexes: any = []
    const translates = new Collection(this.translates.data)
    translates.remove(this.question.value)

    while (this.variants.count() < (this.quantity > 4 ? 4 : this.quantity)) {
      const l = Math.floor(Math.random() * translates.count())

      if (indexes.includes(l)) {
        continue
      }

      indexes.push(l)

      this.variants.add({ text: translates.get(l), correct: false })
    }

    this.variants.shuffle()
  }
}
</script>

<style scoped lang="scss">
h2 {
  border-bottom: 1px solid #777;
  margin-bottom: 10px;
}
#test_view {
  position: relative;
  height: 380px;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  transition: 0.3s;
  overflow: hidden;
  margin-top: 20px;
  padding: 10px;
  p {
    font-size: 24px;
    padding-bottom: 10px;
  }
}
.translate-area {
  position: relative;
  min-height: 80%;
  border: 1px solid #dadada;
  display: flex;
  padding: 10px 0;
}
.variants {
  list-style: none;
  padding: 0;
  li {
    padding: 10px 10px;
    margin: 0;
    font-size: 16px;
    color: #777;
    position: relative;
    text-align: left;
    > .counter {
      font-size: 18px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
.radial-progress-container {
  position: relative;
  margin: 20px auto;
}
.demo-result {
  font-family: 'Julius Sans One', sans-serif;
  font-size: 30px;
}
</style>
