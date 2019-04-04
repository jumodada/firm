<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">
               <x-collapse :selected.sync="selectTab" exhibition>
                   <template slot="description">
                           <x-cascader :source="source" :selected.sync="selected">
                           </x-cascader>
                       <div style="margin-top: 40px;color: #999999">
                        数据格式如代码所示，默认选取完成才显示并自动关闭。选取完成之前不会修改。
                           (键盘选取功能尚未完成)。
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
    import Cascader from '../../../src/form data/cascader'
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
        name: "grid-arrange",

        data(){
            return {
                selectTab:[1],
                selected:[1],
                input1:'```html\n' +
                    '<x-cascader :source="source" :selected.sync="selected">\n' +
                    '</x-cascader>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '    data(){\n' +
                    '        return{\n' +
                    '            source:[{\n' +
                    '            name:\'北京\',\n' +
                    '            \n' +
                    '            children:[\n' +
                    '            {name:\'东城区\', children:[{\n' +
                    '             name:\'东城小学\'},\n' +
                    '            {name:\'东城中学\'},\n' +
                    '            {name:\'东城大学\'},\n' +
                    '            {name:\'东城幼儿园\'}]}]\n' +
                    '            },\n' +
                    '            {name:\'四川\',\n' +
                    '            children:[{\n' +
                    '            name:\'成都\',\n' +
                    '            children:[\n' +
                    '            {name:\'成都小学\',},\n' +
                    '            {name:\'城西小学\'},\n' +
                    '            {name:\'城北小学\'},\n' +
                    '            {name:\'城南小学\'}]}, \n' +
                    '            {name:\'雅安\',\n' +
                    '            children:[\n' +
                    '            {name:\'雅安小学\'},\n' +
                    '            {name:\'雅安中学\'},\n' +
                    '            {name:\'雅安大学\'},\n' +
                    '            {name:\'雅安幼儿园\'}]\n' +
                    '            }]\n' +
                    '            },\n' +
                    '            {name:\'黑龙江\',\n' +
                    '            children:[{\n' +
                    '            name:\'哈尔滨\',\n' +
                    '            children:[{name:\'哈尔滨小学\'},\n' +
                    '            {name:\'啤酒中学\'},{name:\'勇闯天涯中学\'}]\n' +
                    '            },{name:\'齐齐哈尔\',\n' +
                    '            children:[{name:\'齐齐哈尔小学\'},{name:\'齐齐哈尔中学\'},{name:\'齐齐哈尔大学\'}]\n' +
                    '            }]},\n' +
                    '            ]\n' +
                    '        }\n' +
                    '    }\n' +
                    '}\n' +
                    '```',
                source:[{
                    name:'北京',children:[
                    {
                        name:'东城区',
                        children:[{
                            name:'东城小学'
                        },
                            {
                                name:'东城中学'
                            },
                            {
                                name:'东城大学'
                            },
                            {
                                name:'东城幼儿园'
                            }

                            ]
                    }
                            ]
                },
                    {
                        name:'四川',
                        children:[{
                            name:'成都',
                            children:[
                                {name:'成都小学'},
                                {name:'城西小学'},
                                {name:'城北小学'},
                                {name:'城南小学'}]
                        },
                            {
                                name:'雅安',
                                children:[
                                    {name:'雅安小学'},
                                    {name:'雅安中学'},
                                    {name:'雅安大学'},
                                    {name:'雅安幼儿园'}]
                            }]
                       },
                       {
                        name:'黑龙江',
                        children:[{
                            name:'哈尔滨',
                            children:[{name:'哈尔滨小学'},{name:'啤酒中学'},{name:'勇闯天涯中学'}]
                        },
                            {
                                name:'齐齐哈尔',
                                children:[{name:'齐齐哈尔小学'},{name:'齐齐哈尔中学'},{name:'齐齐哈尔大学'}]
                            }
                        ]
                    },

                    ]
            }
        },
        methods:{
            showMsg1() {
                this.$toast('<a href="https://www.google.com/">去谷歌</a>',{
                    type:'success',
                    enableHTML:true
                })
            },

        },
        components:{
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-cascader':Cascader
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

<style scoped>

</style>
