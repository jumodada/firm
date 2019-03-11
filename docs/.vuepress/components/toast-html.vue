<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button @click="showMsg1" type="success">默认</x-button>
                    <br>
                    <br>
                    <div style="color: #666666">HTMl插槽默认是关闭的,可以通过 <code>enableHTML</code>
                        <br>
                        设置为true开启。
                    </div>
                </template>
                <x-collapse-item name="1" title="代码">
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
    import Vue from 'vue'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import plugin from '../../.././src/plugin.js'
    import Button from '../../.././src/button'
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css'
    import marked from 'marked'
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
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '     methods:{\n' +
                    '     showMsg1() {\n' +
                    '      this.$toast(\'<a href="https://www.google.com/">去谷歌</a>\',{\n' +
                    '      type:\'success\',\n' +
                    '      enableHTML:true\n' +
                    '      })\n' +
                    '  },\n' +
                    '   },\n' +
                    '}\n' +
                    '```'
            }
        },
        methods:{
            showMsg1() {
                this.$toast('<a href="https://www.google.com/">去谷歌</a>',{
                    type:'success',
                    enableHTML:true
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
