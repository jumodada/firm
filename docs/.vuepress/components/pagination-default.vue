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
                    :total-page="30"
                    :current-page="2"
                    :one-page-number="10"
            >
            </x-pagination>
            <br>
            <br>
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
   import pagination from '../../../src/data/pagination'
    import plugin from '../../../src/tickling/plugin.js'
    import Button from '../../../src/currency/button'
    import collapse from '../../../src/Exhibition/collapse'
    import collapseItem from '../../../src/Exhibition/collapse-item'
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
                input1:'```html\n' +
                    '<x-carousel :selected.sync="selected">\n' +
                    '  <x-carousel-item name="1">\n' +
                    '    <div class="box">\n' +
                    '     1\n' +
                    '    </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="2">\n' +
                    '    <div class="box">\n' +
                    '     2\n' +
                    '    </div>\n' +
                    '   </x-carousel-item>\n' +
                    '   <x-carousel-item name="3">\n' +
                    '    <div class="box">\n' +
                    '     3\n' +
                    '    </div>\n' +
                    '   </x-carousel-item>\n' +
                    '   <x-carousel-item name="4">\n' +
                    '    <div class="box">\n' +
                    '     4\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="5">\n' +
                    '   <div class="box">\n' +
                    '     5\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '  <x-carousel-item name="6">\n' +
                    '   <div class="box">\n' +
                    '     6\n' +
                    '   </div>\n' +
                    '  </x-carousel-item>\n' +
                    '</x-carousel>\n' +
                    '```'
            }
        },
        methods:{

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

    .box {
        width: 100%;
        height: 350px;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
</style>
