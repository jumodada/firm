<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">
               <x-collapse :selected.sync="selectTab" exhibition>
                   <template slot="description">
                           <x-cascader :source="source"
                                       :selected.sync="selected"
                           >

                           </x-cascader>
                       <div style="margin-top: 40px;color: #999999">
                        数据格式如代码所示，默认选取完成才显示并自动关闭。(选取既展示功能尚未完成，先做动态数据展示，刚把动画过渡效果做好)。
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
    export default {
        name: "grid-arrange",

        data(){
            return {
                selectTab:[1],
                selected:[1],
                content:`
                   <x-cascader :source="source"
                   :selected.sync="selected"
                     >
                     </x-cascader>

                                                    js
          data(){
            return {
                selected:[1],
                source:[{
                    name:'北京',children:[
                    {
                        name:'东城区',
                        children:[{
                            name:'东城小学'
                        },
                            {
                                name:'东城中学'
                            },
                            {
                                name:'东城大学'
                            },
                            {
                                name:'东城幼儿园'
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
                        },
                            {
                                name:'雅安',
                                children:[
                                    {name:'雅安小学'},
                                    {name:'雅安中学'},
                                    {name:'雅安大学'},
                                    {name:'雅安幼儿园'}]
                            }]
                    },
                    {
                        name:'黑龙江',
                        children:[{
                            name:'哈尔滨',
                            children:[{name:'哈尔滨小学'},{name:'啤酒中学'},{name:'勇闯天涯中学'}]
                        },
                            {
                                name:'齐齐哈尔',
                                children:[{name:'齐齐哈尔小学'},{name:'齐齐哈尔中学'},{name:'齐齐哈尔大学'}]
                            }
                        ]
                    },

                    ]
            }
        },
`,
                source:[{
                    name:'北京',children:[
                    {
                        name:'东城区',
                        children:[{
                            name:'东城小学'
                        },
                            {
                                name:'东城中学'
                            },
                            {
                                name:'东城大学'
                            },
                            {
                                name:'东城幼儿园'
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
                        },
                            {
                                name:'雅安',
                                children:[
                                    {name:'雅安小学'},
                                    {name:'雅安中学'},
                                    {name:'雅安大学'},
                                    {name:'雅安幼儿园'}]
                            }]
                    },
                    {
                        name:'黑龙江',
                        children:[{
                            name:'哈尔滨',
                            children:[{name:'哈尔滨小学'},{name:'啤酒中学'},{name:'勇闯天涯中学'}]
                        },
                            {
                                name:'齐齐哈尔',
                                children:[{name:'齐齐哈尔小学'},{name:'齐齐哈尔中学'},{name:'齐齐哈尔大学'}]
                            }
                        ]
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
