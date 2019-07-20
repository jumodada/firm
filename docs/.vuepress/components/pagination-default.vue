<template>
    <div style="margin-top: 30px">

        <div style="margin-top: 20px">


        </div>
        <br>
        <br>
        <br>
        <x-collapse :selected.sync="selectTab1" exhibition>
            <x-pagination
                    style="margin-left: 50px"
                    :total-page="20"
                    :current-page.sync="currentPage"
                    :pager-count="7"
                    :one-page-number="10"
                    :on-change="xxx"
            >
            </x-pagination>

            <br>
            <br>
            <div style="color: #515a6e">

            </div>
            <template slot="description">
                <div style="color: #999999">

                </div>
            </template>
            <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                <div v-html="html"></div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>
<script>
   import pagination from '../../../src/components/data/pagination'
    import plugin from '../../../src/components/tickling/plugin.js'
    import Button from '../../../src/components/currency/button'
    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
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
        name: "slides-default",
        data(){
            return {
                selectTab1:[1],
                selected:'1',
                currentPage:2,
                input1:'```html\n' +
                    ' <x-pagination\n' +
                    '    style="margin-left: 50px"\n' +
                    '    :total-page="20"\n' +
                        ' :pager-count="7"\n'+
                    '    :current-page.sync="currentPage"\n' +
                    '    :on-change="xxx"\n' +
                    '      >\n' +
                    '</x-pagination>\n' +
                    '\n' +
                    '\n' +
                    'export default{\n' +
                    'methods:{\n' +
                    '            xxx(){\n' +
                    '                console.log(this.currentPage)\n' +
                    '            }\n' +
                    '        },\n' +
                    '}\n' +
                    '\n' +
                    '```'
            }
        },
        methods:{
            xxx(){
                console.log(this.currentPage)
            }
        },
        beforeDestroy(){
          this.$el.remove()
        },
        components:{
            'x-button':Button,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-pagination':pagination
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
