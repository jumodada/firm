<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                        <x-carousel :selected.sync="selected">
                            <x-carousel-item name="1">
                                <div class="box">
                                    <img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg" alt="">
                                </div>
                            </x-carousel-item>
                            <x-carousel-item name="2">
                                <div class="box">
                                    <img src="http://img.juimg.com/tuku/yulantu/110123/292-11012313544655.jpg" alt="">
                                </div>
                            </x-carousel-item>
                            <x-carousel-item name="3">
                                <div class="box">
                                    <img src="http://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/lvpics/w=1000/sign=a669f57d3a12b31bc76cc929b628377a/503d269759ee3d6d801feef140166d224f4ade2b.jpg" alt="">
                                </div>
                            </x-carousel-item>
                            <x-carousel-item name="4">
                                <div class="box">
                                    <img src="http://img.bimg.126.net/photo/31kQlCGP44-34Q5yxvoqmw==/5770237022569104952.jpg" alt="">
                                </div>
                            </x-carousel-item>
                            <x-carousel-item name="5">
                                <div class="box">
                                    <img src="http://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/lvpics/w=1000/sign=a669f57d3a12b31bc76cc929b628377a/503d269759ee3d6d801feef140166d224f4ade2b.jpg" alt="">
                                </div>
                            </x-carousel-item>
                            <x-carousel-item name="6">
                                <div class="box">
                                    <img src="http://img.bimg.126.net/photo/Vhfv3GNwUvVBHERAiE3UGw==/5770237022569104955.jpg" alt="">
                                </div>
                            </x-carousel-item>

                        </x-carousel>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div style="color: #666666">每个<code>item</code>都必须对应一个数字的<code>name</code>，默认开启轮播展示。
                    </div>
                </template>
                <x-collapse-item name="1" title="代码">
                    <div  v-highlight v-html="html"></div>
                    <br>
                    <br>
                    <div  v-highlight v-html="js"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import Carousel from '../../../src/carousel'
    import carouselItem from '../../.././src/carousel-item'
    import plugin from '../../.././src/plugin.js'
    import Button from '../../.././src/button'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
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

<style scoped>
        .box{
            height: 400px;
            width: 100%;
            background: #ddd;
        }
</style>
