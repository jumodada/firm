<template>
<div>


    <div style="margin-top: 20px">
        <x-collapse :selected.sync="selectTab" exhibition>
            <template slot="description">
                <div style="margin-top: 40px">
                    <x-button>默认按钮</x-button>
                    <x-button type="primary">主要按钮</x-button>
                    <x-button type="info">信息按钮</x-button>
                    <x-button type="success">成功按钮</x-button>
                    <x-button type="warn">警告按钮</x-button>
                    <x-button type="error" >错误按钮</x-button>
                </div>
                <div style="margin-top: 40px">
                    <x-button  plain>朴素按钮</x-button>
                    <x-button type="primary" plain>朴素按钮</x-button>
                    <x-button type="info" plain>朴素按钮</x-button>
                    <x-button type="success" plain>朴素按钮</x-button>
                    <x-button type="warn" plain>朴素按钮</x-button>
                    <x-button type="error" plain danger>朴素按钮</x-button>
                </div>
                <div style="margin-top: 40px">
                    <x-button round>默认按钮</x-button>
                    <x-button type="primary" round>圆角按钮</x-button>
                    <x-button type="info" round>圆角按钮</x-button>
                    <x-button type="success" round>圆角按钮</x-button>
                    <x-button type="warn" round>圆角按钮</x-button>
                    <x-button type="error" round>圆角按钮</x-button>
                </div>
                <div style="margin-top: 40px">
                    <x-button dashed>虚线按钮</x-button>
                    <x-button type="primary" dashed>虚线按钮</x-button>
                    <x-button type="info" dashed>虚线按钮</x-button>
                    <x-button type="success" dashed>虚线按钮</x-button>
                    <x-button type="warn" dashed>虚线按钮</x-button>
                    <x-button type="error" dashed>虚线按钮</x-button>
                </div>
                <div style="margin-top: 40px">
                    <x-button circle icon="set"></x-button>
                    <x-button type="primary" circle icon="lianxidaogou"></x-button>
                    <x-button type="info" circle icon="shanchu"></x-button>
                    <x-button type="success" circle icon="correct"></x-button>
                    <x-button type="warn" circle icon="xing"></x-button>
                    <x-button type="error" circle icon="wrong"></x-button>
                </div>

            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
            <div  v-highlight v-html="compiledMarkdown"></div>
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
        name: "button-demo-default",
        data(){
          return {
              selectTab:[1],
              input:'\n' +
                  '```html\n' +
                  '       <x-button>默认按钮</x-button>\n' +
                  '       <x-button type="primary">主要按钮</x-button>\n' +
                  '       <x-button type="info">信息按钮</x-button>\n' +
                  '       <x-button type="success">成功按钮</x-button>\n' +
                  '       <x-button type="warn">警告按钮</x-button>\n' +
                  '       <x-button type="error" >错误按钮</x-button>\n' +
                  '           \n' +
                  '       <x-button  plain>朴素按钮</x-button>\n' +
                  '       <x-button type="primary" plain>朴素按钮</x-button>\n' +
                  '       <x-button type="info" plain>朴素按钮</x-button>\n' +
                  '       <x-button type="success" plain>朴素按钮</x-button>\n' +
                  '       <x-button type="warn" plain>朴素按钮</x-button>\n' +
                  '       <x-button type="error" plain danger>朴素按钮</x-button>\n' +
                  '               \n' +
                  '       <x-button round>默认按钮</x-button>\n' +
                  '       <x-button type="primary" round>圆角按钮</x-button>\n' +
                  '       <x-button type="info" round>圆角按钮</x-button>\n' +
                  '       <x-button type="success" round>圆角按钮</x-button>\n' +
                  '       <x-button type="warn" round>圆角按钮</x-button>\n' +
                  '       <x-button type="error" round>圆角按钮</x-button>\n' +
                  '          \n' +
                  '       <x-button dashed>虚线按钮</x-button>\n' +
                  '       <x-button type="primary" dashed>虚线按钮</x-button>\n' +
                  '       <x-button type="info" dashed>虚线按钮</x-button>\n' +
                  '       <x-button type="success" dashed>虚线按钮</x-button>\n' +
                  '       <x-button type="warn" dashed>虚线按钮</x-button>\n' +
                  '       <x-button type="error" dashed>虚线按钮</x-button>\n' +
                  '        \n' +
                  '       <x-button circle icon="set"></x-button>\n' +
                  '       <x-button type="primary" circle icon="lianxidaogou"></x-button>\n' +
                  '       <x-button type="info" circle icon="shanchu"></x-button>\n' +
                  '       <x-button type="success" circle icon="correct"></x-button>\n' +
                  '       <x-button type="warn" circle icon="xing"></x-button>\n' +
                  '       <x-button type="error" circle icon="wrong"></x-button>\n' +
                  '             \n' +
                  '```',

          }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
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
