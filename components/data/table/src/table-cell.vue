<template>
    <div :class="classes">
        <template v-if="column.key" class="td-div">
            {{item[column.key]}}
        </template>
        <template v-if="column.slot" class="td-div">
            <slot :name="column.slot" :column="item" :index="rowIndex"></slot>
        </template>
        <template v-if="column.type==='selection'">
            <checkBox :value="checked" @input="checkToggle"></checkBox>
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
            cellData:Object,
            index:Number,
            attr:Array,
            checked:Boolean
        },
        data(){
            return {
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
        },
        methods:{
            checkToggle(){
                this.$parent.$parent.toggleSelect(this.index)
            }
        }
    }
</script>

<style scoped>

</style>
