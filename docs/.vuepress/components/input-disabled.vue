<template>
    <div>

        <div style="margin-top: 20px">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-Input  :value="value" disabled>
                        </x-Input>
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
    import collapse from '../../../components/Exhibition/collapse/collapse'
    import collapseItem from '../../../components/Exhibition/collapse/collapse-item'
    import Input from '../../../components/form data/input'
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
                value:'不能使用input输入框',
                input1:'```html\n' +
                    ' <x-Input  :value="value" disabled>\n' +
                    ' </x-Input>\n' +
                    '```\n'

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
        beforeDestroy(){
            this.$el.remove()
        },

    }
</script>

<style>

</style>
