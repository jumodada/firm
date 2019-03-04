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
                <x-collapse-item name="1" title="代码">
           <pre>
               <code>
                    {{content}}
               </code>
            </pre>
                </x-collapse-item>
            </x-collapse>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import popover from '../../.././src/popover'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import plugin from '../../.././src/plugin.js'
    import Button from '../../.././src/button'
    Vue.use(plugin)
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
        <x-button @click="showMsg1">顶部弹出</x-button>
        <x-button @click="showMsg2" type="success">中间渐隐</x-button>
        <x-button @click="showMsg3" type="warn">底部弹出</x-button>

                                                            js
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


`
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
        }
    }
</script>

<style scoped>

</style>
