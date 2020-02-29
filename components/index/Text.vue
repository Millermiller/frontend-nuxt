<template lang="pug">
  el-row
    el-col(:span="12", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#text_view(v-cloak)
        div.cov-progress(:style="{width: progress + '%'}")
        p.origtext(v-html="output")
        textarea#transarea.panel(style="height: 100px", placeholder="Поле для перевода", v-model="input", @input="separate")
        button.pull-right.btn.btn-warning(:plain="true" @click="clear") Очистить
      el-collapse
        el-collapse-item(title="Помощь" name="helpblock")
          template(v-for="(extra, index) in text.text_extra")
            el-col(:span="12", :key="index")
              p.pointer(v-on:mouseover="showExtra(extra)" v-on:mouseout="clearExtra")
                span {{extra.orig}} {{extra.extra}}
    el-col(:span="10", :offset="2")
      h2.section-heading Новые уровни
      p.lead.
        Проверяйте свои знания и открывайте новые словари, проходя тесты.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { text } from '@/assets/text'
import { syns } from '@/assets/syns'

  @Component({
    name: 'TextComponent'
  })
export default class extends Vue {
    private text: any = {
      computed: '',
      created_at: '',
      updated_at: '',
      id: 0,
      published: 1,
      text: '',
      text_extra: [],
      title: '',
      words_count: 0
    }

    private dictionary: any[] = []
    private input: string = ''
    private inputWords: any[] = []
    private showedExtra: string = ''
    private showSuccess: boolean = false
    private progress: number = 0
    private nextTextId: number = 0
    private dictionaryLength: number = 0

    mounted () {
      this.loadText()
    }

    get output () {
      let c = 0
      let origs: any[] = []
      this.dictionaryLength = this.dictionary.length
      this.text.computed = this.text.text

      this.inputWords.forEach((el) => {
        el = el.toLowerCase()
        if (el !== '' && el in this.dictionary) {
          origs = origs.concat(this.dictionary[el].map((item: any) => {
            // eslint-disable-next-line no-return-assign
            return item = item + '|' + el
          }))
        }
      })

      origs = origs.filter((v, i, a) => a.indexOf(v) === i)

      for (let i = 0; i < origs.length; i++) {
        const arr = origs[i].split('|')
        const word = arr[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
        const tooltip = arr[1]

        const re = new RegExp('(^|\\s)(' + word.trim() + ')([^\\w]|$)', 'gi')
        const result = this.text.computed.match(re)

        this.text.computed = this.text.computed.replace(
          re, '$1<span class="success-text" tooltip=' + tooltip + '>$2</span>$3'
        )

        if (result) { c += (word.split(' ').length) * result.length } else { c += word.split(' ').length }
      }

      if (this.showedExtra !== '') {
        this.text.computed = this.text.computed.replace(
          new RegExp('(^|\\s|>)(' + this.showedExtra.trim() + ')([^\\w]|$|<)', 'gi'),
          '$1<span class="warning-text">$2</span>$3'
        )
      }

      this.progress = Math.floor((c * 100) / this.text.words_count)

      if (this.progress > 99) { this.showSuccess = true }

      return this.text.computed
    }

    loadText () {
      this.clear()
      this.text = JSON.parse(JSON.stringify(text))
      this.text.computed = this.text.text
      this.dictionary = JSON.parse(JSON.stringify(syns))
    }

    separate () {
      this.inputWords = this.input.replace(/\s+/g, ' ').replace(/\./g, ' ').replace(/\,/g, '').trim().split(' ')
    }

    showExtra (extra: any) {
      this.showedExtra = extra.orig
    }

    clearExtra () {
      this.showedExtra = ''
    }

    clear () {
      this.input = ''
      this.inputWords = []
      this.progress = 0
    }
}
</script>

<style scoped>
  #text_view {
    padding: 10px;
    border: 1px solid #e7e7e7;
    background-color: #f8f8f8;
  }
  #transarea{
    border-radius: 2px;
    border: 0;
    -webkit-box-shadow: 0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12);
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.12),0 1px 6px 0 rgba(0,0,0,.12);
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 10px;
    width: 100%;
  }
  span.success-text {
    background-color: #23d160;
    color: #fff;
    align-items: center;
    border-radius: 5px;
    padding-left: .1em;
    padding-right: .1em;
    vertical-align: top;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
  }
</style>
