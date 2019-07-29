<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button @click="showMsg1">默认消息</x-button>
                    <x-button @click="showMsg2" type="success">成功消息</x-button>
                    <x-button @click="showMsg3" type="warn">警告消息</x-button>
                    <x-button @click="showMsg4" type="error">错误信息</x-button>
                    <br>
                    <br>
                    <div style="color: #666666">在事件绑定中使用 <code>$toast</code>调用,可以通过设置 <code>type</code> 设置消息的(目前三种)的样式
                        <br>
                        默认是自动关闭的，可以通过 <code>autoClosed</code>设置弹框的自动关闭
                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
                    <div v-html="html"></div>
                    <br>
                    <br>
                    <div  v-html="js"></div>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import popover from '../../../src/components/Exhibition/popover/popover'
    import collapse from '../../../src/components/Exhibition/collapse'
    import collapseItem from '../../../src/components/Exhibition/collapse-item'
    import plugin from '../../../src/components/tickling/plugin.js'
    import Button from '../../../src/components/currency/button'

    import marked from 'marked'
    import Vue from 'vue'

    Vue.use(plugin)
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                input1:'```html\n' +
                    '<x-button @click="showMsg1">默认消息</x-button>\n' +
                    '<x-button @click="showMsg2" type="success">成功消息</x-button>\n' +
                    '<x-button @click="showMsg3" type="warn">警告消息</x-button>\n' +
                    '<x-button @click="showMsg4" type="error">错误信息</x-button>\n' +
                    '```',
                input2:'```js\n' +
                    'export default {\n' +
                    '    methods:{\n' +
                    '     showMsg1() {\n' +
                    '          this.$toast(\'默认的消息\',{  \n' +
                    '      })\n' +
                    '                },\n' +
                    '     showMsg2() {\n' +
                    '         this.$toast(\'这是一条成功消息\',{\n' +
                    '          type:\'success\'\n' +
                    '        })\n' +
                    '       },\n' +
                    '     showMsg3() {\n' +
                    '         this.$toast(\'这是一条警告消息\',{\n' +
                    '          type:\'warn\'\n' +
                    '         })\n' +
                    '         },\n' +
                    '     showMsg4() {\n' +
                    '        this.$toast(\'这是一条错误消息\',{\n' +
                    '        type:\'error\'\n' +
                    '       })\n' +
                    '     },\n' +
                    '  },\n' +
                    '}\n' +
                    '```'
            }
        },
        methods:{
            showMsg1() {
                this.$toast('默认的消息',{

                })
            },
            showMsg2() {
                this.$toast('这是一条成功消息',{
                    type:'success'
                })
            },
            showMsg3() {
                this.$toast('这是一条警告消息',{
                    type:'warn'
                })
            },
            showMsg4() {
                this.$toast('这是一条错误消息',{
                    type:'error'
                })
            },
        },
        components:{
           'x-popover':popover,
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
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
