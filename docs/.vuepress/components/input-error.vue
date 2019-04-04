<template>
    <div>

        <div style="margin-top: 20px">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-Input  :value="value" :error="errorMsg">
                        </x-Input>
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
    import Input from '../../../src/form data/input'
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
        name: "input-demo",
        data(){
            return {
                selectTab:[1],
                value:'error',
                errorMsg:'输入格式错误',
                input1:'```html\n' +
                    '<x-Input  :value="value" :error="errorMsg">\n' +
                    '</x-Input>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '    data(){\n' +
                    '        return{\n' +
                    '            value:\'error\',\n' +
                    '            errorMsg:\'输入格式错误\',\n' +
                    '        }\n' +
                    '    }\n' +
                    '}\n' +
                    '```'

            }
        },
        methods:{
            toggle(){
                this.loading = !this.loading
            }
        },
        components:{
            'x-Input':Input,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
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

<style>

</style>
