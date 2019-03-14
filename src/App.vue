<template>
  <div style="margin-top: 30px">

    <div style="margin-top: 20px">

          <x-carousel :selected.sync="selected">
            <x-carousel-item name="1">
              <div class="box">
                1
              </div>
            </x-carousel-item>
            <x-carousel-item name="2">
              <div class="box">
                2
              </div>
            </x-carousel-item>
            <x-carousel-item name="3">
              <div class="box">
                3
              </div>
            </x-carousel-item>
            <x-carousel-item name="4">
              <div class="box">
                4
              </div>
            </x-carousel-item>
            <x-carousel-item name="5">
              <div class="box">
                5
              </div>
            </x-carousel-item>
            <x-carousel-item name="6">
              <div class="box">
                6
              </div>
            </x-carousel-item>

          </x-carousel>

    </div>
  </div>
</template>
<script>
    import Carousel from './Exhibition/carousel'
    import carouselItem from './Exhibition/carousel-item'
    import plugin from './tickling/plugin.js'
    import Button from './currency/button'
    import collapse from './Exhibition/collapse'
    import collapseItem from './Exhibition/collapse-item'
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'
    import marked from 'marked'
    import Vue from 'vue'
    Vue.directive('highlight', (el) => {
        let blocks = el.querySelectorAll('pre code')
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    })
    Vue.use(plugin)
    export default {
        name: "slides-default",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-carousel :selected.sync="selected">\n' +
                    '  <x-carousel-item name="1">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '<x-carousel-item name="2">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://img.juimg.com/tuku/yulantu/110123/292-11012313544655.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '<x-carousel-item name="3">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/lvpics/w=1000/sign=a669f57d3a12b31bc76cc929b628377a/503d269759ee3d6d801feef140166d224f4ade2b.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '<x-carousel-item name="4">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://img.bimg.126.net/photo/31kQlCGP44-34Q5yxvoqmw==/5770237022569104952.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '<x-carousel-item name="5">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/lvpics/w=1000/sign=a669f57d3a12b31bc76cc929b628377a/503d269759ee3d6d801feef140166d224f4ade2b.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '<x-carousel-item name="6">\n' +
                    '    <div class="box">\n' +
                    '      <img src="http://img.bimg.126.net/photo/Vhfv3GNwUvVBHERAiE3UGw==/5770237022569104955.jpg" alt="">\n' +
                    '    </div>\n' +
                    '</x-carousel-item>\n' +
                    '</x-carousel>\n' +
                    '```',
                input2:'',
                selected:'1'
            }
        },
        methods:{

        },
        components:{
            'x-carousel':Carousel,
            'x-carousel-item':carouselItem,
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
        },
        computed: {
            html() {
                return marked(this.input1)
            },
            js() {
                return marked(this.input2)
            },
        },
    }
</script>
<style>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  .wrapper {
    margin: 40px;
  }
  .box {
    width: 100%;
    height: 350px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
</style>
