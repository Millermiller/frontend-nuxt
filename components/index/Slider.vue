<template lang="pug">
  el-row
    el-col(:span="12", :xs="24")
      h2.section-heading {{$t('blocks.slider.title')}}
      p.lead {{$t('blocks.slider.description')}}
    el-col(:span="12", :xs="24", data-aos="fade-left", data-aos-offset="10", data-aos-delay="100", data-aos-duration="1000")
      div(v-swiper:mySwiper="swiperOptionA")
        div.swiper-wrapper
          div.swiper-slide(v-for="(card, index) in cards", :key="index")
            div.slide
              p.word {{card.word}}
              template(v-if="!card.nocontrols")
                div.translate-area.pointer(@click="showTranslate(index)")
                  template(v-if="card.show")
                    p.slide-value {{card.value}}
                    el-divider
                    div.example-area
                      template(v-for="example in card.examples")
                        div.example-item
                          p.example-text(v-html="example.text")
                          i.example-value(v-html="example.value")
                          i.icon.el-icon-paperclip
                  i.el-icon-switch-button.open(v-else)
                i(:class="['pointer favourite-button', card.favourite ? activeClass : defaultClass]", @click="favourite(index)")
                i.playicon.el-icon-video-play.pointer(@click="play(card)")
        div.swiper-pagination.swiper-pagination-bullets
        div.swiper-button-prev(slot="button-prev")
        div.swiper-button-next(slot="button-next")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { cardsArray } from '~/assets/cards'

@Component({
  name: 'Slider'
})
export default class Slider extends Vue {
  private activeClass: string = 'el-icon-star-on'
  private defaultClass: string = 'el-icon-star-off'
  private cards: any[] = []
  private swiperOptionA: any = {
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 1.5,
    loop: false
  }

  mounted () {
    this.cards = cardsArray.slice()
    // this.cards.shuffle()
  }

  get swiperA () {
    // @ts-ignore
    return this.$refs.awesomeSwiperA.swiper
  }

  onSetTranslate () {
    // console.log('onSetTranslate')
  }

  showTranslate (index: number) {
    this.cards[index].show = !this.cards[index].show
  }

  play (card: any) {
    // @ts-ignore
    new Audio(card.audio).play()
  }

  favourite (index: number) {
    this.cards[index].favourite = !this.cards[index].favourite
  }
}
</script>

<style scoped lang="scss">
h2 {
  border-bottom: 1px solid #777;
  margin-bottom: 10px;
}
.swiper-container {
  padding: 1px;
  width: 100%;
  height: 40vh;
  min-height: 380px;
  margin-bottom: 10px;
  cursor: grab;
}
.swiper-slide {
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide-active {
  -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.75);
  transform: translate3d(0, 0, 0) rotateX(0) rotateY(0) !important;
}
.slide {
  padding: 10px;
  height: 100%;
  width: 100%;
  position: relative;
  text-align: center;
  font-size: 16px;
  .word {
    font-size: 24px;
  }
}
.word {
  text-align: center;
  font-size: 2em;
  padding-bottom: 10px;
}
.pointer {
  cursor: pointer;
}
.translate-area {
  position: relative;
  min-height: 80%;
  border: 1px solid #dadada;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  padding: 10px 0;
  .slide-value {
    font-size: 24px;
  }
  .example-area {
    width: 100%;
    .example-item {
      padding-bottom: 10px;
      position: relative;
      .example-text {
        font-weight: bold;
      }
      .icon {
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }
  }
}
.open {
  font-size: 10em;
  color: #dadada;
  cursor: pointer;
}
.playicon {
  position: absolute;
  bottom: 40px;
  right: 15px;
  font-size: 30px;
}
.favourite-button {
  position: absolute;
  bottom: 40px;
  left: 15px;
  font-size: 30px;
  &:hover {
    color: #ff4949;
  }
}
.el-icon-star-on {
  color: #ff4949;
}
</style>
