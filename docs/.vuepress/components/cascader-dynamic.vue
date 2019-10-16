<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic>
                    </x-cascader>
                    <div style="margin-top: 40px;color: #999999">
                        使用 <code>dynamic</code>变为动态选择栏。
                        <br>
                        数据格式如代码所示。
                        还须传递一个函数<code>:loadData="example"</code>。
                        如代码所示，函数第二个参数是一个回调函数，获取的数据作为参数传给这个回调。
                        <br>
                        <br>
                        为保证 <code>箭头Icon</code>和<code>加载Icon</code>可以正常显示，以及选择完成后不再需要数据请求。
                        请为每个选项增加一个 <code>isLeaf</code>属性，树枝的末端设为<code>true</code>,如代码所示。
                        <br>
                        <br>
                        目前的数据只有北京>东城，西城，朝阳添加了<code>isLeaf</code>属性。点击其他的区则会等请求到来后再作关闭。
                        <br>
                        <br>
                        加载过的重复点击不会触发 <code>loading</code>动画


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
    import collapse from '../../../components/Exhibition/collapse/collapse'
    import collapseItem from '../../../components/Exhibition/collapse/collapse-item'
    import Cascader from '../../../components/form data/cascader'
    import address from '../../../tests/fixtures/address.js'
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
    function ajax(parent_id = 0){
        return new Promise(resolve=>{
            let res = address.filter(item=>item.parent_id===parent_id)
           setTimeout(()=>{
               resolve(res)
           },1000)
        })
    }
    export default {
        name: "grid-arrange",
        created(){
          ajax(0).then(res=>{
              this.source = res
          })
        },

        data(){
            return {
                selectTab:[1],
                selected:[1],
                input1:'```html\n' +
                    '<x-cascader :source.sync="source"\n' +
                    ' :selected.sync="selected"\n' +
                    ' :loadData="example"\n' +
                    ' dynamic>\n' +
                    '</x-cascader>\n' +
                    '```',
                input2:'```js\n' +
                    '\n' +
                    'function ajax(parent_id = 0){\n' +
                    '        return new Promise(resolve=>{\n' +
                    '        let res = address.filter(item=>item.parent_id===parent_id)\n' +
                    '        setTimeout(()=>{\n' +
                    '          resolve(res)\n' +
                    '        },1000)\n' +
                    '        })\n' +
                    '    }\n' +
                    'export default {\n' +
                    '     created(){\n' +
                    '              ajax(0).then(res=>{\n' +
                    '                  this.source = res\n' +
                    '              })\n' +
                    '            },\n' +
                    '    data(){\n' +
                    '        return {\n' +
                    '            source:[]\n' +
                    '        }     \n' +
                    '    },\n' +
                    '     methods:{\n' +
                    '        example({id},updateSource){\n' +
                    '        ajax(id).then(res=>{\n' +
                    '        updateSource(res)\n' +
                    '      })\n' +
                    '      }\n' +
                    '  },\n' +
                    '}\n' +
                    '```',
                source:[]
            }
        },
        methods:{
            example({id},updateSource){
                ajax(id).then(res=>{
                    updateSource(res)
                })
            }
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
