<template>
    <table>
        <colgroup ref="bodyColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
        </colgroup>
        <tbody ref="tBodyMain">
        <tr v-if="data.length===0">
            <td style="display: flex;align-items: center;justify-content: center" :colspan="columns.length">
                <f-icon name="none" style="margin-right: 5px"></f-icon>暂无数据
            </td>
        </tr>
        <tr v-for="(item,rowIndex) in bodyData" :key="rowIndex"
            @mouseenter="hoverChangeMain(rowIndex,$event)"
            @mouseleave="hoverChangeMain(rowIndex,$event)"
            ref="trMain">
            <td v-if="numberVisible">{{rowIndex+1}}</td>
            <template v-for="(column,colIndex) in headersCollection[rowIndex] || columns">
                <td :key="column.key" :colspan="cell[colIndex]&&cell[colIndex][rowIndex].colspan"
                    :rowspan="cell[colIndex]&&cell[colIndex][rowIndex].rowspan">
                    <div class="td-div" :style="{visibility:column.fixed==='left'?'hidden':''}">
                        {{item[column.key]}}
                    </div>
                    <div class="td-div">
                        <slot :name="column.slot" :column="item" :index="rowIndex"></slot>
                    </div>
                </td>
            </template>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "table-body",
        props:{
            columns:{
                type:Array,
                default:()=>[]
            },
            bodyData:{
                type:Array,
                default:()=>[]
            }

        },
        methods:{
            hoverChangeMain(index, e) {
                let typeName = {
                    mouseenter: '#FCF9F9',
                    mouseleave: ''
                }
                this.$refs.trMain[index].style.backgroundColor = typeName[e.type]
                if (this.fixedLeft.length > 0) {
                    this.$refs.trLeft[index].style.backgroundColor = typeName[e.type]
                }
                if (this.fixedRight.length > 0) {
                    this.$refs.trRight[index].style.backgroundColor = typeName[e.type]
                }
            },
        }
    }
</script>

<style scoped>

</style>
