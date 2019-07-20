<template>
    <div>

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <div style="margin-top: 40px">
                        <div style="margin-bottom: 20px">
                            <x-button-group>
                                <x-button @click="bigOne">big</x-button>
                                <x-button @click="mediumOne">medium</x-button>
                                <x-button @click="smallOne">small</x-button>
                                <x-button @click="miniOne">mini</x-button>
                            </x-button-group>
                        </div>

                        <div>
                            <x-button type="primary"  :size="buttonSize">
                                {{buttonSize}}
                            </x-button>
                        </div>
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
        name: "button-disabled",
        data(){
            return {
                selectTab:[1],
                buttonSize:'big',
                input1:'```html\n' +
                    '<x-button @click="bigOne">big</x-button>\n' +
                    '<x-button @click="mediumOne">medium</x-button>\n' +
                    '<x-button @click="smallOne">small</x-button>\n' +
                    '<x-button @click="miniOne">mini</x-button>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '    data(){\n' +
                    '      return {\n' +
                    '          buttonSize:\'big\',\n' +
                    '      }  \n' +
                    '    },\n' +
                    '    methods:{\n' +
                    '                bigOne(){\n' +
                    '                    this.buttonSize = \'big\'\n' +
                    '                }  ,\n' +
                    '                mediumOne(){\n' +
                    '                    this.buttonSize = \'medium\'\n' +
                    '                },\n' +
                    '                smallOne(){\n' +
                    '                    this.buttonSize = \'small\'\n' +
                    '                },\n' +
                    '                miniOne(){\n' +
                    '                    this.buttonSize = \'mini\'\n' +
                    '                }\n' +
                    '            }\n' +
                    '}\n' +
                    '```'

            }
        },
        methods:{
            bigOne(){
                this.buttonSize = 'big'
            }  ,
            mediumOne(){
                this.buttonSize = 'medium'
            },
            smallOne(){
                this.buttonSize = 'small'
            },
            miniOne(){
                this.buttonSize = 'mini'
            }
        },
        computed: {
            html() {
                return marked(this.input1)
            },
            js(){
                return marked(this.input2)
            }
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button-group':ButtonGroup
        },
        beforeDestroy(){
            this.$el.remove()
        },
    }
</script>

<style>

</style>
