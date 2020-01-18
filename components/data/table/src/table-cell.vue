<template>
    <div :class="classes" >
        <template v-if="column.key" class="td-div">
            <span>{{row[column.key]}}</span>
        </template>
        <template v-if="column.type==='selection'">
            <checkBox :disabled="disabled" :value="checked" @input="checkToggle"></checkBox>
        </template>
        <Render
                v-if="column.slot"
                :row="row"
                :column="column"
                :index="index"
        />
    </div>
</template>

<script>
    import checkBox from '../../../currency/check-box'
    import Render from './table-render'
    export default {
        name: "table-cell",
        inject: ['tableRoot'],
        components:{
            Render,
            checkBox
        },
        props:{
            fixed:{
                type:String,
                validator: val=>['left','right',''].indexOf(val)>-1,
                default:''
            },
            column:Object,
            row:Object,
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
