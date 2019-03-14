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
        <br>
        <br>
        <br>
        <x-collapse :selected.sync="selectTab1" exhibition>

            <template slot="description">
                <div style="color: #999999">
                    每个<code>item</code>必须得对应一个索引数字 <code>name</code>,你可以在外面控制这个组件的宽度高度。
                    <br>
                    这里面的代码展示不能高亮,我 <code>TM</code>也不知道为什么,<code>highLight.js</code>和这个组件似乎有冲突，一用高亮就卡死,我TM也是醉了，草。
                    <br>
                    后面再考虑解决这个问题，现在以我的能力实在是没办法
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
                    '<x-carousel :selected.sync="selected">\n' +
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
