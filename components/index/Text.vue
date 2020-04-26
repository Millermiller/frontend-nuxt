<template lang="pug">
  el-row
    el-col(:span="12", :xs="24", data-aos="fade-right", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div#text_view(v-cloak)
        div.cov-progress(:style="{width: progress + '%'}")
        p.origtext(v-html="output")
        textarea#transarea.panel(style="height: 100px", placeholder="Поле для перевода", v-model="input", @input="separate")
        el-button.pull-right(:plain="true" @click="clear") Очистить
      el-collapse
        el-collapse-item(title="Помощь" name="helpblock")
          template(v-for="(extra, index) in text.text_extra")
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
import { Component, Vue } from 'vue-property-decorator'
import { text } from '@/assets/text'
import { syns } from '@/assets/syns'

  @Component({
    name: 'TextComponent'
  })
export default class TextComponent extends Vue {
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
          re, '$1<span class="text-success" tooltip=' + tooltip + '>$2</span>$3'
        )

        if (result) { c += (word.split(' ').length) * result.length } else { c += word.split(' ').length }
      }

      if (this.showedExtra !== '') {
        this.text.computed = this.text.computed.replace(
          new RegExp('(^|\\s|>)(' + this.showedExtra.trim() + ')([^\\w]|$|<)', 'gi'),
          '$1<span class="text-info">$2</span>$3'
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

<style>
  #text_view {
    padding: 10px;
    border: 1px solid #e7e7e7;
    background-color: #f8f8f8;
  }
  #transarea{
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
  .el-collapse-item__header{
    padding-left: 10px;
  }
  .origtext span {
    position: relative;
    cursor: pointer;
  }
  .el-collapse-item__content span:hover {
    color: #20a0ff;
  }
  span[tooltip]:hover::after {
    content:attr(tooltip);
    padding:0 4px;
    color:#333;
    position:absolute;
    left:13px;
    top:-22px;
    white-space:nowrap;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    border-radius:5px;
    border:1px solid #F56C6C;
    background-color:#fff
  }
</style>
