<template>
    <table>
        <colgroup ref="bodyColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
        </colgroup>
        <tbody ref="tBodyMain">
        <tr v-if="bodyData.length===0">
            <td style="display: flex;align-items: center;justify-content: center" :colspan="columns.length">
                <f-icon name="none" style="margin-right: 5px"></f-icon>
                暂无数据
            </td>
        </tr>
        <tr v-for="(item,rowIndex) in bodyData" :key="rowIndex"
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
            hoverChangeMain(index, e) {
                let typeName = {
                    mouseenter: '#fafafa',
                    mouseleave: ''
                }
                this.$refs.trMain[index].style.backgroundColor = typeName[e.type]
            },
            setColGroup() {
                if (this.columns.length === 0) return
                let width = parseInt(getComputedStyle(this.$parent.$refs.tableFixedHeaderWrapper).width)
                let length = 0
                this.columns.forEach(col => {
                    if (!col.width) {
                        length++
                    }else{
                        width -= parseInt(col.width + (this.maxHeight?this.scrollBarWidth:0))
                    }
                })
                let averageWidth = parseInt(width / length)
                let remainder = width - parseInt(length*averageWidth)
                let colHaveNoWidth = []
                while(colHaveNoWidth.length<length){
                    colHaveNoWidth.push(averageWidth)
                }
                colHaveNoWidth.forEach((width,index)=>{
                        if(index>=colHaveNoWidth.length-remainder)colHaveNoWidth[index]++
                    }
                )
                this.columns.forEach((item, index) => {
                    this.$refs.bodyColGroup.children[index].style.width = !item.width ? colHaveNoWidth.shift() + 'px' : item.width
                })
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

