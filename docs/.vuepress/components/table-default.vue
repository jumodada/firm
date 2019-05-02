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
                    {text:'名字',field:'name',sortBy:true},
                    {text:'价格',field:'price',sortBy:true}
                ],
                columns2:[
                    {text:'名字',field:'name'},
                    {text:'价格',field:'price'}
                ],
                data:[
                    {key:1,name:'JavaScript高级程序设计',price:80},
                    {key:2,name:'C语言程序设计',price:100},
                    {key:3,name:'Java编程思想',price:60},
                    {key:4,name:'Python从入门到精通',price:50},
                    {key:5,name:'JavaScript高级程序设计',price:80},
                    {key:6,name:'C语言程序设计',price:100},
                    {key:7,name:'Java编程思想',price:60},
                    {key:8,name:'Python从入门到精通',price:50},
                    {key:9,name:'JavaScript高级程序设计',price:80},
                    {key:10,name:'C语言程序设计',price:100},
                    {key:11,name:'Java编程思想',price:60},
                    {key:12,name:'Python从入门到精通',price:50},
                    {key:13,name:'JavaScript高级程序设计',price:80},
                    {key:14,name:'C语言程序设计',price:100},
                    {key:15,name:'Java编程思想',price:60},
                    {key:16,name:'Python从入门到精通',price:50},
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
