<template>
    <table v-if="columns&&columns.length>0" ref="header">
        <colgroup ref="headerColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${colWidth[column._index]}px`}">
            <col v-if="$parent.isYScrollBarShow" :style="{width: `${scrollBarWidth}px`}">
        </colgroup>
        <thead class="f-table-head">
        <tr>
            <th :class="classes(column)" v-for="column in columns" :key="column.key">
                <div :class="classes(column)" class="f-table-th td-div">
                    <template v-if="column.title">
                        {{column.title}}
                    </template>
                    <template v-if="column.type==='selection'">
                        <checkBox :value="checkBoxValue" @input="selectAll"></checkBox>
                    </template>
                    <span class="f-table-th-icon" v-if="column.sortBy=== true">
                            <f-icon @click="sortUp(column.key)"
                                    :style="{fill:order.state=== 'ascending' && order.name===column.key ? '109CCB' : '#666666'}"
                                    name="asc"></f-icon>
                            <f-icon @click="sortDown(column.key)"
                                    :style="{fill:order.state === 'descending' && order.name===column.key ? '109CCB' : '#666666'}"
                                    style="margin-top: 2px" name="desc"></f-icon>
                    </span>
                </div>
            </th>
            <th :class="lastThClass" v-if="$parent.isYScrollBarShow"></th>
        </tr>
        </thead>
    </table>
</template>

<script>
    import checkBox from '../../check-box'

    export default {
        name: "f-table-header",
        components: {
            checkBox
        },
        props: {
            fixed:{
                type:String,
                validator: val=>['left','right',''].indexOf(val)>-1,
                default:''
            },
            scrollBarWidth:{
              type:Number,
              default:0
            },
            columns: {
                type: Array,
                default: () => []
            },
            colWidth:{
                type: Object,
                default: () => {}
            },
            rowData: {
                type: Array,
                default: () => []
            },
            attr: Array
        },
        computed: {
            checkBoxValue() {
                let selection = this.$parent.getSelection()
                let unDisabledSelectionLength = 0
                this.attr.forEach(row => {
                    if (!row._disabled) unDisabledSelectionLength++
                })
                return selection.length === unDisabledSelectionLength
            },
            lastThClass(){
                return [
                    {
                        'f-table-visable-hidden':this.columns.some(col=>col.fixed==='right')&&!this.fixed
                    }
                ]
            }
        },
        methods: {
            selectAll(val) {
                this.$parent.attr.forEach(row => !row._disabled ? row._checked = val : '')
                this.$parent.selectChange()
            },
            classes (column) {
                return [
                    ['left','right','center'].indexOf(column.align)>-1
                    ?`f-align-${column.align}`:'f-align-left',
                    {
                        'f-table-visable-hidden':column.fixed&&!this.fixed,
                    }
                ]
            },
            sortUp(){

            },
            sortDown(){

            }
        },
    }
</script>

<style scoped>
    @import "../../../src/styles/components/table.scss";
</style>
