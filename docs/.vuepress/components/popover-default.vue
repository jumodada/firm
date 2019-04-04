<template>

    <div style="margin-top: 50px">


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-left: 100px;">
                        <x-popover position="left">
                            <template slot="content" slot-scope="close">
                                <div>支持内部关闭</div>
                                <x-button @click="close.close">关闭</x-button>
                            </template>
                            <x-button>左边</x-button>
                        </x-popover>
                        <x-popover position="bottom">
                            <template slot="content">
                                <div>popover内容</div>
                            </template>
                            <x-button>底部</x-button>
                        </x-popover>
                        <x-popover>
                            <template slot="content">
                                <div>
                                    <a href="https://www.baidu.com">去百度</a>
                                </div>
                            </template>
                            <x-button>顶部</x-button>
                        </x-popover>
                        <x-popover position="right">
                            <template slot="content">
                                <div>popover内容</div>
                            </template>
                            <x-button>右边</x-button>
                        </x-popover>
                    </div>
                    <div style="margin-left: 100px; margin-top: 60px">
                        <x-popover position="left" theme="whiteBg">
                            <template slot="content" slot-scope="close">
                                <div>支持内部关闭</div>
                                <x-button @click="close.close">关闭</x-button>
                            </template>
                            <x-button>左边</x-button>
                        </x-popover>
                        <x-popover position="bottom" theme="whiteBg">
                            <template slot="content">
                                <div>popover内容</div>
                            </template>
                            <x-button>底部</x-button>
                        </x-popover>
                        <x-popover theme="whiteBg">
                            <template slot="content">
                                <div class="xxx">
                                    <div class="xx">
                                        <x-button>点我</x-button>
                                    </div>
                                </div>
                                <div>
                                    <a href="https://www.baidu.com">去百度</a>
                                </div>
                            </template>
                            <x-button>顶部</x-button>
                        </x-popover>
                        <x-popover position="right" theme="whiteBg">
                            <template slot="content">
                                <div>popover内容</div>
                            </template>
                            <x-button>右边</x-button>
                        </x-popover>
                        <x-popover position="top" theme="whiteBg">
                            <template slot="content">
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                                <x-button>点我</x-button>
                            </template>
                            <x-button>超出</x-button>
                        </x-popover>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div style="color: #666666">通过设置 <code>position</code> 可以改变气泡框弹出的位置
                        <br>
                        默认位置是在顶部
                        <br>
                        内部可嵌入元素调用外面close关闭的功能，只需绑定slot-scope。

                        <br>
                        可以设置 <code>theme</code>改变气泡的样式，目前只有默认的和<code>whiteBg</code>主题。
                        <br>
                        规定了气泡的大小，如果超出会以scroll展示
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
                    '<x-popover position="left">\n' +
                    '<template slot="content" slot-scope="close">\n' +
                    ' <div>支持内部关闭</div>\n' +
                    ' <x-button @click="close.close">关闭</x-button>\n' +
                    '</template>\n' +
                    '  <x-button>左边</x-button>\n' +
                    '</x-popover>\n' +
                    '\n' +
                    '<x-popover position="bottom">\n' +
                    '<template slot="content">\n' +
                    '  <div>popover内容</div>\n' +
                    '  </template>\n' +
                    ' <x-button>底部</x-button>\n' +
                    '</x-popover>\n' +
                    '\n' +
                    '<x-popover>\n' +
                    '<template slot="content">\n' +
                    ' <div>\n' +
                    ' <a href="https://www.baidu.com">去百度</a>\n' +
                    ' </div>\n' +
                    '</template>\n' +
                    '<x-button>顶部</x-button>\n' +
                    '</x-popover>\n' +
                    '\n' +
                    '<x-popover position="right">\n' +
                    '<template slot="content">\n' +
                    '   <div>popover内容</div>\n' +
                    '</template>\n' +
                    '<x-button>右边</x-button>\n' +
                    '</x-popover>\n' +
                    '\n' +
                    '<x-popover position="right" theme="whiteBg">\n' +
                    '<template slot="content">\n' +
                    '   <div>popover内容</div>\n' +
                    '  </template>\n' +
                    '  <x-button>右边</x-button>\n' +
                    '</x-popover>\n' +
                    '\n' +
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
