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
        mounted() {
            this.$nextTick(() => this.setColGroup())
        },
        methods: {
            hoverChangeMain(index, e) {
                let typeName = {
                    mouseenter: '#FCF9F9',
                    mouseleave: ''
                }
                this.$refs.trMain[index].style.backgroundColor = typeName[e.type]
            },
            setColGroup() {
                if (this.columns.length === 0) return
                let width = parseInt(getComputedStyle(this.$parent.$refs.tableFixedHeader.$el).width)
                let averageWidth = parseInt(width / this.columns.length)
                this.columns.forEach((item, index) => {
                    if (!item.width) {
                        this.$refs.bodyColGroup.children[index].style.width = averageWidth + 'px'
                    }
                })
            },
            checkToggle(index){
                return this.attr[index]&&this.attr[index]._checked
            }
        }
    }
</script>

