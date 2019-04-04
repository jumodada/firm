<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button @click="showMsg1">默认顶部弹出</x-button>
                    <x-button @click="showMsg2" type="success">中间渐隐</x-button>
                    <x-button @click="showMsg3" type="warn">底部弹出</x-button>
                    <br>
                    <br>
                    <div style="color: #666666">全局消息弹框默认出现在顶部,可以通过设置 <code>position</code> 设置消息出现的位置(目前就三个)
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
                    '<x-button @click="showMsg1">默认顶部弹出</x-button>\n' +
                    '<x-button @click="showMsg2" type="success">中间渐隐</x-button>\n' +
                    '<x-button @click="showMsg3" type="warn">底部弹出</x-button>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '     methods:{\n' +
                    '       showMsg1() {\n' +
                    '        this.$toast(\'顶部消息\',{\n' +
                    '    \n' +
                    '        })\n' +
                    '       },\n' +
                    '       showMsg2() {\n' +
                    '         this.$toast(\'中间消息\',{\n' +
                    '          type:\'success\',\n' +
                    '          position:\'center\'\n' +
                    '          })\n' +
                    '        },\n' +
                    '        showMsg3() {\n' +
                    '         this.$toast(\'底部消息\',{\n' +
                    '          type:\'warn\',\n' +
                    '          position:\'bottom\'\n' +
                    '         })\n' +
                    '       },\n' +
                    '   },\n' +
                    '}\n' +
                    '```'
            }
        },
        methods:{
            showMsg1() {
                this.$toast('顶部消息',{

                })
            },
            showMsg2() {
                this.$toast('中间消息',{
                    type:'success',
                    position:'center'
                })
            },
            showMsg3() {
                this.$toast('底部消息',{
                    type:'warn',
                    position:'bottom'
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
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style scoped>

</style>
