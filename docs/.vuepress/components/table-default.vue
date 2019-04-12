<template>
    <div>
        <x-table :columns="columns" :data="data">

        </x-table>
    </div>
</template>

<script>
    import Table from '../../../src/data/table'
    export default {
        name: "table-default",
        components:{
            'x-table':Table
        },
        data(){
            return {
                currentPage:1,
                columns:[],
                data:[]
            }
        }
    }
</script>

<style scoped>

</style>
