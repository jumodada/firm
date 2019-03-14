<template>
    <div>

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">

                    <div style="margin-top: 40px">
                        <x-button icon="set">设置按钮</x-button>
                        <x-button icon="dianzan">点赞按钮</x-button>
                        <x-button icon="download">下载按钮</x-button>
                        <x-button icon="loading">加载按钮</x-button>
                        <x-button icon="left">左</x-button>
                        <x-button icon="right">右</x-button>

                    </div>
                    <br>
                    <br>
                    {{describe}}
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div  v-highlight v-html="html"></div>
                </x-collapse-item>
            </x-collapse>
        </div>

    </div>

</template>

<script>
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
        name: "button-icon",
        data(){
            return {
                selectTab:[1],
                describe:'图标默认放在左边，也可以设置position放置图标在右边',
                input1:'```html\n' +
                    ' <x-button icon="set">设置按钮</x-button>\n' +
                    '<x-button icon="dianzan">点赞按钮</x-button>\n' +
                    '<x-button icon="download">下载按钮</x-button>\n' +
                    '<x-button icon="loading">加载按钮</x-button>\n' +
                    '<x-button icon="left">左</x-button>\n' +
                    '<x-button icon="right">右</x-button>\n' +
                    '```'

            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        },
        computed: {
            html() {
                return marked(this.input1)
            },
        },
    }
</script>

<style>

</style>
