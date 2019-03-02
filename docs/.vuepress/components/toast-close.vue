<template>

    <div style="margin-top: 30px">
        <x-button @click="showMsg1" type="success">默认</x-button>
        <x-button @click="showMsg2" type="success">文字</x-button>
        <x-button @click="showMsg3" type="success">其他Icon</x-button>
        <br>
        <br>
        <div style="color: #666666">默认是关闭按钮 <code>wrong</code>,可以通过 <code>closeButton</code>
            <br>
            设置【关闭】的文字或者Icon样式
        </div>
        <div style="margin-top: 20px">
            <x-collapse :selected.sync="selectTab">
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
        <x-button @click="showMsg1" type="success">默认</x-button>
        <x-button @click="showMsg2" type="success">文字</x-button>
        <x-button @click="showMsg3" type="success">其他Icon</x-button>

                                                            js
             showMsg1() {
                this.$toast('顶部消息',{
                    type:'success',
                })
            },
            showMsg2() {
                this.$toast('文字',{
                    type:'success',
                    closeButton:{
                        text:'关闭'
                    }
                })
            },
            showMsg3() {
                this.$toast('dianzan Icon',{
                    type:'success',
                    closeButton:{
                        closeIcon:'dianzan'
                    }
                })
            },


`
            }
        },
        methods:{
            showMsg1() {
                this.$toast('顶部消息',{
                    type:'success',
                })
            },
            showMsg2() {
                this.$toast('文字',{
                    type:'success',
                    closeButton:{
                        text:'关闭'
                    }
                })
            },
            showMsg3() {
                this.$toast('dianzan Icon',{
                    type:'success',
                    closeButton:{
                        closeIcon:'dianzan'
                    }
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
