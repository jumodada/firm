<template>
    <div>
        <x-table :columns="columns1"
                 :data="data"
                 check-box-on
                 :selected-items.sync="selected"
                 :defaultSort="defaultSort"
                 :stripe="false"
                 maxHeight="308"
                 max-width="900"
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
                    {text:'名字',field:'name',sortBy:true,width:200},
                    {text:'价格',field:'price',sortBy:true,width:200,fixed:'left'},
                    {text:'年份',field:'year',sortBy:true,width:200},
                    {text:'简介',field:'introduction',sortBy:true,width:300,fixed:'right'},
                    {text:'作者',field:'author',sortBy:true,width:200},
                ],
                columns2:[
                    {text:'名字',field:'name'},
                    {text:'价格',field:'price'}
                ],
                data:[
                    {key:1,name:'JavaScript',price:80,year:12,introduction:'   fgfgfhh ',author:'鲁迅'},
                    {key:2,name:'C语言教程',price:100,year:2,introduction:'     sadasd             ',author:'周树人'},
                    {key:3,name:'Java编程思想',price:60,year:31,introduction:'     dds               ',author:'迅哥'},
                    {key:4,name:'Python从入门到精通',price:50,year:43,introduction:'    fgfg             ',author:'索子'},
                    {key:5,name:'JavaScript高级程序设计',price:80,year:5,introduction:'sdsd             ',author:'周豫才'},
                    {key:6,name:'你不知道的JavaScript',price:200,year:6,introduction:'gfgf                    ',author:'不堂'},
                    {key:7,name:'Java从入门到精通',price:120,year:7,introduction:' sds                 ',author:'莫朕'},
                    {key:9,name:'PHP从入门到转行',price:100,year:23,introduction:'     dfd               ',author:'庚辰'},
                    {key:10,name:'c++从入门到掉发',price:40,year:45,introduction:'     dfd               ',author:'尤刚'},
                    {key:11,name:'Ruby从入门到秃头',price:10,year:2,introduction:'     dfd               ',author:'俟堂'},
                    {key:12,name:'webpack从入门到入土',price:150,year:18,introduction:'     dfd               ',author:'宴之敖者'},
                    {key:13,name:'程序员的养生之道',price:190,year:83,introduction:'     dfd               ',author:'丰之余'},
                    {key:14,name:'图解HTTP',price:32,year:34,introduction:'     dfd               ',author:'迅哥儿'},

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
