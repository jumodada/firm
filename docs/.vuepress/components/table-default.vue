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
    import Table from '../../../components/data/table/src/table'
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
                    {key:1,name:'JavaScript',price:1,year:12,introduction:'   fgfgfhh ',author:'鲁迅'},
                    {key:2,name:'C语言教程',price:2,year:2,introduction:'     sadasd             ',author:'周树人'},
                    {key:3,name:'Java编程思想',price:3,year:31,introduction:'     dds               ',author:'迅哥'},
                    {key:4,name:'Python从入门到精通',price:4,year:43,introduction:'    fgfg             ',author:'索子'},
                    {key:5,name:'JavaScript高级程序设计',price:5,year:5,introduction:'sdsd             ',author:'周豫才'},
                    {key:6,name:'你不知道的JavaScript',price:6,year:6,introduction:'gfgf                    ',author:'不堂'},
                    {key:7,name:'Java从入门到精通',price:7,year:7,introduction:' sds ff                ',author:'莫朕'},
                    {key:9,name:'PHP从入门到转行',price:8,year:23,introduction:'    sd dfd               ',author:'庚辰'},
                    {key:10,name:'c++从入门到掉发',price:9,year:45,introduction:'  gh   dfd               ',author:'尤刚'},
                    {key:11,name:'Ruby从入门到秃头',price:10,year:2,introduction:'    f dfd               ',author:'俟堂'},
                    {key:12,name:'webpack从入门到入土',price:11,year:18,introduction:'   d  dfd               ',author:'宴之敖者'},
                    {key:13,name:'程序员的养生之道',price:12,year:83,introduction:'     dfd d              ',author:'丰之余'},
                    {key:14,name:'图解HTTP',price:13,year:34,introduction:'     dfd   g            ',author:'迅哥儿'},
                    {key:15,name:'c++d',price:14,year:45,introduction:'     dfd   l            ',author:'尤刚'},
                    {key:16,name:'d',price:15,year:2,introduction:'     dfd     k          ',author:'俟堂'},
                    {key:17,name:'c',price:16,year:18,introduction:'     dfd    h           ',author:'宴之敖者'},
                    {key:18,name:'b',price:17,year:83,introduction:'     dfd  g             ',author:'丰之余'},
                    {key:19,name:'a',price:18,year:34,introduction:'     dfd ddd              ',author:'迅哥儿'},

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
