<template lang="pug">
  el-row
    el-col(:span="12", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#test_view(v-cloak)
        div(slot="header")
          div(:class="['cov-progress', {'cov-error': error}]" :style="{width: progress + '%'}")
          h3.text-center(style="height: 76px;", v-if="question.word") {{question.word}}
            hr
          template(v-else)
            radial-progress-bar(:total-steps="quantity", :diameter="300", :completed-steps="result", timing-func="ease-in", start-color="#20a0ff", stop-color="#20a0ff", inner-stroke-color="#eaeaea", :stroke-width="5", :animateSpeed="20000")
              p.demo-result {{percent}}%
              p.btn.btn-success(@click="getAsset") еще раз
        ul.variants(v-if="question.word")
          li.pointer(v-for="(variant, index) in variants", @click="check(variant)")
            span.counter {{ index + 1 }}. {{variant.text}}
    el-col(:span="10", :offset="2")
      h2.section-heading {{title}}
      p.lead {{description}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RadialProgressBar from '@/components/index/RadialProgressBar.vue'
import { cardsArray } from '@/assets/cards'

  @Component({
    name: 'Test',
    components: { RadialProgressBar }
  })
export default class extends Vue {
  private title: string = 'Новые уровни'
  private description: string = 'Проверяйте свои знания и открывайте новые словари, проходя тесты.'
  private cards: any[] = []
  private translates: any[] = [] // массив всех translates
  private quantity: number = 0 // количество вопросов
  private question: any = {} // текущий вопрос
  private variants: any[] = [] // 4 варианта ответа на текущий вопрос
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
    this.translates = []
    this.success = 0
    this.answers = 0
    this.errors = []
    this.percent = 0
    this.cards.forEach((el) => {
      this.translates.push(el.value)
    })
    this.progress = 0
    this.createTest()
    this.result = 0
    this.error = false
  }

  check (variant: any) {
    this.answers++
    this.progress = (Math.floor((this.answers * 100) / this.quantity))
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
    if (this.cards.length > 0) { this.createTest() } else {
      this.question = {}
      this.variants = []
      this.progress = 100
      const self = this
      setTimeout(function () {
        self.result = self.success
      }, 1000)
    }
  }

  createTest () {
    this.question = this.cards.pop()
    this.variants = [{ text: this.question.value, correct: true }]
    const indexes: any = []
    const translates = this.translates.slice()
    // translates.remove(this.question.value)

    while (this.variants.length < ((this.quantity > 4) ? 4 : this.quantity)) {
      const l = Math.floor(Math.random() * translates.length)

      if (indexes.includes(l)) { continue }

      indexes.push(l)

      this.variants.push({ text: translates[l], correct: false })
    }

    // this.variants.shuffle()
  }
}
</script>

<style scoped>
  .cov-progress {
    background-color:
      #20a0ff;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 5px;
    transition: width .2s ease 0s,opacity .6s ease 0s;
  }
  #puzzle_view, #slider_view, #test_view, #text_view {
    margin-top: 20px;
  }
  #test_view {
    position: relative;
    min-height: 380px;
    border: 1px solid
    #d1dbe5;
    box-shadow: 0 2px 4px 0
    rgba(0,0,0,.12),0 0 6px 0
    rgba(0,0,0,.04);
    background-color:
      #fff;
    color:
      #303133;
    transition: .3s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .variants {
    padding: 20px;
    list-style: none;
  }
  .variants li {
    text-align: center;
    padding: 16px 10px;
    margin: 0;
    font-size: 16px;
    color:
      #777;
    position: relative;
  }
  .variants li > .counter {
    position: absolute;
    left: 10px;
    font-size: 14px;
  }
  .radial-progress-container {
    position: relative;
    margin: 20px auto;
  }
  .demo-result {
    font-family: 'Julius Sans One',sans-serif;
    font-size: 30px;
  }
</style>
