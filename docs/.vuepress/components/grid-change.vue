<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-row  gutter="20">
                        <x-col  span="12"
                                :pad="{span:18}"
                                :pc="{span:8}"
                                :wp="{span:4}" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        <x-col  span="12"
                                :pad="{span:6}"
                                :pc="{span:16}"
                                :wp="{span:20}" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                    </x-row>
                    <div style="margin-top: 15px">
                        <x-row gutter="20">
                            <x-col span="8"
                                   :pad="{span:12}"
                                   :pc="{span:4}"
                                   :wp="{span:10}"
                                   style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col
                                    :pad="{span:6}"
                                    :pc="{span:10}"
                                    :wp="{span:8}"
                                    span="8" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col
                                    :pad="{span:6}"
                                    :pc="{span:10}"
                                    :wp="{span:6}"
                                    span="8" style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                        </x-row>
                    </div>
                    <div style="margin-top: 15px">
                        <x-row gutter="20">
                            <x-col span="2"
                                   :pad="{span:6}"
                                   :pc="{span:10}"
                                   :wp="{span:6}"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="6"
                                   :pad="{span:6}"
                                   :pc="{span:10}"
                                   :wp="{span:6}"style="background-color: #e6e6e6;height: 50px;border-radius: 8px"></x-col>
                            <x-col span="10"
                                   :pad="{span:6}"
                                   :pc="{span:10}"
                                   :wp="{span:6}"style="background-color: #e6e6e6;height: 50px;border-radius: 8px">
                            </x-col>
                        </x-row>
                    </div>
                    <div style="font-size: 17px;color: #999999;margin-top: 30px">
                        col组件通过设置 <br>
                        <code>pad</code>:577px-768px <code>np</code>:769px-992px <code>pc</code>:993px-1200px <code>wp</code>:>1201px
                        <br>
                        可以实现响应式布局，577px以下也就是默认的移动端样式。
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
                input1:'```html\n' +
                    '\n' +
                    '<x-row  gutter="20">\n' +
                    '<x-col  span="12"\n' +
                    '      :pad="{span:18}"\n' +
                    '      :pc="{span:8}"\n' +
                    '      :wp="{span:4}">      \n' +
                    '</x-col>\n' +
                    '<x-col  span="12"\n' +
                    '      :pad="{span:6}"\n' +
                    '      :pc="{span:16}"\n' +
                    '      :wp="{span:20}">      \n' +
                    '</x-col>\n' +
                    '</x-row>\n' +
                    '   \n' +
                    '                    \n' +
                    ' <x-row gutter="20">\n' +
                    ' <x-col span="8"\n' +
                    '     :pad="{span:12}"\n' +
                    '     :pc="{span:4}"\n' +
                    '     :wp="{span:10}">\n' +
                    '                                   \n' +
                    ' </x-col>\n' +
                    ' <x-col\n' +
                    '     :pad="{span:6}"\n' +
                    '     :pc="{span:10}"\n' +
                    '     :wp="{span:8}"\n' +
                    '     span="8" >\n' +
                    '</x-col>\n' +
                    '  <x-col\n' +
                    '     :pad="{span:6}"\n' +
                    '     :pc="{span:10}"\n' +
                    '     :wp="{span:6}"\n' +
                    '     span="8" >  \n' +
                    '</x-col>\n' +
                    '</x-row>\n' +
                    '\n' +
                    '<x-row gutter="20">\n' +
                    ' <x-col span="2"\n' +
                    ' :pad="{span:6}"\n' +
                    ' :pc="{span:10}"\n' +
                    ' :wp="{span:6}">\n' +
                    '</x-col>\n' +
                    ' <x-col span="6"\n' +
                    ' :pad="{span:6}"\n' +
                    ' :pc="{span:10}"\n' +
                    ' :wp="{span:6}">\n' +
                    '                                           \n' +
                    '</x-col>\n' +
                    ' <x-col span="10"\n' +
                    ' :pad="{span:6}"\n' +
                    ' :pc="{span:10}"\n' +
                    ' :wp="{span:6}">\n' +
                    ' \n' +
                    ' </x-col>\n' +
                    '\n' +
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
