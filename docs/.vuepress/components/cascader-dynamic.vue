<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">

            <x-collapse :selected.sync="selectTab" exhibition>
                <template slot="description">
                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic
                    >

                    </x-cascader>
                    <div style="margin-top: 40px;color: #999999">
                        使用 <code>dynamic</code>即可把 <code>source</code>作为动态数据传入。
                        选择关闭将等 <code>ajax</code>请求到来后做判断，这也是完成选择后关闭可能会延时的原因。
                        <br>
                        数据格式如代码所示。
                        还须传递一个函数<code>:loadData="example"</code>。
                        如代码所示，函数第二个参数是一个回调函数，获取的数据作为参数传给这个回调。
                        (后面加入loading的动画)
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
                content:`
                    <x-cascader :source.sync="source"
                                :selected.sync="selected"
                                :loadData="example"
                                dynamic>
                    </x-cascader>

                                                        js
    function ajax(parent_id = 0){
        return new Promise(resolve=>{
            let res = address.filter(item=>item.parent_id===parent_id)
            resolve(res)
        })
    }

    export default {
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
            'x-cascader':Cascader
        }
    }
</script>

<style scoped>

</style>
