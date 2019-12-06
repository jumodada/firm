<template>
    <table v-if="columns&&columns.length>0" ref="header">
        <colgroup ref="headerColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
        </colgroup>
        <thead class="f-table-head">
        <tr>
            <th v-for="column in columns " :key="column.key">
                <div class="f-table-th td-div">
                    {{column.title}}
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
        </tr>
        </thead>
    </table>
</template>

<script>
    export default {
        name: "f-table-header",
        props:{
            columns:{
                type:Array,
                default:()=>[]
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.setColGroup()
            })
        },
         methods:{
             setColGroup() {
                 if(this.columns.length===0)return
                 let width = parseInt(getComputedStyle(this.$refs.header).width)
                 let averageWidth = parseInt(width / this.columns.length)
                 this.columns.forEach((item, index) => {
                     if (!item.width) this.$refs.headerColGroup.children[index].style.width = averageWidth + 'px'
                 })
             },
         }
    }
</script>

<style scoped>
    @import "../../../../src/styles/components/table.scss";
</style>
