<template>

    <div style="margin-top: 30px">


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-row arrange="left">
                        <x-col  span="3" offset="3"  style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col span="3" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col span="3"  offset="6"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                    </x-row>
                    <div style="margin-top: 15px">
                        <x-row>
                            <x-col span="12" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="12" offset="3" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="margin-top: 15px">
                        <x-row>
                            <x-col span="2"  offset="1"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="4" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="6" offset="5" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="font-size: 17px;color: #999999;margin-top: 30px">
                        col组件可以通过设置 <code>offset</code>使col向左发生偏移，如果超出24格，会整体缩进。
                    </div>
                </template>
                <x-collapse-item name="1" title="代码">
                    <div  v-highlight v-html="html"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import Row from '../../.././src/row'
    import Col from '../../.././src/col'
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
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                input1:' \n' +
                    '```html\n' +
                    '<x-row arrange="left">\n' +
                    ' <x-col  span="3" offset="3" ></x-col>\n' +
                    ' <x-col span="3" offset="3"></x-col>\n' +
                    ' <x-col span="3"  offset="6"></x-col>\n' +
                    '</x-row>\n' +
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
