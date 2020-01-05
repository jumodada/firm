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
        <tr :class="{onHover:attr[rowIndex]._isHover}" v-for="(item,rowIndex) in bodyData" :key="rowIndex"
            @mouseenter="hoverChangeMain(rowIndex,$event)"
            @mouseleave="hoverChangeMain(rowIndex,$event)"
            ref="trMain">
            <td v-if="numberVisible">{{rowIndex+1}}</td>
            <template v-for="(column,colIndex) in headersCollection[rowIndex] || columns">
                <td :key="column.key">
                    <Cell :item="item"
                          :index="rowIndex"
                          :checked="checkToggle(rowIndex)"
                          :column="column"
                          :disabled="isDisabled(rowIndex)"
                          :rowIndex="rowIndex"
                    ></Cell>
                </td>
            </template>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Cell from './table-cell'
    import {deepClone} from "../../../../src/utils/common";
    export default {
        name: "table-body",
        components: {
            Cell
        },
        props: {
            maxHeight:{
                type: [Number, String]
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
            hoverChangeMain(index) {
                let copyAttr = deepClone(this.attr)
                copyAttr.forEach((row,_index)=>copyAttr[index]._isHover = _index === index)
                this.$emit('update:attr',copyAttr)
                console.log(copyAttr)
                // 数据量大的情况，诸如此类的通信方式会卡。之后会做修改
                //todo 考虑直接dom操作
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

