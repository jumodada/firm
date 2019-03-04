<template>

    <div style="margin-top: 30px">
        <!--<div style="margin-top: 20px">-->
               <!--<x-collapse :selected.sync="selectTab" exhibition>-->

                   <!--<template slot="description">-->
                       <!--<x-cascader :source="source">-->

                       <!--</x-cascader>-->
                   <!--</template>-->
                <!--<x-collapse-item name="1" title="代码">-->
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
    export default {
        name: "grid-arrange",
        data(){
            return {
                selectTab:[1],
                content:`
`,
                source:[{
                    name:'四川',
                    children:[
                        {name:'成都',
                            children:[{
                            name:'青羊区',children:[{
                                name:'xx中学'
                                }]}]
                        },
                        {name:'绵阳'},
                        {name:'内江'}
                    ]
                },
                    {
                        name:'广东',
                        children:[
                            {name:'深圳'},
                            {name:'东莞'},
                            {name:'佛山'},
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
