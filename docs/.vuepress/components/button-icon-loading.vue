<template>
    <div>


        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <x-button icon="loading" :loading="loading" @click="toggle">
                            加载按钮
                        </x-button>
                        <x-button style="margin-left: 50px" :icon="loadThat" :circle="circle"
                                  type="success" @click="toggle2" :loading="loading2">
                            {{text}}
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
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
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
    export default {
        name: "button-loading",
        data(){
            return {
                selectTab:[1],
                loading:false,
                loading2:false,
                circle:false,
                loadThat:'',
                text:'登录',
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
            },
            toggle2(){
                this.loading2 = !this.loading2
                this.circle = !this.circle
                if(this.loading2 ){
                    this.text=''
                    this.loadThat='loading'
                }else{
                    this.text='登录'
                    this.loadThat=''
                }
            },
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
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style>
</style>
