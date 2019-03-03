<template>

    <div style="margin-top: 30px">
        <x-cascader>
            
        </x-cascader>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Cascader from '../../.././src/cascader'
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
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
            'x-cascader':Cascader
        }
    }
</script>

<style scoped>

</style>
