<template lang="pug">
  div
    div.parallax-container
      div.parallax-wrapper
        el-image(v-parallax="0.5", style="width: 100%;", :src="imageSrc", :fit="'cover'")
        div.row(style="position: relative;")
          div.col-lg-12
            div.intro-message(style="color: rgb(255, 255, 255)")
              h1 Scandinaver
              p(v-html="text")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'Head'
  })
export default class HeadComponent extends Vue {
  private text: string = '"Я изучаю исландский язык не для того, чтобы научиться политике, приобрести военные знания и' +
    '  т. п., <br/> ' +
    '    но для того, чтобы научиться образу мыслей мужа, для того, чтобы избавиться<br/>' +
    '    от укоренившегося во мне с детства благодаря воспитанию духа убожества и рабства,<br/>' +
    '    для того, чтобы закалить мысль и душу так, чтобы я мог без трепета идти навстречу опасности <br/>' +
    '    и чтобы моя душа предпочла скорее расстаться с телом,<br/>' +
    '    чем отречься от того, в истинности и правоте чего она непоколебимо убеждена."<br/>' +
    '    Rasmus Christian Rask'

    private imageSrc: string = require('@/assets/head-bg.jpg')
}
</script>

<style scoped>
  .parallax-container{
    height: 800px;
    overflow: hidden;
  }
  .parallax-wrapper{

  }
  .el-image{
    width: 100%;
    transform: translate3d(0px, 92.25px, 0px);
    overflow: hidden;
    position: absolute;
    height: 800px;
  }
  .el-image__inner{
    object-fit: contain;
    position: absolute;
    top: 0;
  }
  .intro-message{
    color: rgb(255, 255, 255);
    padding: 300px 20%;
    z-index: 1000;
  }
</style>
