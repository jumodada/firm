<template>
    <table v-if="columns&&columns.length>0" ref="header">
        <colgroup ref="headerColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
            <col v-if="scrollBarWidth>0&&maxHeight" :style="{width: `${scrollBarWidth}px`}">
        </colgroup>
        <thead class="f-table-head">
        <tr>
            <th v-for="column in columns " :key="column.key">
                <div class="f-table-th td-div">
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
            <th style="padding: 0;" v-if="scrollBarWidth>0&&maxHeight"></th>
        </tr>
        </thead>
    </table>
</template>

<script>
    import checkBox from '../../../currency/check-box'

    export default {
        name: "f-table-header",
        components: {
            checkBox
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
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.setColGroup()
            })
        },
        methods: {
            setColGroup() {
                if (this.columns.length === 0) return
                let width = parseInt(getComputedStyle(this.$refs.header).width)
                let length = 0
                this.columns.forEach(col => {
                    if (!col.width) {
                        length++
                    } else {
                        width -= parseInt(col.width + (this.maxHeight?this.scrollBarWidth:0))
                    }
                })
                let averageWidth = parseInt(width / length)
                this.columns.forEach((item, index) => {
                    this.$refs.headerColGroup.children[index].style.width = !item.width ? averageWidth + 'px' : item.width
                })
            },
            selectAll(val) {
                this.$parent.attr.forEach(row => !row._disabled ? row._checked = val : '')
                this.$parent.selectChange()
            }
        },
    }
</script>

<style scoped>
    @import "../../../../src/styles/components/table.scss";
</style>
