<template>
    <div class="f-table-wrapper"
         style="position:relative;overflow: hidden;" ref="totalWrapper">
        <!--  主体-->
        <div class="f-table-main">
            <div class="f-table-main-header"
                 ref="tableFixedHeaderWrapper"
            >
                <tableHeader
                        :attr="attr"
                        :columns="headerColumns"
                        class="f-table"
                        :class="[bordered,stripe,textAlign]"
                        ref="tableFixedHeader">
                </tableHeader>
            </div>
            <div class="f-table-main-body"
                 :style="{overflow:'auto'}"
                 ref="tableMainWrapper"
            >
                <tableBody
                        :columns="headerColumns"
                        :body-data="bodyData"
                        :attr="attr"
                        class="f-table"
                        :numberVisible="numberVisible"
                        :class="[bordered,stripe,textAlign]"
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

    export default {
        name: "f-table",
        directives: {
            xScroll
        },
        computed: {
            textAlign() {
                return `align-${this.align}`
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
                headerColumns: [],
                fixedLeft: [],
                fixedRight: [],
                hiddenShadow: {
                    left: true,
                    right: false
                },
                oldScrollLeft: 0,
                headersCollection: [],
                tableWidth: 0,
                attr:this.setAttr()
            }
        },
        mounted() {
            this.copyColumns()
            this.checkFixed()
            this.copyBodyData()
            this.listenToReSize()
            this.setHeadersCollection()
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.listenToWindowResize)
            this.observer.removeListener(this.$el, this.tableResize);
        },
        watch: {
            data() {
                this.copyColumns()
                this.attr = this.setAttr()
                this.checkFixed()
                this.copyBodyData()
                this.$nextTick(() =>this.tableResize())
                this.setHeadersCollection()
            }
        },
        methods: {
            listenToReSize() {
                window.addEventListener('resize', this.listenToWindowResize)
                this.observer = elementResizeDetectorMaker()
                this.observer.listenTo(this.$el, this.tableResize)
            },
            listenToWindowResize() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() =>this.tableResize(), 150)
            },
            setAttr(){
                let data = []
                this.data.forEach((row, index) => {
                    const newRow = deepClone(row)
                    newRow._isHover = false
                    if (!newRow._checked) {
                        newRow._checked = false
                    }
                    data[index] = newRow
                });
                return data
            },
            tableResize() {
                if (this.headerColumns.length === 0) return
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
                $refs.tableMain.$el.style.width = width + 'px'
            },
            setHeaderToTop(tableWidth) {
                if (this.$refs.tableFixedHeader.$el.style) {
                    this.$refs.tableFixedHeader.$el.style.width = tableWidth
                }
            },
            checkFixed() {
                let fixed = {
                    left: [],
                    right:[],
                    main:[]
                }
                this.columns.forEach(item => fixed[item.fixed||'main'].push(item))
                if (fixed.left.length > 0) this.fixedLeft = fixed.left.concat(fixed.main, fixed.right)
                if (fixed.right.length > 0) this.fixedRight = fixed.right.concat(fixed.main, fixed.left)
                this.headerColumns = fixed.left.concat(fixed.main, fixed.right)
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
                this.order.state = this.order.state === true || this.order.name !== key ? direction : (this.order.state = this.order.state === direction ? true : direction)
                this.bodyData = this.order.state !== true ? this.bodyData.sort((a, b) =>a[key] < b[key] ? direction === 'ascending' ? -1 : 1 : direction === 'ascending' ? 1 : -1) : JSON.parse(JSON.stringify(this.data))
                this.order.name = key
            },
            sortUp(key) {
                this.clickSort(key, 'ascending')
            },
            sortDown(key) {
                this.clickSort(key, 'descending')
            },
            toggleSelect(index) {
               console.log(index)
                this.attr[index]._checked = !this.attr[index]._checked
            },
        },
    }
</script>
