<template>
    <div class="f-table-wrapper"
         style="position:relative;overflow: hidden;"
         :style="{height:maxHeight+'px'}"
         ref="totalWrapper">
        <!--  主体-->
        <div class="f-table-main">
            <div class="f-table-main-header"
                 ref="headerMainWrapper"
            >
                <tableHeader
                        :attr="attr"
                        :row-data="data"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :maxHeight="maxHeight"
                        :columns="cloneColumns"
                        class="f-table"
                        :style="headerStyle"
                        :class="{bordered,stripe,textAlign}"
                        ref="headerMain">
                </tableHeader>
            </div>
            <div class="f-table-main-body"
                 :class="{'f-table-overflow-y':maxHeight}"
                 :style="{height:theMaxHeight}"
                 ref="bodyMainWrapper"
                 @scroll.passive="scrollGradient"
            >
                <tableBody
                        :columns="cloneColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :maxHeight="maxHeight"
                        :attr.sync="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="bodyMain">
                </tableBody>
            </div>
        </div>
        <div :style="{height:maxHeight+'px'}" class="f-table-left">
            <div :style="fixedLeftStyle" class="f-table-left-header" ref="headerLeftWrapper">
                <tableHeader
                        :style="headerStyle"
                        :attr="attr"
                        :row-data="data"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :maxHeight="maxHeight"
                        :columns="fixedLeftColumns"
                        class="f-table"
                        :class="{bordered,stripe,textAlign}"
                        ref="headerLeft">
                </tableHeader>
            </div>
            <div  v-x-scroll :style="fixedBodyStyle"  class="f-table-left-body" ref="bodyLeftWrapper">
                <tableBody
                        :columns="fixedLeftColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :maxHeight="maxHeight"
                        :attr.sync="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="bodyLeft">
                </tableBody>
            </div>
        </div>
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
    import {isNumber, isString} from "../../../../src/utils/type-of"
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
            theMaxHeight() {
                let height = this.maxHeight
                return isNumber(height) ? height + 'px' : isString(height) ? height : null
            },
            fixedLeftStyle(){
                let style ={}
                let width =this.fixedLeftColumns.reduce((a,b) => b.fixed && b.fixed === 'left' ? a + b._width : a,0)
                if(width)style.width= width+'px'
                return style
            },
            fixedBodyStyle(){
                let style = {
                    overflow:'hidden',
                }
                if(this.$refs.bodyMain){
                    let {clientHeight} = this.$refs.bodyMain.$el
                    if(clientHeight>this.maxHeight)style.overflowY = 'scroll'
                }
                if(this.fixedLeftStyle.width) style.width = this.fixedLeftStyle.width
                return style
            },
            headerStyle(){
                return {
                    width:this.tableWidth+'px'
                }
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
                tableWidth:0,
                bodyHeight:0,
                cloneColumns: [],
                fixedLeftColumns: [],
                fixedRightColumns: [],
                hiddenShadow: {
                    left: true,
                    right: false
                },
                colWidth:{},
                scrollBarWidth: getScrollBarWidth(),
                oldScrollLeft: 0,
                headersCollection: [],
                attr: []
            }
        },
        mounted() {
            this.init()
            this.listenToReSize()
            this.tableResize()
        },
        beforeDestroy() {
            this.removeListenResize()
        },
        watch: {
            data() {
                this.init()
                this.listenToReSize()
                this.$nextTick(()=>{
                    this.tableResize()
                })
            }
        },
        methods: {
            init(){
                this.copyColumns()
                this.copyBodyData()
                this.attr = this.setAttr()
                this.setHeadersCollection()
            },
            removeListenResize(){
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
                this.$el.style.width = '100%'
                let width = this.tableWidth
                if(!width)width = this.$el.clientWidth -1
                let colWidth = {}
                let length = 0
                this.cloneColumns.forEach(col => {
                    if (!col.width) {
                        length++
                    } else {
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
                this.cloneColumns.forEach(item => {
                    item._width = colWidth[item._index] = !item.width ? colHaveNoWidth.shift()  : item.width
                })
                this.colWidth = colWidth
                this.$el.style.width = ''
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
                if (this.cloneColumns.length === 0) return
                this.$el.style.width = '100%'
                this.tableWidth = this.$el.clientWidth-1
                this.setMainWidth()
                this.setColWidth()
                this.checkFixed()
                this.setBodyHeight()
                this.$el.style.width = ''
            },
            setMainWidth() {
                let tableWidth = this.tableWidth
                let [$refs, width] = [this.$refs, 0]
                if (!this.tableWidth || this.tableWidth === 0) {
                    width = tableWidth
                } else {
                    width = this.tableWidth
                }
                width -= this.maxHeight ? this.scrollBarWidth : 0
                $refs.bodyMain.$el.style.width = width + 'px'
            },
            setBodyHeight(){
                if(!this.maxHeight)return
                let tableHeight = this.$refs.headerMain.$el.clientHeight
                let bodyHeight = parseInt(this.maxHeight)-tableHeight
                this.$refs.bodyLeftWrapper.style.height = this.$refs.bodyMainWrapper.style.height = bodyHeight + 'px'
                //todo  maxHeight Feature可能没有添加判断，template里面
            },
            scrollGradient() {
                const ref = this.$refs
                const {bodyLeftWrapper, tableRightWrapper} = ref
                let {scrollTop, scrollLeft} = ref.bodyMainWrapper
                if (scrollLeft !== xScroll.data.currentScrollLeft) {
                    let {width} = ref.tableMain.style
                    this.hiddenShadow.left = scrollLeft === 0
                    this.hiddenShadow.right = parseInt(width) <= scrollLeft + parseInt(this.maxWidth)
                    //this.$refs.tableFixedHeaderWrapper.scrollLeft = scrollLeft
                    xScroll.data.currentScrollLeft = scrollLeft
                    return
                }
                if (xScroll.data.currentScrollTop === scrollTop) return
                xScroll.data.currentScrollTop = scrollTop
                window.requestAnimationFrame(() => {
                    if (this.fixedLeftStyle.width) {
                        bodyLeftWrapper.scrollTop = scrollTop
                    }
                    //todo right requestAnimationFrame兼容问题
                    // if (this.fixedRight.length > 0) {
                    //     tableRightWrapper.scrollTop = scrollTop
                    // }
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
                this.cloneColumns.forEach((col,index)=>col._index= index)
            },
            setHeadersCollection() {
                let i = 0
                while (i < this.bodyData.length) {
                    this.headersCollection[i] = recurrenceOnceDeepCopy(this.cloneColumns)
                    i++
                }
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
            }
        },
    }
</script>
