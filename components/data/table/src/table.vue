<template>
    <div class="f-table-wrapper"
         :style="wrapperStyle"
    >
        <!--  主体-->
        <div :style="mainWrapperStyle" class="f-table-main">
            <div class="f-table-main-header"
                 ref="headerMainWrapper"
                 :style="mainHeaderStyle"
            >
                <tableHeader
                        :attr="attr"
                        :row-data="data"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :columns="cloneColumns"
                        class="f-table"
                        :style="headerStyle"
                        :class="{bordered,stripe,textAlign}"
                        ref="headerMain">
                </tableHeader>
            </div>
            <div class="f-table-main-body"
                 :style="mainBodyStyle"
                 :class="{'f-table-overflow-y':isYScrollBarShow}"
                 ref="bodyMainWrapper"
                 @scroll.passive="scrollGradient"
            >
                <tableBody
                        :columns="cloneColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :attr.sync="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="bodyMain">
                </tableBody>
            </div>
        </div>
        <div v-if="fixedLeftHeaderStyle.width" :class="{boxShadowNone:hiddenShadow.left}" :style="leftWrapperStyle"
             class="f-table-left">
            <div :style="fixedLeftHeaderStyle" class="f-table-left-header" ref="headerLeftWrapper">
                <tableHeader
                        :style="headerStyle"
                        :attr="attr"
                        :row-data="data"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :columns="fixedLeftColumns"
                        class="f-table"
                        :class="{bordered,stripe,textAlign}"
                        ref="headerLeft">
                </tableHeader>
            </div>
            <div v-x-scroll :style="fixedLeftBodyStyle" class="f-table-left-body" ref="bodyLeftWrapper">
                <tableBody
                        :columns="fixedLeftColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :attr.sync="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="bodyLeft">
                </tableBody>
            </div>
        </div>
        <div v-if="fixedRightHeaderStyle.width" :class="{boxShadowNone:hiddenShadow.right}" :style="rightWrapperStyle"
             class="f-table-right">
            <div :style="fixedRightHeaderStyle" class="f-table-right-header" ref="headerRightWrapper">
                <tableHeader
                        :style="headerStyle"
                        :attr="attr"
                        :row-data="data"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :columns="fixedRightColumns"
                        class="f-table"
                        :class="{bordered,stripe,textAlign}"
                        ref="headerRight">
                </tableHeader>
            </div>
            <div v-x-scroll :style="fixedRightBodyStyle" class="f-table-right-body" ref="bodyRightWrapper">
                <tableBody
                        :columns="fixedRightColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :attr.sync="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="bodyRight">
                </tableBody>
            </div>
        </div>
        <div v-if="fixedThExist" :style="rightFixedTh" class="f-table-right-header-fixed"></div>
        <transition name="fade">
            <loading v-if="loading" class="f-table-loading"></loading>
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
    import tableBody from './table-body'
    import {off, on} from "../../../../src/utils/dom"
    import {getScrollBarWidth} from "../../../../src/utils/window"

    export default {
        name: "f-table",
        directives: {
            xScroll
        },
        computed: {
            textAlign() {
                return `align-${this.align}`
            },
            wrapperStyle() {
                let style = {
                    position: 'relative',
                    overflow: 'hidden'
                }
                if (this.maxHeight) style.maxHeight = parseInt(this.maxHeight) + 'px'
                if (this.width) style.width = parseInt(this.width) + 'px'
                return style
            },
            fixedLeftHeaderStyle() {
                let style = {}
                let width = this.fixedLeftColumns.reduce((a, b) => b.fixed && b.fixed === 'left' ? a + b._width : a, 0)
                if (width) style.width = width + 'px'
                return style
            },
            fixedRightHeaderStyle() {
                let style = {}
                let width = this.fixedRightColumns.reduce((a, b) => b.fixed && b.fixed === 'right' ? a + b._width : a, 0)
                if (width) style.width = width + 'px'
                return style
            },
            fixedLeftBodyStyle() {
                let style = {
                    overflow: 'hidden'
                }
                if (this.getBodyHeight()) {
                    style.height = this.width && this.scrollBarWidth > 0 && this.isXScrollBarShow() ? parseInt(this.getBodyHeight()) - this.scrollBarWidth + 'px' : this.getBodyHeight()
                }
                this.setScrollY(style)
                if (this.fixedLeftHeaderStyle.width) style.width = this.fixedLeftHeaderStyle.width
                return style
            },
            leftWrapperStyle() {
                let style = {}
                style.height = this.width && this.scrollBarWidth > 0 && this.isXScrollBarShow() ? parseInt(this.maxHeight) - this.scrollBarWidth + 'px' : parseInt(this.maxHeight) + 'px'
                return style
            },
            fixedRightBodyStyle() {
                let style = {
                    overflow: 'hidden'
                }
                if (this.getBodyHeight()) {
                    style.height = this.width && this.scrollBarWidth > 0 && this.isXScrollBarShow() ? parseInt(this.getBodyHeight()) - this.scrollBarWidth + 'px' : this.getBodyHeight()
                }
                this.setScrollY(style)
                if (this.fixedRightHeaderStyle.width) style.width = this.fixedRightHeaderStyle.width
                return style
            },
            mainBodyStyle() {
                let style = {
                    overflow: 'hidden'
                }
                this.setScrollY(style)
                this.setScrollX(style)
                if (this.getBodyHeight()) style.height = this.getBodyHeight()
                if (this.cloneColumns.width) style.width = ''
                return style
            },
            mainHeaderStyle() {
                let style = {
                    overflow: 'hidden'
                }
                this.setScrollX(style)
                if (this.cloneColumns.width) style.width = ''
                return style
            },
            mainWrapperStyle() {
                let style = {
                    overflow: 'hidden'
                }
                if (this.cloneColumns.width) style.width = ''
                if (this.maxHeight) style.maxHeight = parseInt(this.maxHeight) + 'px'
                if (this.width) style.width = parseInt(this.width) + 'px'
                return style
            },
            headerStyle() {
                return {
                    width: this.tableWidth + 'px'
                }
            },
            rightWrapperStyle() {
                let style = {}
                style.height = this.width && this.scrollBarWidth > 0 && this.isXScrollBarShow() ? parseInt(this.maxHeight) - this.scrollBarWidth + 'px' : parseInt(this.maxHeight) + 'px'
                if (this.isYScrollBarShow) style.right = this.scrollBarWidth - 1 + 'px'
                return style
            },
            rightFixedTh() {
                let style = {}
                if (this.cloneColumns.width) style.width = ''
                style.width = this.scrollBarWidth + 'px'
                style.height = (this.$refs.headerMainWrapper ? this.$refs.headerMainWrapper.clientHeight : 0) + 1 + 'px'
                return style
            },
            fixedThExist() {
                let width = this.cloneColumns.reduce((a, b) => a + b._width, 0)
                return width > this.width && this.scrollBarWidth > 0
            },
            isYScrollBarShow(){
                if(this.cloneColumns.length===0)return false
                return this.maxHeight&&parseInt(this.maxHeight)<this.getTableHeight()
            }
        },
        components: {
            'f-icon': Icon,
            loading: loading,
            tableHeader,
            tableBody
        },
        props: {
            stripe: {
                type: Boolean,
                default: true
            },
            maxHeight: {
                type: [Number, String]
            },
            width: {
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
            align: {
                type: String,
                default: 'left',
                validator: (val) => ['left', 'right', 'center'].indexOf(val) > -1
            },
            data: {
                type: Array,
                required: true,
                validator: (item) => !item.id
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
            spanMethod: Function,
        },
        data() {
            return {
                order: {},
                bodyData: [],
                tableWidth: 0,
                needFixedRightTh: 0,
                cloneColumns: [],
                fixedLeftColumns: [],
                fixedRightColumns: [],
                hiddenShadow: {
                    left: true,
                    right: false
                },
                colWidth: {},
                scrollBarWidth: getScrollBarWidth(),
                oldScrollLeft: 0,

                attr: []
            }
        },
        mounted() {
            this.init()
            this.tableResize()
            this.$nextTick(()=>{
                this.listenToReSize()
            })
        },
        beforeDestroy() {
            this.removeListenResize()
        },
        watch: {
            data() {
                this.init()
                this.tableResize()
            }
        },
        methods: {
            init() {
                this.copyColumns()
                this.copyBodyData()
                this.attr = this.setAttr()
            },
            removeListenResize() {
                off(window, 'resize', this.tableResize)
                this.observer.removeListener(this.$el, this.tableResize)
            },
            listenToReSize() {
                on(window, 'resize', this.tableResize)
                this.observer = elementResizeDetectorMaker()
                this.observer.listenTo(this.$el, this.tableResize)
            },
            setColWidth() {
                if (this.columns.length === 0) return
                let width = this.tableWidth
                if (!width) width = this.$el.clientWidth - 1
                let colWidth = {}
                let length = 0
                this.cloneColumns.forEach(col => {
                    if (!col.width) {
                        length++
                    } else {
                        width -= parseInt(col.width)
                    }
                })
                if (this.isYScrollBarShow) width -= this.scrollBarWidth?this.scrollBarWidth:0
                let averageWidth = parseInt(width / length)
                let remainder = width - parseInt(length * averageWidth)
                let colHaveNoWidth = []
                while (colHaveNoWidth.length < length) {
                    colHaveNoWidth.push(averageWidth)
                }
                colHaveNoWidth.forEach((width, index) => {
                        if (index >= colHaveNoWidth.length - remainder) colHaveNoWidth[index]++
                    }
                )
                this.cloneColumns.forEach(item => {
                    item._width = colWidth[item._index] = !item.width ? colHaveNoWidth.shift() : item.width
                })
                this.colWidth = colWidth
            },
            getTableHeight() {
                let headerHeight = this.$refs.headerMain.$el.clientHeight
                let bodyHeight = this.$refs.bodyMain.$el.clientHeight
                return headerHeight+bodyHeight
            },
            setAttr() {
                let data = []
                this.data.forEach((row, index) => {
                    const newRow = deepClone(row)
                    newRow._isHover = false
                    if (!newRow._checked) newRow._checked = false
                    if (!newRow._disabled) newRow._disabled = false
                    data[index] = newRow
                });
                return data
            },
            tableResize() {
                console.log(1)
                if (this.cloneColumns.length === 0) return
                this.tableWidth = this.$el.clientWidth - 1
                this.setMainWidth()
                this.setColWidth()
                this.checkFixed()
            },
            setMainWidth() {
                let tableWidth = this.tableWidth
                let [$refs, width] = [this.$refs, 0]
                if (!this.tableWidth || this.tableWidth === 0) {
                    width = tableWidth
                } else {
                    width = this.tableWidth
                }
                width -= this.isYScrollBarShow ? this.scrollBarWidth : 0
                $refs.bodyMain.$el.style.width = width + 'px'
            },
            scrollGradient() {
                const ref = this.$refs
                const {bodyLeftWrapper, bodyRightWrapper} = ref
                let {scrollTop, scrollLeft} = ref.bodyMainWrapper
                if (scrollLeft !== xScroll.data.currentScrollLeft) {
                    let width = ref.bodyMain.$el.clientWidth
                    this.hiddenShadow.left = scrollLeft === 0
                    this.hiddenShadow.right = parseInt(width) + this.scrollBarWidth <= scrollLeft + parseInt(this.width)
                    this.$refs.headerMainWrapper.scrollLeft = scrollLeft
                    xScroll.data.currentScrollLeft = scrollLeft
                    return
                }
                if (xScroll.data.currentScrollTop === scrollTop) return
                xScroll.data.currentScrollTop = scrollTop
                window.requestAnimationFrame(() => {
                    if (this.fixedLeftHeaderStyle.width) {
                        bodyLeftWrapper.scrollTop = scrollTop
                    }
                    //todo right requestAnimationFrame兼容问题
                    if (this.fixedRightHeaderStyle.width) {
                        bodyRightWrapper.scrollTop = scrollTop
                    }
                })
            },
            checkFixed() {
                let fixed = {
                    left: [],
                    right: [],
                    main: []
                }
                this.cloneColumns.forEach(item => fixed[item.fixed || 'main'].push(item))
                if (fixed.left.length > 0) this.fixedLeftColumns = fixed.left.concat(fixed.main, fixed.right)
                if (fixed.right.length > 0) this.fixedRightColumns = fixed.right.concat(fixed.main, fixed.left)
                this.cloneColumns = fixed.left.concat(fixed.main, fixed.right)
            },
            copyBodyData() {
                this.bodyData = deepClone(this.data)
            },
            copyColumns() {
                this.cloneColumns = deepClone(this.columns)
                this.cloneColumns.forEach((col, index) => col._index = index)
            },
            clickSort(key, direction) {
                this.order.state = this.order.state === true || this.order.name !== key ? direction : (this.order.state = this.order.state === direction ? true : direction)
                this.bodyData = this.order.state !== true ? this.bodyData.sort((a, b) => a[key] < b[key] ? direction === 'ascending' ? -1 : 1 : direction === 'ascending' ? 1 : -1) : JSON.parse(JSON.stringify(this.data))
                this.order.name = key
            },
            sortUp(key) {
                this.clickSort(key, 'ascending')
            },
            sortDown(key) {
                this.clickSort(key, 'descending')
            },
            toggleSelect(index) {
                let val = !this.attr[index]._checked
                this.attr[index]._checked = val
                this.selectChange(val, index)
            },
            selectChange(val, index) {
                let selection = this.getSelection()
                this.$emit('on-select-change', selection)
                if (typeof val === 'undefined') return
                this.$emit(val ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.data[index])))
            },
            getSelection() {
                let selection = []
                this.attr.forEach(row => {
                    if (row._checked && !row._disabled) selection.push(row)
                })
                return selection
            },
            getBodyHeight() {
                let height
                if (this.$refs.headerMainWrapper) {
                    let headerHeight = this.$refs.headerMainWrapper.clientHeight
                    height = (this.maxHeight - headerHeight) + 'px'
                }
                return height
            },
            setScrollY(style) {
                if (this.$refs.bodyMain) {
                    let {clientHeight} = this.$refs.bodyMain.$el
                    if (clientHeight > this.maxHeight) style.overflowY = 'scroll'
                }
            },
            setScrollX(style) {
                if (this.$refs.bodyMain) {
                    let {clientWidth} = this.$refs.bodyMain.$el
                    if (clientWidth > this.width) style.overflowX = 'scroll'
                }
            },
            isXScrollBarShow() {
                let width = this.cloneColumns.reduce((a, b) => a + b._width, 0)
                return width > parseInt(this.width)
            },
        },
    }
</script>
