<template>
    <div>


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-button icon="loading" :loading="loading" @click="toggle">
                            加载按钮
                        </x-button>
                    </div>

                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div  v-highlight v-html="html"></div>
                    <br>
                    <div  v-highlight v-html="js"></div>
                </x-collapse-item>
            </x-collapse>
        </div>

    </div>

</template>

<script>
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Button from '../../.././src/button'
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
        name: "button-loading",
        data(){
            return {
                selectTab:[1],
                loading:false,
                input1:'```html\n' +
                    '<x-button icon="loading" :loading="loading" @click="toggle">\n' +
                    '加载按钮\n' +
                    '</x-button>\n' +
                    '```',
                input2:'```js\n' +
                    'export  default {\n' +
                    '    data(){\n' +
                    '        return{\n' +
                    '            loading:false\n' +
                    '        }\n' +
                    '    },\n' +
                    '    methods:{\n' +
                    '              toggle(){\n' +
                    '                  this.loading = !this.loading\n' +
                    '              }\n' +
                    '            },\n' +
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
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem
        },
        computed: {
            html() {
                return marked(this.input1)
            },
            js(){
                return marked(this.input2)
            }
        },
    }
</script>

<style>

</style>
