<template lang="pug">
  el-row
    el-col(:span="12", :xs="24", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#text_view(v-cloak)
        div.cov-progress(:style="{width: progress + '%'}")
        p.origtext(v-html="output")
        textarea#transarea.panel(style="height: 100px",
            placeholder="Поле для перевода",
            v-model="inputStream",
            @input="findPosition",
            @click="findPosition",
        )
        el-button.pull-right(:plain="true" @click="clear") Очистить
      el-collapse
        el-collapse-item(title="Помощь" name="helpblock")
          template(v-for="(extra, index) in text.extra")
            el-col(:span="12", :key="index")
              p.pointer(v-on:mouseover="showExtra(extra)" v-on:mouseout="clearExtra")
                span
                  span.text-danger {{extra.orig}}
                  span &nbsp;{{extra.extra}}
    el-col(:span="10", :offset="2", :xs="{span: 24, offset: 0}")
      h2.section-heading Умный перевод
      p.lead.
        Переводите текст, а мы сразу покажем правильные слова и прогресс выполнения.
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { text } from '@/assets/text'
import { syns } from '@/assets/syns'
import { Translate } from '~/models/Translate'
import { BehaviorSubject, Subject } from 'rxjs'

@Component({
  name: 'TextComponent',
})
export default class TextComponent extends Vue {
  private text: Translate = new Translate()

  private inputStream: string = ''
  private input: Subject<string> = new Subject<string>()
  private textSequence: {
    text: string
    selected: boolean
    progress: number
  }[] = [{ text: '', selected: false, progress: 0 }]
  private inputSequence: string[] = []
  private inputObservables: Subject<{ index: number; parts: string[] }>[] = []
  private currentSentenceSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(0)
  private showedExtra: string = ''
  private length: number = 0
  private dictionary: any = []

  @Watch('inputStream')
  private onInputChanged(val: string) {
    this.input.next(val)
  }

  @Watch('progress')
  private async onChange(progress: any) {
    if (progress > 90) {
      this.$notify.success({
        title: this.text.title,
        message: 'translateComplete',
        duration: 3000,
      })
    }
  }

  get progress(): number {
    const count = this.textSequence.reduce(
      (accumulator, currentValue) => accumulator + currentValue.progress,
      0,
    )
    return Math.floor((count * 100) / this.length)
  }

  created() {
    this.input.subscribe((data) => {
      this.inputSequence = this.inputStream.split('.')
      const index = this.currentSentenceSubject.getValue()
      const parts = this.inputSequence[index].split(' ')
      if (index <= this.textSequence.length - 1) {
        this.inputObservables[index].next({ index, parts })
      }
    })

    this.currentSentenceSubject.subscribe((data) => {
      this.textSequence.forEach((sequence) => {
        sequence.selected = false
      })
      if (data <= this.textSequence.length - 1) {
        this.textSequence[data].selected = true
      }
    })

    this.loadText()
  }

  get output(): string {
    let output: string

    output = this.textSequence
      .map((sentence) => {
        if (sentence.selected) {
          return `<span class="active-sentence">${sentence.text}</span>`
        }
        return sentence.text
      })
      .join('. ')

    if (this.showedExtra !== '') {
      output = output.replace(
        new RegExp(`(^|\\s|>)(${this.showedExtra.trim()})([^\\w]|$|<)`, 'gi'),
        '$1<span class="warning-text">$2</span>$3',
      )
    }

    return output
  }

  loadText() {
    this.text = JSON.parse(JSON.stringify(text))
    this.dictionary = JSON.parse(JSON.stringify(syns))
    this.inputObservables = text.text
      .split('.')
      .map((chunk) => new Subject<{ index: number; parts: string[] }>())
    this.inputObservables.forEach((observable) => {
      observable.subscribe((data) => {
        this.rebuild(data)
      })
    })
    this.textSequence = text.text
      .split('.')
      .filter((chunk) => chunk !== '')
      .map((chunk) => ({ text: chunk, selected: false, progress: 0 }))
    this.length = [...new Set(text.text.split(' '))].length
  }

  rebuild(data: { index: number; parts: string[] }) {
    data.parts = data.parts.filter((item) => item !== '')

    const origs: { [key: string]: string } = {}
    const origparts: string[] = []

    data.parts.forEach((el: any) => {
      el = el.toLowerCase()
      if (el !== '' && el in this.dictionary) {
        origparts.push(this.dictionary[el][0])
        origs[this.dictionary[el]] = el
      }
    })

    const searchString: string = origparts.join('|')
      console.log(origparts)
    this.textSequence[data.index].text = this.text.text
      .split('.')
      [data.index].replace(new RegExp(searchString, 'gi'), (match: string) => {
        if (match !== '') {
          return `<span class="success-text" tooltip=${origs[match]}>${match}</span>`
        }
        return match
      })
    this.textSequence[data.index].progress = [...new Set(origparts)].length
  }

  findPosition(ev: any) {
    this.currentSentenceSubject.next(
      this.inputStream.substring(0, ev.target.selectionStart).split('.')
        .length - 1,
    )
  }

  showExtra(extra: any) {
    this.showedExtra = extra.orig
  }

  clearExtra() {
    this.showedExtra = ''
  }

  async clear() {
    await this.loadText()
    this.currentSentenceSubject.next(0)
    this.inputStream = ''
  }
}
</script>

<style lang="scss">
@import '../../assets/css/variables';

.active-sentence {
  background-color: rgba(238, 195, 115, 0.86);
}
span.success-text {
  background-color: #23d160;
  color: #fff;
  align-items: center;
  border-radius: 5px;
  padding: 0;
  vertical-align: top;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
}
#text_view {
  padding: 10px;
  border: 1px solid #e7e7e7;
  background-color: #f8f8f8;
}
#transarea {
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #e7e7e7;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
}
.el-collapse-item__content {
  padding: 10px;
}
.el-collapse-item__header {
  padding-left: 10px;
}
.origtext span {
  position: relative;
  cursor: pointer;
}
.el-collapse-item__content span:hover {
  color: #20a0ff;
}
span[tooltip] {
  &:hover {
    &:after {
      content: attr(tooltip);
      position: absolute;
      top: -38px;
      left: 5px;
      background: #fff;
      color: #303133;
      border: 1px solid #303133;
      margin-bottom: 12px;
      border-radius: 4px;
      padding: 6px 10px;
      z-index: 9000;
      font-size: 12px;
      line-height: 1.2;
      min-width: 10px;
      word-wrap: break-word;
    }
    &:before {
      content: '1';
      position: absolute;
      top: -10px;
      left: 12px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #000;
      overflow: hidden;
    }
  }
}
span.warning-text {
  background-color: $danger-color;
  color: #fff;
  align-items: center;
  border-radius: 5px;
  padding-left: 0.1em;
  padding-right: 0.1em;
  vertical-align: top;
  white-space: nowrap;
}
</style>
