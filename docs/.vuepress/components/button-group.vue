<template>
    <div>

        <div style="margin-top: 20px;">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">

                    <div style="margin-top: 40px;display: flex;justify-content: center">

                        <x-button-group>
                            <x-button icon="left">左</x-button>
                            <x-button icon="set">设置</x-button>
                            <x-button icon="right">右</x-button>
                        </x-button-group>

                    </div>

                    <div style="margin-top: 40px;display: flex;justify-content: center">

                        <x-button-group>
                            <x-button icon="error">确定</x-button>
                            <x-button icon="success">取消</x-button>
                        </x-button-group>

                    </div>
                    <br>
                    <br>
                    <div style="color: #999999"> <code>button-group</code>的子元素应该全是 <code>x-button</code>,后续添加button-group的更多功能</div>
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
    import ButtonGroup from '../../../src/components/currency/button-group'
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
        name: "button-group",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-button-group>\n' +
                    '  <x-button icon="left">左</x-button>\n' +
                    '  <x-button icon="set">设置</x-button>\n' +
                    '  <x-button icon="right">右</x-button>\n' +
                    '</x-button-group>\n' +
                    '\n' +
                    '\n' +
                    '<x-button-group>\n' +
                    '   <x-button icon="error">确定</x-button>\n' +
                    '   <x-button icon="success">取消</x-button>\n' +
                    '</x-button-group>\n' +
                    '\n' +
                    '```'

            }
        },
        components:{
            'x-button':Button,
            'x-button-group':ButtonGroup,
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
