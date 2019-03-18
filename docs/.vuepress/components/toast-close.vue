<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button @click="showMsg1" type="success">默认</x-button>
                    <x-button @click="showMsg2" type="success">文字</x-button>
                    <x-button @click="showMsg3" type="success">其他Icon</x-button>
                    <br>
                    <br>
                    <div style="color: #666666">默认是关闭按钮 <code>wrong</code>,可以通过 <code>closeButton</code>
                        <br>
                        设置【关闭】的文字或者Icon样式
                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div  v-highlight v-html="html"></div>
                    <br>
                    <br>
                    <div  v-highlight v-html="js"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
    import plugin from '../../../src/tickling/plugin.js'
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
    Vue.use(plugin)
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-button @click="showMsg1" type="success">默认</x-button>\n' +
                    '<x-button @click="showMsg2" type="success">文字</x-button>\n' +
                    '<x-button @click="showMsg3" type="success">其他Icon</x-button>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '    methods:{\n' +
                    '    showMsg1() {\n' +
                    '      this.$toast(\'顶部消息\',{\n' +
                    '      type:\'success\',\n' +
                    '     })\n' +
                    '    },\n' +
                    '    showMsg2() {\n' +
                    '        this.$toast(\'文字\',{\n' +
                    '           type:\'success\',\n' +
                    '           closeButton:{\n' +
                    '           text:\'关闭\'\n' +
                    '            }\n' +
                    '        })\n' +
                    '    },\n' +
                    '    showMsg3() {\n' +
                    '        this.$toast(\'dianzan Icon\',{\n' +
                    '         type:\'success\',\n' +
                    '         closeButton:{\n' +
                    '         closeIcon:\'dianzan\'\n' +
                    '    }\n' +
                    '      })\n' +
                    '      },\n' +
                    '   },\n' +
                    '}\n' +
                    '```' +
                    ''
            }
        },
        methods:{
            showMsg1() {
                this.$toast('顶部消息',{
                    type:'success',
                })
            },
            showMsg2() {
                this.$toast('文字',{
                    type:'success',
                    closeButton:{
                        text:'关闭'
                    }
                })
            },
            showMsg3() {
                this.$toast('dianzan Icon',{
                    type:'success',
                    closeButton:{
                        closeIcon:'dianzan'
                    }
                })
            },
        },
        components:{
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        },
        computed: {
            html() {
                return marked(this.input1)
            },
            js() {
                return marked(this.input2)
            },
        },
    }
</script>

<style scoped>

</style>
