<template>
    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-carousel :selected.sync="selected" card>
                <x-carousel-item name="1">
                    <div class="box" style="background-color: #f0f0ee;height: 210px">
                        1
                    </div>
                </x-carousel-item>
                <x-carousel-item name="2">
                    <div class="box" style="background-color: #aaaaa7;height: 210px">
                        2
                    </div>
                </x-carousel-item>
                <x-carousel-item name="3">
                    <div class="box" style="background-color: #d7d7d4;height: 210px">
                        3
                    </div>
                </x-carousel-item>
                <x-carousel-item name="4">
                    <div class="box" style="background-color: #c3c3c1;height: 210px">
                        4
                    </div>
                </x-carousel-item>
                <x-carousel-item name="5">
                    <div class="box" style="background-color: #b8b8b4;height: 210px">
                        5
                    </div>
                </x-carousel-item>
                <x-carousel-item name="6">
                    <div class="box" style="background-color: #e3e3e0;height: 210px">
                        6
                    </div>
                </x-carousel-item>
            </x-carousel>
        </div>
        <br>
        <br>
        <br>
        <x-collapse :selected.sync="selectTab1" exhibition>

            <template slot="description">
                <div style="color: #666666">
                    使用 <code>card</code>可以改成卡片化样式，默认高度为`210px`。可以点击两侧图片切换。
                </div>
            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                <div v-html="html"></div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>
<script>
    import Carousel from '../../../src/Exhibition/carousel'
    import carouselItem from '../../../src/Exhibition/carousel-item'
    import plugin from '../../../src/tickling/plugin.js'
    import Button from '../../../src/currency/button'
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
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
                selectTab1:[1],
                selected:'1',
                input1:'```html\n' +
                    '<x-carousel :selected.sync="selected" card>\n' +
                    '  <x-carousel-item name="1">\n' +
                    '    <div class="box">\n' +
                    '     1\n' +
                    '    </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="2">\n' +
                    '    <div class="box">\n' +
                    '     2\n' +
                    '    </div>\n' +
                    '   </x-carousel-item>\n' +
                    '   <x-carousel-item name="3">\n' +
                    '    <div class="box">\n' +
                    '     3\n' +
                    '    </div>\n' +
                    '   </x-carousel-item>\n' +
                    '   <x-carousel-item name="4">\n' +
                    '    <div class="box">\n' +
                    '     4\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="5">\n' +
                    '   <div class="box">\n' +
                    '     5\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="6">\n' +
                    '   <div class="box">\n' +
                    '     6\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '</x-carousel>\n' +
                    '```'
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
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>
<style>

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
