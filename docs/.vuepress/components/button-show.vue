<template>
    <div>
        <x-table style="margin-top: 30px" :columns="columns" :data="data" :stripe="false">

        </x-table>
    </div>
</template>

<script>
    import Table from '../../../src/data/table'
    export default {
        name: "button-show",
        components:{
            'x-table':Table
        },
        data(){
            return {
                currentPage:1,
                columns:[
                    {text:'名字',field:'name'},
                    {text:'价格',field:'price'}
                ],
                data:[
                    {id:1,name:'C语言程序设计',price:100+'￥'},
                    {id:2,name:'JavaScript高级程序设计',price:80+'￥'},
                    {id:3,name:'Java编程思想',price:60+'￥'},
                    {id:4,name:'Python从入门到精通',price:50+'￥'},
                ],
                selected:[]
            }
        },
    }
</script>

<style scoped>

</style>
