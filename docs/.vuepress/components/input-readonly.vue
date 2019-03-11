<template>
    <div>
        <div style="margin-top: 20px">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-Input  :value="value" readonly>
                        </x-Input>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Input from '../../.././src/input'
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
                value:'只读模式',
                input1:'```html\n' +
                    '<x-Input  :value="value" readonly>\n' +
                    '</x-Input>\n' +
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
        },
    }
</script>

<style>

</style>
