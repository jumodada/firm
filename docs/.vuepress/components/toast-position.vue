<template>

    <div style="margin-top: 30px">

        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button @click="showMsg1">默认顶部弹出</x-button>
                    <x-button @click="showMsg2" type="success">中间渐隐</x-button>
                    <x-button @click="showMsg3" type="warn">底部弹出</x-button>
                    <br>
                    <br>
                    <div style="color: #666666">全局消息弹框默认出现在顶部,可以通过设置 <code>position</code> 设置消息出现的位置(目前就三个)
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
                this.$toast('顶部消息',{

                })
            },
            showMsg2() {
                this.$toast('中间消息',{
                    type:'success',
                    position:'center'
                })
            },
            showMsg3() {
                this.$toast('底部消息',{
                    type:'warn',
                    position:'bottom'
                })
            },
        },


`
            }
        },
        methods:{
            showMsg1() {
                this.$toast('顶部消息',{

                })
            },
            showMsg2() {
                this.$toast('中间消息',{
                    type:'success',
                    position:'center'
                })
            },
            showMsg3() {
                this.$toast('底部消息',{
                    type:'warn',
                    position:'bottom'
                })
            },
        },
        components:{
            'x-collapse':collapse,
            'x-collapse-item':collapseItem,
            'x-button':Button
        }
    }
</script>

<style scoped>

</style>
