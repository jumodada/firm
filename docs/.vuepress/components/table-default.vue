<template>
    <div>
        <x-table :columns="columns1"
                 :data="data" check-box-on
                 :selected-items.sync="selected"
                 :defaultSort="defaultSort"
                 :stripe="false"
                 maxHeight="400"
        >
        </x-table>
    </div>
</template>

<script>
    import Table from '../../../src/data/table/table'
    export default {
        name: "table-default",
        components:{
            'x-table':Table
        },
        data(){
            return {
                currentPage:1,
                columns1:[
                    {text:'名字',field:'name',sortBy:true,width:150},
                    {text:'价格',field:'price',sortBy:true,width:180}
                ],
                columns2:[
                    {text:'名字',field:'name'},
                    {text:'价格',field:'price'}
                ],
                data:[
                    {key:1,name:'JavaScript高级程序设计',price:80},
                    {key:2,name:'C语言教程',price:100},
                    {key:3,name:'Java编程思想',price:60},
                    {key:4,name:'Python从入门到精通',price:50},
                    {key:5,name:'JavaScript高级程序设计',price:80},
                    {key:6,name:'你不知道的JavaScript',price:200},
                    {key:7,name:'Java从入门到精通',price:120},
                    {key:8,name:'webpack从入门到入土',price:140},
                    {key:9,name:'不值钱的PHP教程',price:10},
                    {key:10,name:'谭浩强的最不值钱的C语言程序设计',price:0.01},
                    {key:11,name:'计算机科学导论',price:90},
                    {key:12,name:'高性能JavaScript',price:70},
                    {key:13,name:'代码大全',price:99},
                    {key:14,name:'图解HTTP',price:39},
                    {key:15,name:'SVG动画',price:79.9},
                    {key:16,name:'如何快速而隐蔽的扎破产品经理的车胎',price:500},
                ],
                selected:[],
                defaultSort: {prop:'name',order:''}
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
</style>
