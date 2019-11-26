<template>
    <table class="x-table" :class="{bordered,stripe:stripe}" ref="tableFixedHeader">
        <colgroup ref="headerColGroup">
            <col v-for="(column,index) in headerColumns" :key="index" :style="{width:`${column.width}px`}">
        </colgroup>
        <thead class="x-table-head">
        <tr>
            <th v-for="column in headerColumns " :key="column.key">
                <div class="x-table-th td-div">
                    {{column.title}}
                    <span class="x-table-th-icon" v-if="column.sortBy=== true">
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

        }
    }
</script>

<style scoped>
    @import "../../../../src/styles/table.scss";
</style>
