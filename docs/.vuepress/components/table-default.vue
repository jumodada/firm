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
                    {text:'名字',field:'name',sortBy:true,width:100},
                    {text:'价格',field:'price',sortBy:true,width:120,fixed:'left'},
                    {text:'年份',field:'year',sortBy:true,width:180},
                    {text:'简介',field:'introduction',sortBy:true,width:180},
                ],
                columns2:[
                    {text:'名字',field:'name'},
                    {text:'价格',field:'price'}
                ],
                data:[
                    {key:1,name:'JavaScript高级程序设计',price:80,year:1,introduction:'       '},
                    {key:2,name:'C语言教程',price:100,year:2,introduction:'                    '},
                    {key:3,name:'Java编程思想',price:60,year:3,introduction:'                  '},
                    {key:4,name:'Python从入门到精通',price:50,year:4,introduction:'               '},
                    {key:5,name:'JavaScript高级程序设计',price:80,year:5,introduction:'                 '},
                    {key:6,name:'你不知道的JavaScript',price:200,year:6,introduction:'               '},
                    {key:7,name:'Java从入门到精通',price:120,year:7,introduction:'             '},
                    {key:8,name:'webpack从入门到入土',price:140,year:8,introduction:'                '},

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
