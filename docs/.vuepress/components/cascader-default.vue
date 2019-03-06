<template>

    <div style="margin-top: 30px">
        <div style="margin-top: 20px;">
               <x-collapse :selected.sync="selectTab" exhibition>

                   <template slot="description">
                       <div style="height: 300px">
                           <x-cascader :source="source"
                                       :selected="selected"
                                       @update:selected="selected=$event">

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
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                selected:[1],
                content:`
`,
                source:[{
                    name:'四川',
                    children:[
                        {name:'成都',
                            children:[{
                            name:'青羊区',children:[{
                                name:'xx中学'
                                },
                                    {
                                        name:'xxx中学'
                                    },
                                    {
                                        name:'xxxx中学'
                                    }]}]
                        },
                        {name:'绵阳',children:[{
                            name:'仔姜王',
                                children:[{name:'味道还行'}]
                            }]},
                        {name:'内江'}
                    ]
                },
                    {
                        name:'广东',
                        children:[
                            {name:'深圳',children:[
                                    {
                                        name:'铁板烧',
                                        children:[{
                                            name:'不好吃'
                                        }]
                                    }
                                ]},
                            {name:'东莞',
                            children:[
                                {
                                    name:'叉烧饭',
                                    children:[{
                                        name:'还可以'
                                    }]
                                }
                            ]},
                            {name:'佛山',children:[
                                    {
                                        name:'叶问',
                                        children:[{
                                            name:'咏春'
                                        }]
                                    }
                                ]},
                        ]
                    }
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
