<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-button-group>
                        <x-button @click="theSize='big'">big</x-button>
                        <x-button @click="theSize='medium'">medium</x-button>
                        <x-button @click="theSize='small'">small</x-button>
                    </x-button-group>
                    <br>
                    <br>
                    <br>
                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic
                                :size="theSize"
                                style="transition: .3s all ease"
                    >

                    </x-cascader>

                    <div style="margin-top: 40px;color: #999999">
                        使用 <code>size</code>控制cascader的大小，目前只有 <code>big</code> <code>medium</code> <code>small</code>。
                        默认是 <code>medium</code>
                    </div>
                </template>
                <x-collapse-item name="1" title="展示代码" title2="隐藏代码">
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
    import ButtonGroup from '../../.././src/button-group'
    import Button from '../../.././src/button'
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Cascader from '../../.././src/cascader'
    import address from '../../.././src/address.js'

    function ajax(parent_id = 0){
        return new Promise(resolve=>{
            let res = address.filter(item=>item.parent_id===parent_id)
            resolve(res)
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
                theSize:'small',
                content:`

                    <x-button-group>
                        <x-button @click="theSize='big'">big</x-button>
                        <x-button @click="theSize='medium'">medium</x-button>
                        <x-button @click="theSize='small'">small</x-button>
                    </x-button-group>


                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic
                                selectToChange
                                :size="theSize"
                    >

                    </x-cascader>

                                                        js
    function ajax(parent_id = 0){
        return new Promise(resolve=>{
            let res = address.filter(item=>item.parent_id===parent_id)
            resolve(res)
        })
    }

    export default {
    data(){
         theSize:'small',
    },
     methods:{
            example({id},updateSource){
                ajax(id).then(res=>{
                    updateSource(res)
                })
            }
        },
    }


`,
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
            'x-cascader':Cascader,
            'x-button':Button,
            'x-button-group':ButtonGroup
        }
    }
</script>

<style scoped>

</style>
