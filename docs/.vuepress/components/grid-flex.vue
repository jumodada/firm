<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-row flex="-50">
                        <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                    </x-row>
                    <div style="margin-top: 15px">
                        <x-row>
                            <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="margin-top: 15px">
                        <x-row flex="150">
                            <x-col span="12"   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="12"   style="background-color: #bfbfbf;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="font-size: 17px;color: #999999;margin-top: 30px">
                        row组件可以通过设置 <code>flex</code>控制整体的缩进和伸长
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
    import Row from '../../../src/layout/row'
    import Col from '../../../src/layout/col'
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
    export default {
        name: "grid-flex",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-row flex="-50">\n' +
                    ' <x-col span="12"></x-col>\n' +
                    ' <x-col span="12"></x-col>\n' +
                    '</x-row>\n' +
                    '                    \n' +
                    '<x-row>\n' +
                    '  <x-col span="12"></x-col>\n' +
                    '  <x-col span="12"></x-col>\n' +
                    '</x-row>\n' +
                    '<x-row flex="150">\n' +
                    ' <x-col span="12"></x-col>\n' +
                    ' <x-col span="12"></x-col>\n' +
                    '</x-row>\n' +
                    '\n' +
                    '```'
            }
        },

        components:{
            'x-row':Row,
            'x-col':Col,
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

<style scoped>

</style>
