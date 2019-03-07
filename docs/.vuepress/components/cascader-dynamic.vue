<template>

    <div style="margin-top: 30px">
        <!--<div style="margin-top: 20px;">-->
            <!--<x-collapse :selected.sync="selectTab" exhibition>-->
                <!--<template slot="description">-->
                    <!--<x-cascader :source="source"-->
                                <!--:selected.sync="selected"-->
                    <!--&gt;-->

                    <!--</x-cascader>-->
                    <!--<div style="margin-top: 40px;color: #999999">-->
                        <!--数据格式如代码所示，默认选取完成才显示并自动关闭。(选取既展示功能尚未完成，先做动态数据展示，刚把动画过渡效果做好)。-->
                    <!--</div>-->
                <!--</template>-->
                <!--<x-collapse-item name="1" title="展示代码" title2="隐藏代码">-->
           <!--<pre>-->
               <!--<code>-->
                    <!--{{content}}-->
               <!--</code>-->
            <!--</pre>-->
                <!--</x-collapse-item>-->
            <!--</x-collapse>-->
        <!--</div>-->
    </div>
</template>

<script>
    import collapse from '../../.././src/collapse'
    import collapseItem from '../../.././src/collapse-item'
    import Cascader from '../../.././src/cascader'
    import address from '../../.././src/address.js'
    export default {
        name: "grid-arrange",

        data(){
            return {
                selectTab:[1],
                selected:[1],
                content:`
`,
                source:[

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
