<template lang="pug">
  el-row
    el-col(:span="12", :xs="24", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#text_view(v-cloak)
        div.cov-progress(:style="{width: progress + '%'}")
        p.origtext(v-html="output")
        textarea#transarea.panel(style="height: 100px",
            placeholder="Поле для перевода",
            v-model="inputStream",
            @input="findPosition($event)",
            @click="findPosition($event)",
        )
        el-button.pull-right(:plain="true" @click="clear") Очистить
      el-collapse
        el-collapse-item(title="Помощь" name="helpblock")
          template(v-for="(tooltip, index) in textEntity.tooltips")
            el-col(:span="12", :key="index")
              p.pointer(v-on:mouseover="showTooltip(tooltip)" v-on:mouseout="clearTooltip")
                span
                  span.text-danger {{tooltip.object}}
                  span &nbsp; - {{tooltip.value}}
    el-col(:span="10", :offset="2", :xs="{span: 24, offset: 0}")
      h2.section-heading {{$tc('blocks.text.title')}}
      p.lead {{$tc('blocks.text.description')}}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BehaviorSubject, from, Observable, ObservedValueOf, Subject } from 'rxjs'
import { plainToClass } from 'class-transformer'
import DictionaryItem from '../../models/DictionaryItem'
import Synonym from '../../models/Synonym'
import Tooltip from '../../models/Tooltip'
import { Translate } from '~/models/Translate'
import * as textData from '~/assets/text.example.json'

@Component({
  name: 'TextComponent'
})
export default class TextComponent extends Vue {
  private textEntity: Translate = new Translate()

  private showedTooltip: string = ''
  private length: number = 0
  public loading: boolean = false
  private inputStream: string = ''
  public input: Subject<string> = new Subject<string>()
  private textSequence: {
    text: string
    selected: boolean
    progress: number
  }[] = [{ text: '', selected: false, progress: 0 }]

  private inputObservables: Subject<{ index: number; parts: string[] }>[] = []
  private outputObservables: Observable<ObservedValueOf<string>>[] = []
  private currentSentenceSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
    >(0)

  @Watch('inputStream')
  private onInputChanged (val: string): void {
    this.input.next(val)
  }

  async mounted() {
    await this.load()
  }

  created() {
    this.input.subscribe((data) => {
      const index = this.currentSentenceSubject.getValue()
      const parts = this.inputStream.split('.')[index].split(' ')
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
  }

  load() {
    this.textEntity = plainToClass(Translate, textData.default)
    this.textEntity.dictionary.map((item: DictionaryItem) => {
      item.values.push(item.value.toLowerCase())
      return item.synonyms.map((synonym: Synonym) => item.values.push(synonym.value.toLowerCase()))
    })

    this.outputObservables = this.textEntity.text
      .split('.').filter(chunk => chunk !== '')
      .map(chunk => from(chunk))

    this.inputObservables = this.textEntity.text
      .split('.')
      .map(chunk => new Subject<{ index: number; parts: string[] }>())

    this.inputObservables.forEach((observable) => {
      observable.subscribe((data) => {
        this.rebuild(data)
      })
    })

    this.textSequence = this.textEntity.text
      .split('.')
      .filter(chunk => chunk !== '')
      .map(chunk => ({
        text: chunk,
        selected: false,
        progress: 0
      }))

    this.length = this.textEntity.dictionary.length
  }

  // highlight text
  private rebuild (data: { index: number; parts: string[] }): void {
    data.parts = data.parts.filter(item => item !== '')

    const usedDictionaryItems: DictionaryItem[] = []

    data.parts.forEach((el: any) => {
      const dictionaryItem = this.findDictionaryItem(el, data.index)
      if (dictionaryItem !== undefined && usedDictionaryItems.find(el => el.id === dictionaryItem.id) === undefined) {
        dictionaryItem.value = el
        usedDictionaryItems.push(dictionaryItem)
      }
    })

    const coordinates: any[][] = usedDictionaryItems.map(item => item.coordinates)
    const starts: number[] = coordinates.map(item => item.map(subitem => subitem[0])).flat()
    const ends: number[] = coordinates.map(item => item.map(subitem => subitem[1])).flat()
    let output = ''
    let counter = 0
    let chunk = ''

    this.outputObservables[data.index].subscribe((data: string) => {
      chunk = data
      // const position1 = starts.includes(counter)
      const position1 = usedDictionaryItems.find((item: DictionaryItem) => item.coordinates.find((coord: any) => coord[0] === counter))
      if (position1) {
        chunk = `<span class="extra" style="--tooltip-color:${position1.color}; background-color: ${position1.color}" tooltip="${position1.value}">${chunk}`
      }

      const position2 = ends.includes(counter)
      if (position2) {
        chunk = `${chunk}</span>`
      }

      output += chunk
      counter++
    })

    this.textSequence[data.index].text = output

    this.textSequence[data.index].progress = [...new Set(usedDictionaryItems)].length
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

    if (this.showedTooltip !== '' && this.showedTooltip !== undefined) {
      output = output.replace(
        new RegExp(`(^|\\s|>)(${this.showedTooltip.trim()})([^\\w]|$|<)`, 'gi'),
        '$1<span class="warning-text">$2</span>$3'
      )
    }

    return output
  }

  public findPosition(ev: any): void {
    this.currentSentenceSubject.next(
      this.inputStream.substring(0, ev.target.selectionStart).split('.').length - 1
    )
  }

  private findDictionaryItem(search: string, sentenceNum: number): DictionaryItem {
    search = search.replace(',', '').toLowerCase()
    return this.textEntity.dictionary.find(item => item.sentenceNum === sentenceNum && item.values.includes(search))
  }

  get progress(): number {
    const count = this.textSequence.reduce(
      (accumulator, currentValue) => accumulator + currentValue.progress,
      0
    )
    return Math.floor((count * 100) / this.length)
  }

  public showTooltip(tooltip: Tooltip): void {
    this.showedTooltip = tooltip.object
  }

  public clearTooltip(): void {
    this.showedTooltip = ''
  }

  async clear() {
    await this.load()
    this.currentSentenceSubject.next(0)
    this.inputStream = ''
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.extra {
  color: white;
  border-radius: 2px;
}
.active-sentence {
  border-bottom: 1px solid $danger-color;
}
h2 {
  border-bottom: 1px solid #777;
  margin-bottom: 10px;
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
  background-color: #fff;
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
  font-size: 14px;
  font-family: inherit;
}
.el-collapse-item__content {
  padding: 10px;
}
.el-collapse-item__header {
  padding-left: 10px;
}
.origtext {
  font-size: 20px;
  span {
    position: relative;
    cursor: pointer;
    .active-sentence {
      background-color: #81D4FA70;
    }
  }
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
