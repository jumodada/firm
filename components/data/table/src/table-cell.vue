<template>
    <div :class="classes">
        <template v-if="column.key" class="td-div">
            {{item[column.key]}}
        </template>
        <template v-if="column.slot" class="td-div">
            <slot :name="column.slot" :column="item" :index="rowIndex"></slot>
        </template>
        <template v-if="column.type==='selection'">
            <checkBox v-model="checkedValue"></checkBox>
        </template>
    </div>
</template>

<script>
    import checkBox from '../../../currency/check-box'
    export default {
        name: "table-cell",
        components:{
            checkBox
        },
        props:{
            column:Object,
            item:Object,
            rowIndex:Number,
        },
        data(){
            return {
                checkedValue:false
            }
        },
        computed:{
            classes () {
                return [
                    `f-table-cell`,
                    {
                    }
                ];
            },
        }
    }
</script>

<style scoped>

</style>
