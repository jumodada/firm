<template>
    <div :class="classes" >
        <template v-if="column.key" class="td-div">
            <span>{{item[column.key]}}</span>
        </template>
        <template v-if="column.slot" class="td-div">
            <slot :name="column.slot" :column="item" :index="rowIndex"></slot>
        </template>
        <template v-if="column.type==='selection'">
            <checkBox :disabled="disabled" :value="checked" @input="checkToggle"></checkBox>
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
            fixed:{
                type:String,
                validator: val=>['left','right',''].indexOf(val)>-1,
                default:''
            },
            column:Object,
            item:Object,
            rowIndex:Number,
            cellData:Object,
            index:Number,
            attr:Array,
            checked:Boolean,
            disabled:Boolean,
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
                        'f-table-visable-hidden':this.column.fixed&&!this.fixed
                    }
                ]
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
