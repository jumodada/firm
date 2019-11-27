<template>
    <div class="x-table-wrapper"
         style="position:relative;overflow: hidden;" ref="totalWrapper">
        <!--  主体-->
        <div class="x-table-main">
            <div class="x-table-main-header"
                 ref="tableFixedHeaderWrapper"
            >
                <tableHeader :columns="headerColumns" class="x-table" :class="{bordered,stripe}" ref="tableFixedHeader">
                </tableHeader>
            </div>
            <div class="x-table-main-body"
                 :style="{overflow:'auto'}"
                 ref="tableMainWrapper"
            >
                <table class="x-table" :class="{bordered,stripe:stripe}" ref="tableMain">
                    <colgroup ref="bodyColGroup">
                        <col v-for="(column,index) in headerColumns" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody ref="tBodyMain">
                    <tr v-if="data.length===0">
                        <td style="display: flex;align-items: center;justify-content: center" :colspan="headerColumns.length">
                            <f-icon name="none" style="margin-right: 5px"></f-icon>暂无数据
                        </td>
                    </tr>
                    <tr v-for="(item,rowIndex) in bodyData" :key="rowIndex"
                        @mouseenter="hoverChangeMain(rowIndex,$event)"
                        @mouseleave="hoverChangeMain(rowIndex,$event)"
                        ref="trMain">
                        <td v-if="numberVisible">{{rowIndex+1}}</td>
                        <template v-for="(column,colIndex) in headersCollection[rowIndex] || headerColumns">
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
            </div>
        </div>
        <transition name="fade">
            <loading v-if="loading" class="x-table-loading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from '../../../currency/dynamic icon/loading'
    import Icon from '../../../currency/icon/src/icon'
    import xScroll from './scroll-synchro'
    import {deepClone, recurrenceOnceDeepCopy} from "../../../../src/utils/common"
    import elementResizeDetectorMaker from 'element-resize-detector'
    import tableHeader from './table-header'
    export default {
        name: "f-table",
        directives: {
            xScroll
        },
        components: {
            'f-icon': Icon,
            loading: loading,
            tableHeader
        },
        props: {
            stripe: {
                type: Boolean,
                default: true
            },
            maxHeight: {
                type: [Number, String]
            },
            maxWidth: {
                type: [Number, String]
            },
            bordered: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true,
                validator(item) {
                    if (item.id) return false
                    return true
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            numberVisible: {
                type: Boolean,
                default: false
            },
            checkBoxOn: {
                type: Boolean,
                default: false
            },
            selectedItems: {
                type: Array,
                default: () => []
            },
            defaultSort: Object,
            spanMethod: Function
        },
        data() {
            return {
                order: {},
                bodyData: [],
                headerColumns: [],
                fixedLeft: [],
                fixedRight: [],
                hiddenShadow: {
                    left: true,
                    right: false
                },
                oldScrollLeft: 0,
                cell: [],
                headersCollection: [],
                tableWidth: 0
            }
        },
        mounted() {
            this.copyColumns()
            this.copyBodyData()
            this.listenToReSize()
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.listenToWindowResize)
            this.observer.removeListener(this.$el, this.tableResize);
        },
        watch: {
            data() {
                this.copyColumns()
                //this.checkFixed()
                this.copyBodyData()
                this.$nextTick(() => {
                    this.tableResize()
                })
               // this.setHeadersCollection()
            }
        },
        methods: {
            setColGroup() {
                let width = parseInt(getComputedStyle(this.$refs.tableFixedHeader.$el).width)
                let averageWidth = parseInt(width / this.headerColumns.length)
                this.headerColumns.forEach((item, index) => {
                    if (!item.width) {
                        ['bodyColGroup'].forEach(item => this.$refs[item].children[index].style.width = averageWidth + 'px')
                    }
                })
            },
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
            listenToReSize() {
                window.addEventListener('resize', this.listenToWindowResize)
                this.observer = elementResizeDetectorMaker()
                this.observer.listenTo(this.$el, this.tableResize)
            },
            listenToWindowResize() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.tableResize()
                }, 150)
            },
            tableResize() {
                if(this.headerColumns.length===0)return
                let tableWidth = parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).width)
                this.setHeaderToTop(tableWidth)
                this.setMainWidth(tableWidth)
            },
            setMainWidth(tableWidth) {
                let [$refs, width] = [this.$refs, 0]
                if (!this.tableWidth || this.tableWidth === 0) {
                    width = tableWidth
                } else {
                    width = this.tableWidth
                }

                $refs.tableMain.style.width = width + 'px'
                this.setColGroup()
            },
            setHeaderToTop(tableWidth) {
                if(this.$refs.tableFixedHeader.$el.style){
                    this.$refs.tableFixedHeader.$el.style.width = tableWidth
                }
            },
            checkFixed() {
                let [left, right, main] = [[], [], []]
                this.columns.forEach(item => {
                    if (item.fixed === 'left') {
                        left.push(item)
                    } else if (item.fixed === 'right') {
                        right.push(item)
                    } else {
                        main.push(item)
                    }
                })
                if (left.length > 0) this.fixedLeft = left.concat(main, right)
                if (right.length > 0) this.fixedRight = right.concat(main, left)
                this.headerColumns = left.concat(main, right)
            },
            copyBodyData() {
                this.bodyData = deepClone(this.data)
            },
            copyColumns() {
                this.headerColumns = deepClone(this.columns)
            },
            setHeadersCollection() {
                let i = 0
                while (i < this.bodyData.length) {
                    this.headersCollection[i] = recurrenceOnceDeepCopy(this.headerColumns)
                    i++
                }
            },
            clickSort(key, direction) {
                this.order.state = this.order.state === true || this.order.name !== key ? direction : (this.order.state = this.order.state === direction ? true : direction);
                this.bodyData = this.order.state !== true ? this.bodyData.sort((a, b) => {
                    return a[key] < b[key] ? direction === 'ascending' ? -1 : 1 : direction === 'ascending' ? 1 : -1
                }) : JSON.parse(JSON.stringify(this.data));
                this.order.name = key
            },
            sortUp(key) {
                this.clickSort(key, 'ascending')
            },
            sortDown(key) {
                this.clickSort(key, 'descending')
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../../src/styles/table";
</style>
