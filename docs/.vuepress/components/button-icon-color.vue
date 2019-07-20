<template>
    <div>


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">

                        <x-button icon="loading" loading color="red">红色</x-button>
                        <x-button icon="set" loading color="green">力量</x-button>
                        <x-button icon="loading" loading color="blue">蓝色</x-button>

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
    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
    import Button from '../../../src/components/currency/button'
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
        name: "button-icon-color",
        data(){
            return {
                selectTab:[1],
                loading:false,
                input1:'```html\n' +
                    '<x-button icon="loading" loading color="red">红色</x-button>\n' +
                    '<x-button icon="set" loading color="green">力量</x-button>\n' +
                    '<x-button icon="loading" loading color="blue">蓝色</x-button>\n' +
                    '```'

            }
        },
        methods:{
            toggle(){
                this.loading = !this.loading
            }
        },
        components:{
            'x-button':Button,
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
