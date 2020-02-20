<template>
    <table>
        <colgroup ref="bodyColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${colWidth[column._index]}px`}">
        </colgroup>
        <tbody ref="tBodyMain">
        <tr v-if="bodyData.length===0">
            <td style="display: flex;align-items: center;justify-content: center" :colspan="columns.length">
                <f-icon name="none" style="margin-right: 5px"></f-icon>
                暂无数据
            </td>
        </tr>
        <tr :class="{onHover:attr[rowIndex]._isHover}" v-for="(row,rowIndex) in bodyData" :key="rowIndex"
            @mouseenter="hoverSynchro(rowIndex,$event)"
            @mouseleave="hoverSynchro(rowIndex,$event)"
            ref="trMain">
            <td v-if="numberVisible">{{rowIndex+1}}</td>
            <template v-for="(column,colIndex) in headersCollection[rowIndex] || columns">
                <td :class="classes(column)" :key="column.key">
                    <Cell :row="row"
                          :fixed="fixed"
                          :index="rowIndex"
                          :checked="checkToggle(rowIndex)"
                          :column="column"
                          :disabled="isDisabled(rowIndex)"
                          :rowIndex="rowIndex"
                    />
                </td>
            </template>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Cell from './table-cell'
    import {deepClone} from "../../../src/utils/common"
    export default {
        name: "table-body",
        components: {
            Cell
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
            attr:{
              type:Array
            },
            bodyData: {
                type: Array,
                default: () => []
            },
            numberVisible: {
                type: Boolean,
                default: false
            },
            headersCollection: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            classes (column) {
                return [
                    ['left','right','center'].indexOf(column.align)>-1
                        ?`f-align-${column.align}`:'f-align-left',
                    {
                        'f-table-visable-hidden':column.fixed&&!this.fixed
                    }
                ]
            },
            hoverSynchro(_index,e) {
                let copyAttr = deepClone(this.attr)
                copyAttr[_index]._isHover = e.type==='mouseenter'
                this.$emit('update:attr',copyAttr)
                // todo 数据量大的情况，此类的通信方式会卡。
            },
            checkToggle(index){
                return this.attr[index]&&this.attr[index]._checked
            },
            isDisabled(index){
                return this.attr[index]&&this.attr[index]._disabled
            }
        }
    }
</script>

