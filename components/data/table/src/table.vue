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
                        :class="{bordered,stripe,textAlign}"
                        ref="headerMain">
                </tableHeader>
            </div>
            <div class="f-table-main-body"
                 :class="{'f-table-overflow-y':maxHeight}"
                 :style="{height:theMaxHeight}"
                 ref="tableMainWrapper"
            >
                <tableBody
                        :columns="cloneColumns"
                        :body-data="bodyData"
                        :colWidth="colWidth"
                        :scrollBarWidth="scrollBarWidth"
                        :maxHeight="maxHeight"
                        :attr="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="{bordered,stripe,textAlign}"
                        ref="tableMain">
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
    import {isNumber, isString} from "../../../../src/utils/type-of";
    import {off, on} from "../../../../src/utils/dom";

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
                cloneColumns: [],
                fixedLeft: [],
                fixedRight: [],
                hiddenShadow: {
                    left: true,
                    right: false
                },
                colWidth:{},
                scrollBarWidth: 0,
                oldScrollLeft: 0,
                headersCollection: [],
                tableWidth: 0,
                attr: this.setAttr()
            }
        },
        mounted() {
            this.getScrollBarWidth()
            this.copyColumns()
            this.checkFixed()
            this.copyBodyData()
            this.listenToReSize()
            this.setHeadersCollection()
            this.$nextTick(()=>{
                this.setColWidth()
                this.setBodyHeight()
            })
        },
        beforeDestroy() {
            this.removeListenResize()
        },
        watch: {
            data() {
                this.copyColumns()
                this.attr = this.setAttr()
                this.checkFixed()
                this.copyBodyData()
                this.$nextTick(() =>{
                    this.setColWidth()
                    this.setBodyHeight()
                }
            )
                this.setHeadersCollection()
            }
        },
        methods: {
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
            removeListenResize(){
                off(window, 'resize', this.tableResize)
                this.observer.removeListener(this.$el, this.tableResize)
            },
            listenToReSize() {
                on(window, 'resize', this.tableResize)
                this.observer = elementResizeDetectorMaker()
                this.observer.listenTo(this.$el, this.tableResize)
            },
            setColWidth(width) {
                if (this.columns.length === 0) return
                this.$el.style.width = '100%'
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
                this.cloneColumns.forEach((item, index) => {
                    colWidth[index] = !item.width ? colHaveNoWidth.shift()  : item.width
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
                let tableWidth = this.$el.clientWidth-1
                this.setHeaderToTop(tableWidth)
                this.setMainWidth(tableWidth)
                this.setColWidth(tableWidth)
                this.$el.style.width = ''
            },
            setMainWidth(tableWidth) {
                let [$refs, width] = [this.$refs, 0]
                if (!this.tableWidth || this.tableWidth === 0) {
                    width = tableWidth
                } else {
                    width = this.tableWidth
                }
                width -= this.maxHeight ? this.scrollBarWidth : 0
                $refs.tableMain.$el.style.width = width + 'px'
            },
            setHeaderToTop(tableWidth) {
                this.$refs.headerMain.$el.style.width = tableWidth + 'px'
            },
            setBodyHeight(){
                if(!this.maxHeight)return
                let tableHeight = parseInt(getComputedStyle(this.$refs.headerMainWrapper).height)
                let bodyHeight = parseInt(this.maxHeight)-tableHeight
                this.$refs.tableMainWrapper.style.height = bodyHeight + 'px'
            },
            checkFixed() {
                let fixed = {
                    left: [],
                    right: [],
                    main: []
                }
                this.columns.forEach(item => fixed[item.fixed || 'main'].push(item))
                if (fixed.left.length > 0) this.fixedLeft = fixed.left.concat(fixed.main, fixed.right)
                if (fixed.right.length > 0) this.fixedRight = fixed.right.concat(fixed.main, fixed.left)
                //this.cloneColumns = fixed.left.concat(fixed.main, fixed.right)
            },
            copyBodyData() {
                this.bodyData = deepClone(this.data)
            },
            copyColumns() {
                this.cloneColumns = deepClone(this.columns)
                this.cloneColumns.forEach((col,index)=>col._index= index)
                console.log(this.cloneColumns)
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
