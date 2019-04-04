<template>
    <div>
        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-button disabled>默认按钮</x-button>
                        <x-button type="primary" disabled>主要按钮</x-button>
                        <x-button type="info"  disabled>信息按钮</x-button>
                        <x-button type="success" disabled>成功按钮</x-button>
                        <x-button type="warn" disabled>警告按钮</x-button>
                        <x-button type="error"  disabled>错误按钮</x-button>
                    </div>
                    <div style="margin-top: 40px">
                        <x-button  plain disabled>朴素按钮</x-button>
                        <x-button type="primary" plain disabled>朴素按钮</x-button>
                        <x-button type="info" plain disabled>朴素按钮</x-button>
                        <x-button type="success" plain disabled>朴素按钮</x-button>
                        <x-button type="warn" plain disabled>朴素按钮</x-button>
                        <x-button type="error" plain disabled>朴素按钮</x-button>
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
        name: "button-disabled",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-button type="primary" disabled>主要按钮</x-button>\n' +
                    '<x-button type="info"  disabled>信息按钮</x-button>\n' +
                    '<x-button type="success" disabled>成功按钮</x-button>\n' +
                    '<x-button type="warn" disabled>警告按钮</x-button>\n' +
                    '<x-button type="error"  disabled>错误按钮</x-button>\n' +
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
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style>

</style>
