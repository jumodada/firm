<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">
               <x-collapse :selected.sync="selectTab" exhibition>

                   <template slot="description">
                       <div style="height: 300px">
                           <x-cascader :source="source"
                                       :selected.sync="selected"
                           >

                           </x-cascader>
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
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Cascader from '../../.././src/cascader'
    import address from "../../../src/address";

    function ajax(parentId=0) {
       return new Promise((resolve,reject)=>{
           let result = address.filter(item=>item.parent_id===parentId)
           resolve(result)

       })
    }
    // console.log(ajax())
    export default {
        name: "grid-arrange",
        // created(){
        //   ajax(0).then(res=>{
        //       this.source = res
        //   })
        // },
        data(){
            return {
                selectTab:[1],
                selected:[1],
                content:`
`,
                source:[{
                    name:'北京',children:[
                    {
                        name:'东城区',
                        children:[{
                            name:'东城小学'
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
                        }]
                    },
                    {
                        name:'黑龙江'
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
            // xxxx(){
            //     ajax(this.selected[0].id).then(res=>{
            //       let prov = this.source.filter(item=>item.id===this.selected[0].id)[0]
            //         this.$set(prov,'children',res)
            //         console.log(this.source)
            //     })
            // },
            // loadData(node,callback){
            //     let {name,id,parent_id} = node
            //     ajax(id).then(res=>{
            //         callback(res)
            //     })
            // }

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
