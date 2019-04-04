<template>

    <div style="margin-top: 50px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-left: 100px;">

                        <x-popover position="topLeft">
                            <template slot="content">
                                <div>topLeft</div>
                                <div>topLeft</div>
                                <div>topLeft</div>
                            </template>
                            <x-button>TL</x-button>
                        </x-popover>
                        <x-popover position="top">
                            <template slot="content">
                                <div>top</div>
                                <div>top</div>
                                <div>top</div>
                            </template>
                            <x-button>top</x-button>
                        </x-popover>
                        <x-popover position="topRight">
                            <template slot="content">
                                <div>topRight</div>
                                <div>topRight</div>
                                <div>topRight</div>
                            </template>
                            <x-button>TR</x-button>
                        </x-popover>
                    </div>
                    <div style="margin-left: 30px;margin-top: 30px;display: inline-flex;flex-direction: column;">

                        <x-popover position="leftTop" style="margin-bottom: 10px">
                            <template slot="content">
                                <div>leftTop</div>
                                <div>leftTop</div>
                                <div>leftTop</div>
                            </template>
                            <x-button>L T</x-button>
                        </x-popover>
                        <x-popover position="left" style="margin-bottom: 10px">
                            <template slot="content">
                                <div>left</div>
                                <div>left</div>
                                <div>left</div>
                            </template>
                            <x-button>left</x-button>
                        </x-popover>
                        <x-popover position="leftBottom">
                            <template slot="content">
                                <div>leftBottom</div>
                                <div>leftBottom</div>
                                <div>leftBottom</div>
                            </template>
                            <x-button>L B</x-button>
                        </x-popover>
                    </div>
                    <div style="margin-left: 190px;margin-top: 30px;display: inline-flex;flex-direction: column;">

                        <x-popover position="rightTop" style="margin-bottom: 10px">
                            <template slot="content">
                                <div>rightTop</div>
                                <div>rightTop</div>
                                <div>rightTop</div>
                            </template>
                            <x-button>R T</x-button>
                        </x-popover>
                        <x-popover position="right" style="margin-bottom: 10px">
                            <template slot="content">
                                <div>right</div>
                                <div>right</div>
                                <div>right</div>
                            </template>
                            <x-button style="font-size: 12px">Right</x-button>
                        </x-popover>
                        <x-popover position="rightBottom">
                            <template slot="content">
                                <div>rightBottom</div>
                                <div>rightBottom</div>
                                <div>rightBottom</div>
                            </template>
                            <x-button>R B</x-button>
                        </x-popover>
                    </div>
                    <div style="margin-left: 86px;margin-top: 30px">

                        <x-popover position="bottomLeft">
                            <template slot="content">
                                <div>bottomLeft</div>
                                <div>bottomLeft</div>
                                <div>bottomLeft</div>
                            </template>
                            <x-button>BL</x-button>
                        </x-popover>
                        <x-popover position="bottom">
                            <template slot="content">
                                <div>top</div>
                                <div>top</div>
                                <div>top</div>
                            </template>
                            <x-button>bottom</x-button>
                        </x-popover>
                        <x-popover position="bottomRight">
                            <template slot="content">
                                <div>bottom</div>
                                <div>bottom</div>
                                <div>bottom</div>
                            </template>
                            <x-button>BR</x-button>
                        </x-popover>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div style="color: #666666">通过设置 <code>trigger</code> 可以改变触发气泡框弹出的方式
                        <br>
                        默认click触发


                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div  v-highlight v-html="html"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import popover from '../../../src/Exhibition/popover'
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import Button from '../../../src/currency/button'
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

    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                input1:'\n' +
                    '```html\n' +
                    ' <div style="margin-left: 100px;">\n' +
                    '\n' +
                    '                        <x-popover position="topLeft">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>topLeft</div>\n' +
                    '                                <div>topLeft</div>\n' +
                    '                                <div>topLeft</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>TL</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="top">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>top</div>\n' +
                    '                                <div>top</div>\n' +
                    '                                <div>top</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>top</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="topRight">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>topRight</div>\n' +
                    '                                <div>topRight</div>\n' +
                    '                                <div>topRight</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>TR</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                    </div>\n' +
                    '                    <div style="margin-left: 30px;margin-top: 30px;display: inline-flex;flex-direction: column;">\n' +
                    '\n' +
                    '                        <x-popover position="leftTop" style="margin-bottom: 10px">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>leftTop</div>\n' +
                    '                                <div>leftTop</div>\n' +
                    '                                <div>leftTop</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>L T</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="left" style="margin-bottom: 10px">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>left</div>\n' +
                    '                                <div>left</div>\n' +
                    '                                <div>left</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>left</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="leftBottom">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>leftBottom</div>\n' +
                    '                                <div>leftBottom</div>\n' +
                    '                                <div>leftBottom</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>L B</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                    </div>\n' +
                    '                    <div style="margin-left: 190px;margin-top: 30px;display: inline-flex;flex-direction: column;">\n' +
                    '\n' +
                    '                        <x-popover position="rightTop" style="margin-bottom: 10px">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>rightTop</div>\n' +
                    '                                <div>rightTop</div>\n' +
                    '                                <div>rightTop</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>R T</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="right" style="margin-bottom: 10px">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>right</div>\n' +
                    '                                <div>right</div>\n' +
                    '                                <div>right</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button style="font-size: 12px">Right</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="rightBottom">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>rightBottom</div>\n' +
                    '                                <div>rightBottom</div>\n' +
                    '                                <div>rightBottom</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>R B</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                    </div>\n' +
                    '                    <div style="margin-left: 86px;margin-top: 30px">\n' +
                    '\n' +
                    '                        <x-popover position="bottomLeft">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>bottomLeft</div>\n' +
                    '                                <div>bottomLeft</div>\n' +
                    '                                <div>bottomLeft</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>BL</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="bottom">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>top</div>\n' +
                    '                                <div>top</div>\n' +
                    '                                <div>top</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>bottom</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                        <x-popover position="bottomRight">\n' +
                    '                            <template slot="content">\n' +
                    '                                <div>bottom</div>\n' +
                    '                                <div>bottom</div>\n' +
                    '                                <div>bottom</div>\n' +
                    '                            </template>\n' +
                    '                            <x-button>BR</x-button>\n' +
                    '                        </x-popover>\n' +
                    '                    </div>\n' +
                    '```'
            }
        },
        methods:{

        },
        components:{
            'x-popover':popover,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
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

<style scoped>

</style>
