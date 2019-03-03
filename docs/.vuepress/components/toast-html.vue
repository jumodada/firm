<template>

    <div style="margin-top: 30px">
        <x-button @click="showMsg1" type="success">默认</x-button>
        <br>
        <br>
        <div style="color: #666666">HTMl插槽默认是关闭的,可以通过 <code>enableHTML</code>
            <br>
            设置为true开启。
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


                                                            js
              showMsg1() {
                this.$toast('<a href="https://www.google.com/">去谷歌</a>',{
                    type:'success',
                    enableHTML:true
                })
            },

`
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
            'x-button':Button
        }
    }
</script>

<style scoped>

</style>
