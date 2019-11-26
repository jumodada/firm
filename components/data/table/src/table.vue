<template>
    <div class="x-table-wrapper"
         :class="{borderHidden:columns[0].width}" style="position:relative;overflow: hidden;" ref="totalWrapper">
        <!--  主体-->
        <div class="x-table-main">
            <div class="x-table-main-header"
                 ref="tableFixedHeaderWrapper"
                 @scroll.passive="scrollLeftGradient"
            >
                <tableHeader :columns="headerColumns" class="x-table" :class="{bordered,stripe}" ref="tableFixedHeader">
                </tableHeader>
            </div>
            <div class="x-table-main-body"
                 :style="{overflow:'auto'}"
                 @scroll.passive="scrollGradient"
                 ref="tableMainWrapper"
            >
                <table class="x-table" :class="{bordered,stripe:stripe}" ref="tableMain">
                    <colgroup ref="bodyColGroup">
                        <col v-for="(column,index) in headerColumns" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody ref="tBodyMain">
                    <tr v-if="data.length===0">
                        <td :colspan="headerColumns.length">暂无数据</td>
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
        <!--              左边固定-->
        <div class="x-table-left"
             :class="{boxShadowNone:hiddenShadow.left}"
             ref="left">
            <div v-if="fixedLeft.length>0"
                 :class="{boxShadowNone:hiddenShadow.left}"
                 class="x-table-left-header"
                 :style="{overflow:'hidden'}"
                 ref="tableFixedLeftHeaderWrapper">
                <table class="x-table" :class="{bordered,stripe:stripe}" v-if="columns[0].width"
                       ref="tableFixedLeftHeader">
                    <colgroup>
                        <col v-for="(column,index) in fixedLeft" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="column in fixedLeft" :key="column.key">
                            <div class="x-table-th">
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
            </div>
            <div class="x-table-left-body"
                 :style="{overflow:'hidden',overflowY:'scroll'}"
                 ref="tableLeftWrapper"
                 v-xScroll
                 v-if="fixedLeft.length>0"
            >
                <table class="x-table" :class="{bordered,stripe:stripe}" ref="tableLeft">
                    <colgroup>
                        <col v-for="column in fixedLeft" :key="column.key" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody>
                    <tr v-for="(item,index) in bodyData" :key="index"
                        @mouseenter="hoverChangeMain(index,$event)"
                        @mouseleave="hoverChangeMain(index,$event)"
                        ref="trLeft"
                    >
                        <td v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in fixedLeft" class="td-div">
                            <td :key="column.key">
                                <span :style="{visibility:column.fixed==='left'?'':'hidden'}">{{item[column.key]}}</span>
                            </td>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--  右边固定  -->
        <div class="x-table-right"
             :class="{boxShadowNone:hiddenShadow.right}"
             ref="right">
            <div v-if="fixedRight.length>0"
                 :class="{boxShadowNone:false}"
                 class="x-table-right-header" :style="{maxHeight:`${maxHeight+'px'}`,overflow:'hidden'}"
                 ref="tableFixedRightHeaderWrapper">
                <table class="x-table" :class="{bordered,stripe:stripe}" v-if="fixedRight.length>0"
                       ref="tableFixedRightHeader">
                    <colgroup>
                        <col v-for="(column,index) in fixedRight" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="column in fixedRight" :key="column.key">
                            <div class="x-table-th">
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
            </div>
            <div class="x-table-right-body" :style="{overflow:'hidden',overflowY:'scroll'}"
                 ref="tableRightWrapper"
                 v-xScroll
                 v-if="fixedRight.length>0"
            >
                <table class="x-table" :class="{bordered,stripe:stripe}" ref="tableRight">
                    <colgroup>
                        <col v-for="(column,index) in fixedRight" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody>
                    <tr v-for="(item,index) in bodyData" :key="index"
                        @mouseenter="hoverChangeMain(index,$event)"
                        @mouseleave="hoverChangeMain(index,$event)"
                        ref="trRight"
                    >
                        <td v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in fixedRight">
                            <td :key="column.key">
                                <span :style="{visibility:column.fixed==='right'?'':'hidden'}">{{item[column.key]}}</span>
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
            this.listenToReSize()
            this.setColumns()
            this.checkFixed()
            this.setBodyData()
            this.$nextTick(() => {
                // this.fixedWidthComputed()
                // this.tableResize()
                // this.setFixed()
                // this.setMainHeight()
            })
            this.setHeadersCollection()
            if (this.spanMethod) {
                this.runSpanMethod()
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.listenToWindowResize)
            this.observer.removeListener(this.$el, this.tableResize);
        },
        watch: {
            data() {
                this.setColumns()
                this.checkFixed()
                this.setBodyData()
                this.$nextTick(() => {
                    this.tableResize()
                })
                this.setHeadersCollection()
                if (this.spanMethod) this.runSpanMethod()
            },
            selectedItems() {
                let selectedStatus = this.selectedItems.length === this.bodyData.length ? 'All' : this.selectedItems.length > 0 ? 'half' : 'none'
                let {fixedInput, fixedMainInput} = this.$refs
                let element
                element = this.fixedLeft.length > 0 ? fixedInput : fixedMainInput
                element['indeterminate'] = selectedStatus === 'half'
                element['checked'] = selectedStatus === 'All'
            }
        },
        methods: {
            setColGroup() {

                let width = parseInt(getComputedStyle(this.$refs.tableFixedHeader).width)
                let averageWidth = parseInt(width / this.headerColumns.length)
                this.headerColumns.forEach((item, index) => {
                    if (!item.width) {
                        ['bodyColGroup'].forEach(item => this.$refs[item].children[index].style.width = averageWidth + 'px')
                    }
                })
            },
            listenToReSize() {
                window.addEventListener('resize', this.listenToWindowResize)
                this.observer = elementResizeDetectorMaker();
                this.observer.listenTo(this.$el, this.tableResize)
            },
            listenToWindowResize() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.tableResize()
                }, 150)
            },
            setFixed() {
                if (this.fixedLeft.length > 0 || this.fixedRight.length > 0) {
                    this.getScrollBarWidth()
                    this.setFixedWidth()
                }
            },
            tableResize() {
                let tableWidth = parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).width)
                this.setHeaderToTop(tableWidth)
                this.setMainWidth(tableWidth)
            },
            getScrollBarWidth() {
                const scrollBar = document.createElement('div')
                let style = {
                    height: '50px',
                    overflow: 'scroll',
                    position: 'absolute',
                    top: '-9999px',
                    width: '50px'
                }
                Object.keys(style).forEach(item => scrollBar.style[item] = style[item])
                document.body.appendChild(scrollBar)
                this.scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth
                document.body.removeChild(scrollBar)
            },
            fixedWidthComputed() {
                this.headerColumns.forEach(item => {
                    this.tableWidth += item.width
                })
            },
            setMainHeight() {
                let $refs = this.$refs
                if (this.maxHeight) {
                    $refs.tableMainWrapper.style.height = this.maxHeight - parseInt(getComputedStyle($refs.tableFixedHeaderWrapper).height) + 'px'
                }
                $refs.totalWrapper.style.height = this.maxHeight + 'px'
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
                this.$refs.tableFixedHeader.style.width = tableWidth
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
            setFixedWidth() {
                let [tableLeftWrapperWidth, tableRightWrapperWidth, leftArr, rightArr, totalWidth, refs] = [0, 0, [], [], 0, this.$refs]
                this.headerColumns.forEach((item, index) => {
                    totalWidth += item.width
                    if (item.fixed === 'left') {
                        tableLeftWrapperWidth += item.width
                        leftArr.push(index)
                    }
                    if (item.fixed === 'right') {
                        tableRightWrapperWidth += item.width
                        rightArr.push(index)
                    }
                })
                let Width
                if (this.checkFixed) {
                    if (leftArr.length > 0) {
                        Width = totalWidth + leftArr.length + 'px'
                    }
                    if (rightArr.length > 0) {
                        Width = totalWidth + rightArr.length + 'px'
                    }
                } else {
                    if (leftArr.length > 0) {
                        Width = totalWidth + leftArr.length + 'px'
                    }
                    if (rightArr.length > 0) {
                        Width = totalWidth + rightArr.length + 'px'
                    }
                }
                if (leftArr.length > 0) {
                    this.$refs.tableLeftWrapper.style.height = this.maxHeight - parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).height) - this.scrollBarWidth + 'px'
                    this.setColumnFixedWidth(refs, Width, tableLeftWrapperWidth, ['tableLeft', 'tableLeftWrapper', 'tableFixedLeftHeader', 'tableFixedLeftHeaderWrapper'])
                }
                if (rightArr.length > 0) {
                    this.$refs.tableRightWrapper.style.height = this.maxHeight - parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).height) - this.scrollBarWidth + 'px'
                    let rightWidth = totalWidth + rightArr.length + 'px'
                    this.setColumnFixedWidth(refs, rightWidth, tableRightWrapperWidth, ['tableRight', 'tableRightWrapper', 'tableFixedRightHeader', 'tableFixedRightHeaderWrapper'])
                }
                this.setTableWidth(refs, Width)
            },
            setColumnFixedWidth(refs, Width, tableWrapperWidth, name) {
                let maxWidth = tableWrapperWidth + 'px'
                refs[name[0]].style.width = refs[name[2]].style.width = Width
                refs[name[1]].style.width = maxWidth
                if (this.maxHeight && name[0] === 'tableRight') {
                    refs[name[3]].style.width = parseInt(maxWidth) + this.scrollBarWidth + 'px'
                    refs.right.style.width = parseInt(maxWidth) + 'px'
                    refs.right.style.right = this.scrollBarWidth + 'px'
                } else {
                    refs[name[3]].style.width = maxWidth
                }
            },
            setTableWidth(refs, Width) {
                refs.tableFixedHeader.style.width = Width
            },
            setBodyData() {
                this.bodyData = deepClone(this.data)
            },
            setColumns() {
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
            scrollGradient() {
                const ref = this.$refs
                const {tableLeftWrapper, tableRightWrapper} = ref
                let {scrollTop, scrollLeft} = ref.tableMainWrapper
                if (scrollLeft !== xScroll.data.currentScrollLeft) {
                    let {width} = ref.tableMain.style
                    this.hiddenShadow.left = scrollLeft === 0
                    this.hiddenShadow.right = parseInt(width) <= scrollLeft + parseInt(this.maxWidth)
                    this.$refs.tableFixedHeaderWrapper.scrollLeft = scrollLeft
                    xScroll.data.currentScrollLeft = scrollLeft
                    return
                }
                if (xScroll.data.currentScrollTop === scrollTop) return
                xScroll.data.currentScrollTop = scrollTop
                this.$refs.tableMain.classList.remove('debug')
                window.requestAnimationFrame(() => {
                    if (this.fixedLeft.length > 0) {
                        tableLeftWrapper.scrollTop = scrollTop
                    }
                    if (this.fixedRight.length > 0) {
                        tableRightWrapper.scrollTop = scrollTop
                    }
                    window.requestAnimationFrame(() => {
                        this.$refs.tableMain.classList.add('debug')
                    })
                })
            },
            scrollLeftGradient() {
                let scrollLeft = this.$refs.tableFixedHeaderWrapper.scrollLeft
                if (this.oldScrollLeft === scrollLeft) return
                this.$refs.tableMainWrapper.scrollLeft = scrollLeft
            },
            runSpanMethod() {
                this.headerColumns.forEach((col, colIndex) => {
                    this.bodyData.forEach((row, rowIndex) => {
                        let obj = this.spanMethod(row, colIndex, rowIndex) || {}
                        if (!obj.rowspan) {
                            obj.rowspan = 1
                        } else if (obj.rowspan > 1) {
                            let i = 1
                            while (i < obj.rowspan) {
                                delete this.headersCollection[rowIndex + i][colIndex]
                                i++
                            }
                        }
                        if (!obj.colspan) {
                            obj.colspan = 1
                        } else if (obj.colspan > 1) {
                            let i = 1
                            while (i < obj.colspan) {
                                delete this.headersCollection[rowIndex][colIndex + i]
                                i++
                            }
                        }
                        if (!this.cell[colIndex]) {
                            this.cell[colIndex] = []
                        }
                        this.cell[colIndex][rowIndex] = obj
                    })
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../../src/styles/table";
</style>
