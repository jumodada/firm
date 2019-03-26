<template>
    <div>


        <div style="margin-top: 90px">
            <x-tabs :selected.sync="selected">
                <x-tabs-item item="经济" name="1">
                    财经报道
                </x-tabs-item>
                <x-tabs-item item="体育" name="2" disabled>体育xxxxxxx</x-tabs-item>
                <x-tabs-item item="民生" name="3" disabled>民生xxxxxxx</x-tabs-item>
                <x-tabs-item item="游戏" name="4">
                    带带大师兄
                </x-tabs-item>
                <x-tabs-item item="科技" name="5" >
                    科技新闻
                </x-tabs-item>
                <x-tabs-item item="军事" name="6">
                    各国军事
                </x-tabs-item>
            </x-tabs>
        </div>

    </div>

</template>

<script>

    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import Button from '../../../src/currency/button'
    import Tabs from '../../../src/Exhibition/tabs'
    import TabsItem from '../../../src/Exhibition/tabs-item'
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
        name: "button-demo-default",
        data(){
            return {
                selectTab:['1'],
                selected:'1',
                input:'```html\n' +
                    '       <x-button>默认按钮</x-button>\n' +
                    '       <x-button type="primary">主要按钮</x-button>\n' +
                    '       <x-button type="info">信息按钮</x-button>\n' +
                    '       <x-button type="success">成功按钮</x-button>\n' +
                    '       <x-button type="warn">警告按钮</x-button>\n' +
                    '       <x-button type="error" >错误按钮</x-button>\n' +
                    '       <x-button  plain>朴素按钮</x-button>\n' +
                    '       <x-button type="primary" plain>朴素按钮</x-button>\n' +
                    '       <x-button type="info" plain>朴素按钮</x-button>\n' +
                    '       <x-button type="success" plain>朴素按钮</x-button>\n' +
                    '       <x-button type="warn" plain>朴素按钮</x-button>\n' +
                    '       <x-button type="error" plain danger>朴素按钮</x-button>\n' +
                    '       <x-button round>默认按钮</x-button>\n' +
                    '       <x-button type="primary" round>圆角按钮</x-button>\n' +
                    '       <x-button type="info" round>圆角按钮</x-button>\n' +
                    '       <x-button type="success" round>圆角按钮</x-button>\n' +
                    '       <x-button type="warn" round>圆角按钮</x-button>\n' +
                    '       <x-button type="error" round>圆角按钮</x-button>\n' +
                    '       <x-button dashed>虚线按钮</x-button>\n' +
                    '       <x-button type="primary" dashed>虚线按钮</x-button>\n' +
                    '       <x-button type="info" dashed>虚线按钮</x-button>\n' +
                    '       <x-button type="success" dashed>虚线按钮</x-button>\n' +
                    '       <x-button type="warn" dashed>虚线按钮</x-button>\n' +
                    '       <x-button type="error" dashed>虚线按钮</x-button>\n' +
                    '```\n',

            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-tabs':Tabs,
            'x-tabs-item':TabsItem
        },
        computed: {
            compiledMarkdown() {
                return marked(this.input)
            }
        }
    }
</script>

<style scoped>

</style>
