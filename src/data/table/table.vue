<template>
    <div class="x-table-wrapper"
         :class="{borderHidden:columns[0].width}" style="position:relative;overflow: hidden" ref="totalWrapper">
        <!--  主体-->
        <div class="x-table-main"
        >
            <div class="x-table-main-header"
                 ref="tableFixedHeaderWrapper"
                 @scroll.passive="scrollLeftGradient"
            >
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" v-if="columns[0].width" ref="tableFixedHeader">
                    <colgroup>
                        <col v-if="checkBoxOn" style="width: 60px">
                        <col v-for="(column,index) in headerColumns" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead class="x-table-head">
                    <tr>
                        <th v-if="checkBoxOn">
                            <input @change="onChangeAllItems" type="checkbox" ref="fixedMainInput">
                        </th>
                        <th v-for="column in headerColumns" :key="column.field">
                            <div class="x-table-th">
                                {{column.text}}
                                <span class="x-table-th-icon" v-if="column.sortBy=== true">
                            <x-icon @click="sortUp(column.field)"
                                    :style="{fill:order.state=== 'ascending' && order.name===column.field ? '109CCB' : '#666666'}" name="asc"></x-icon>
                            <x-icon @click="sortDown(column.field)"
                                    :style="{fill:order.state === 'descending' && order.name===column.field ? '109CCB' : '#666666'}" style="margin-top: 2px" name="desc"></x-icon>
                           </span>
                            </div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="x-table-main-body"
                 :style="{overflow:'auto'}"
                 @scroll.passive="scrollGradient"
                 ref="tableMainWrapper"
            >
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableMain">
                    <colgroup>
                        <col v-if="checkBoxOn" style="width:60px">
                        <col v-for="(column,index) in headerColumns" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody ref="tBodyMain">
                    <tr v-for="(item,rowIndex) in bodyData" :key="rowIndex"
                        @mouseenter="hoverChangeMain(rowIndex,$event)"
                        @mouseleave="hoverChangeMain(rowIndex,$event)"
                        ref="trMain">
                        <td v-if="checkBoxOn">
                            <input :checked="inSelected(item)" @change="changeItem(item,rowIndex,$event)" type="checkbox">
                        </td>
                        <td v-if="numberVisible">{{rowIndex+1}}</td>
                        <template v-for="(column,colIndex) in headerColumns">
                            <td :key="column.field" :colspan="cell[colIndex]&&cell[colIndex][rowIndex].colspan" :rowspan="cell[colIndex]&&cell[colIndex][rowIndex].rowspan">
                                <span :style="{visibility:column.fixed==='left'?'hidden':''}">{{item[column.field]}}</span>
                                <slot :name="column.slot" :column="item" :index="rowIndex"></slot>
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
            <div  v-if="fixedLeft.length>0" :class="{boxShadowNone:hiddenShadow.left}" class="x-table-left-header" :style="{overflow:'hidden'}" ref="tableFixedLeftHeaderWrapper">
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" v-if="columns[0].width" ref="tableFixedLeftHeader">
                    <colgroup>
                        <col style="width: 60px">
                        <col v-for="(column,index) in fixedLeft" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-if="checkBoxOn">
                            <input @change="onChangeAllItems" type="checkbox" ref="fixedInput">
                        </th>
                        <th v-for="column in fixedLeft" :key="column.field">
                            <div class="x-table-th">
                                {{column.text}}
                                <span class="x-table-th-icon" v-if="column.sortBy=== true">
                            <x-icon @click="sortUp(column.field)"
                                    :style="{fill:order.state=== 'ascending' && order.name===column.field ? '109CCB' : '#666666'}" name="asc"></x-icon>
                            <x-icon @click="sortDown(column.field)"
                                    :style="{fill:order.state === 'descending' && order.name===column.field ? '109CCB' : '#666666'}" style="margin-top: 2px" name="desc"></x-icon>
                           </span>
                            </div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div   class="x-table-left-body" :style="{overflow:'hidden',overflowY:'scroll'}"
                   ref="tableLeftWrapper"
                   v-xScroll
                   v-if="fixedLeft.length>0"
            >
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableLeft">
                    <colgroup>
                        <col v-if="checkBoxOn" style="width: 60px">
                        <col v-for="column in fixedLeft" :key="column.field" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody>
                    <tr v-for="(item,index) in bodyData" :key="index"
                        @mouseenter="hoverChangeMain(index,$event)"
                        @mouseleave="hoverChangeMain(index,$event)"
                        ref="trLeft"
                    >
                        <th v-if="checkBoxOn">
                            <input :checked="inSelected(item)" @change="changeItem(item,index,$event)" type="checkbox">
                        </th>
                        <td v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in fixedLeft">
                            <td :key="column.field">
                                <span :style="{visibility:column.fixed==='left'?'':'hidden'}">{{item[column.field]}}</span>
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
            <div  v-if="fixedRight.length>0"
                  :class="{boxShadowNone:false}"
                  class="x-table-right-header" :style="{maxHeight:`${maxHeight+'px'}`,overflow:'hidden'}" ref="tableFixedRightHeaderWrapper">
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" v-if="fixedRight.length>0" ref="tableFixedRightHeader">
                    <colgroup>
                        <col v-for="(column,index) in fixedRight" :key="index" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="column in fixedRight" :key="column.field">
                            <div class="x-table-th">
                                {{column.text}}
                                <span class="x-table-th-icon" v-if="column.sortBy=== true">
                            <x-icon @click="sortUp(column.field)"
                                    :style="{fill:order.state=== 'ascending' && order.name===column.field ? '109CCB' : '#666666'}" name="asc"></x-icon>
                            <x-icon @click="sortDown(column.field)"
                                    :style="{fill:order.state === 'descending' && order.name===column.field ? '109CCB' : '#666666'}" style="margin-top: 2px" name="desc"></x-icon>
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
                <table  class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableRight">
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
                            <td :key="column.field">
                                <span :style="{visibility:column.fixed==='right'?'':'hidden'}">{{item[column.field]}}</span>
                            </td>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <loading v-if="loading" class="x-table-loading"></loading>
    </div>
</template>

<script>
    import loading from '../../currency/dynamic icon/loading'
    import Icon from '../../currency/icon'
    import xScroll from './scroll-synchro'
    export default {
        name: "x-table",
        directives:{
            xScroll
        },
        components:{
            'x-icon': Icon,
            loading: loading
        },
        props:{
            stripe:{
                type:Boolean,
                default: true
            },
            maxHeight:{
                type:[Number,String]
            },
            maxWidth:{
                type:[Number,String]
            },
            compact:{
                type:Boolean,
                default: false
            },
            bordered:{
                type:Boolean,
                default:false
            },
            columns:{
                type:Array,
                required:true
            },
            data:{
                type: Array,
                required: true,
                validator(item){
                    if(item.id)return false
                    return true
                }
            },
            loading:{
                type:Boolean,
                default:false
            },
            numberVisible:{
                type:Boolean,
                default:false
            },
            checkBoxOn:{
                type:Boolean,
                default:false
            },
            selectedItems:{
                type:Array,
                default:()=>[]
            },
            defaultSort:Object,
            spanMethod:Function
        },
        data(){
            return {
                order:{},
                bodyData:{},
                headerColumns: {},
                fixedLeft:[],
                fixedRight:[],
                hiddenShadow:{
                    left:true,
                    right:false
                },
                oldScrollLeft:0,
                cell:[]
            }
        },
        mounted(){
            this.setColumns()
            this.checkFixed()
            this.setBodyData()
            this.$nextTick(()=>{
                this.setHeaderToTop()
                if(this.fixedLeft.length>0||this.fixedRight.length>0){
                    this.getScrollBarWidth()
                    this.setFixedWidth()
                }else{
                    this.setHeaderWidth()
                }
                this.setMainWidth()
            })
            if(this.spanMethod){
                this.runSpanMethod()
            }
        },
        watch:{
            selectedItems(){
                let selectedStatus = this.selectedItems.length===this.bodyData.length?'All':this.selectedItems.length>0?'half':'none'
                let {fixedInput,fixedMainInput} = this.$refs
                if(this.fixedLeft.length>0){
                    fixedInput.indeterminate = selectedStatus==='half'
                    fixedInput.checked = selectedStatus==='All'
                }else{
                    fixedMainInput.indeterminate = selectedStatus==='half'
                    fixedMainInput.checked = selectedStatus==='All'
                }
            }
        },
        methods:{
            getScrollBarWidth(){
                const scrollBar = document.createElement('div')
                let style = {
                    height:'50px',
                    overflow:'scroll',
                    position:'absolute',
                    top:'-9999px',
                    width:'50px'
                }
                Object.keys(style).forEach(item=>{
                    scrollBar.style[item]=style[item]
                })
                document.body.appendChild(scrollBar)
                this.scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth
                document.body.removeChild(scrollBar)
            },
            setHeaderWidth(){
                let width = this.columns.reduce((accumulate,current)=>accumulate+current.width
                ,0)
                if(this.checkBoxOn){
                    width +=60
                }
                this.$refs.tableFixedHeaderWrapper.style.width = width+'px'
            },
            setMainWidth(){
                let [$refs,width] = [this.$refs,0]
                if(this.headerColumns[0].width){
                    this.headerColumns.forEach(item=>{
                        width+=item.width
                    })
                }else{
                    width = parseInt(getComputedStyle(this.$refs.tableMain).width)
                }
                if(this.checkBoxOn&&this.headerColumns[0].width){
                    width+=60
                }
                $refs.tableMain.style.width = width +'px'
                $refs.tableMainWrapper.style.width = this.maxWidth +'px'
                if(this.maxHeight){
                    $refs.tableMainWrapper.style.height = this.maxHeight-parseInt(getComputedStyle($refs.tableFixedHeaderWrapper).height)+'px'
                }
                // else{
                //     $refs.tableMainWrapper.style.height = parseInt(getComputedStyle($refs.tableMainWrapper).height)-parseInt(getComputedStyle($refs.tableFixedHeaderWrapper).height)+'px'
                // }
                $refs.totalWrapper.style.width = this.maxWidth +'px'
                $refs.totalWrapper.style.height = this.maxHeight +'px'
            },
            setHeaderToTop(){
                let refs = this.$refs
                refs.tableFixedHeader.width = getComputedStyle(refs.tableFixedHeader).width
            },
            checkFixed(){
                let [left,right,main] = [[],[],[]]
                this.columns.forEach(item=>{
                    if(item.fixed==='left'){
                        left.push(item)
                    }else if(item.fixed==='right'){
                        right.push(item)
                    }else {
                        main.push(item)
                    }
                })
                if(left.length>0){
                    this.fixedLeft = left.concat(main,right)
                }
                if(right.length>0){
                    this.fixedRight = right.concat(main,left)
                }
                this.headerColumns = left.concat(main,right)
            },
            setFixedWidth(){
                let [tableLeftWrapperWidth,tableRightWrapperWidth,leftArr,rightArr,totalWidth,refs] = [0,0,[],[],0,this.$refs]
                this.headerColumns.forEach((item,index)=>{
                    totalWidth += item.width
                    if(item.fixed==='left'){
                        tableLeftWrapperWidth += item.width
                        leftArr.push(index)
                    }
                    if(item.fixed==='right'){
                        tableRightWrapperWidth += item.width
                        rightArr.push(index)
                    }
                })
                let Width
                if(this.checkFixed){
                    if(leftArr.length>0){
                        Width =totalWidth+ 60 +leftArr.length +'px'
                    }
                    if(rightArr.length>0){
                        Width =totalWidth+ 60 +rightArr.length +'px'
                    }
                }else{
                    if(leftArr.length>0){
                        Width = totalWidth +leftArr.length +'px'
                    }
                    if(rightArr.length>0){
                        Width = totalWidth +rightArr.length +'px'
                    }
                }
                if(leftArr.length>0){
                    this.$refs.tableLeftWrapper.style.height = this.maxHeight-parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).height)-this.scrollBarWidth+'px'
                    this.checkBoxOn?tableLeftWrapperWidth += 60:tableLeftWrapperWidth  //按钮固定的宽度
                    this.setColumnFixedWidth(refs,Width,tableLeftWrapperWidth,['tableLeft','tableLeftWrapper','tableFixedLeftHeader','tableFixedLeftHeaderWrapper'])
                }
                if(rightArr.length>0){
                    this.$refs.tableRightWrapper.style.height = this.maxHeight-parseInt(getComputedStyle(this.$refs.tableFixedHeaderWrapper).height)-this.scrollBarWidth+'px'
                    let rightWidth = totalWidth +rightArr.length +'px'
                    this.setColumnFixedWidth(refs,rightWidth,tableRightWrapperWidth,['tableRight','tableRightWrapper','tableFixedRightHeader','tableFixedRightHeaderWrapper'])
                }
                this.setTableWidth(refs,Width)
            },
            setColumnFixedWidth(refs,Width,tableWrapperWidth,name){
                let maxWidth = tableWrapperWidth+'px'
                refs[name[0]].style.width = Width
                refs[name[1]].style.width = maxWidth
                refs[name[2]].style.width = Width
                if(this.maxHeight&&name[0]==='tableRight'){
                    refs[name[3]].style.width = parseInt(maxWidth)+this.scrollBarWidth+'px'
                    this.$refs.right.style.width = parseInt(maxWidth)+'px'
                    this.$refs.right.style.right = this.scrollBarWidth+'px'
                }else{
                    refs[name[3]].style.width = maxWidth
                }
            },
            setTableWidth(refs,Width){
                refs.tableFixedHeader.style.width = Width
                refs.tableFixedHeaderWrapper.style.width = parseInt(this.maxWidth)-this.scrollBarWidth+'px'
            },
            setBodyData(){
                this.bodyData = JSON.parse(JSON.stringify(this.data))
            },
            setColumns(){
                this.headerColumns = JSON.parse(JSON.stringify(this.columns))
            },
            inSelected(item){
                return this.selectedItems.filter(child=>child.key===item.key).length>0
            },
            changeItem(item,index,e){
                let selected = e.target.checked
                let clone = JSON.parse(JSON.stringify(this.selectedItems))
                if(selected){
                    clone.push(item)
                }else{
                    let itemIndex
                    clone.forEach((child,index)=>{
                        if(child.key===item.key){
                            itemIndex = index
                        }
                    })
                    clone.splice(itemIndex,1)
                }
                this.$emit('update:selectedItems',clone)
            },
            onChangeAllItems(e){
                let selected = e.target.checked
                this.$emit('update:selectedItems',selected?this.bodyData:[])
            },
            clickSort(field,direction){
                this.order.state = this.order.state === true || this.order.name !== field ? direction : (this.order.state = this.order.state === direction ? true : direction);
                this.bodyData = this.order.state !== true ? this.bodyData.sort((a, b) => {
                    return  a[field] < b[field]?direction === 'ascending' ? -1 : 1:direction === 'ascending' ? 1 : -1
                }) : JSON.parse(JSON.stringify(this.data));
                this.order.name = field
            },
            sortUp(field){
                this.clickSort(field,'ascending')
            },
            sortDown(field){
                this.clickSort(field,'descending')
            },
            hoverChangeMain(index,e){
                let typeName = {
                    mouseenter:'#FCF9F9',
                    mouseleave:''
                }
                this.$refs.trMain[index].style.backgroundColor = typeName[e.type]
                if(this.fixedLeft.length>0){
                    this.$refs.trLeft[index].style.backgroundColor = typeName[e.type]
                }
                if(this.fixedRight.length>0){
                    this.$refs.trRight[index].style.backgroundColor = typeName[e.type]
                }
            },
            scrollGradient(){
                const ref = this.$refs
                const {tableLeftWrapper,tableRightWrapper} = ref
                let {scrollTop,scrollLeft} = ref.tableMainWrapper
                if(scrollLeft!==xScroll.data.currentScrollLeft){
                    let {width} = ref.tableMain.style
                    this.hiddenShadow.left = scrollLeft === 0 ? true : false;
                    this.hiddenShadow.right = parseInt(width)<=scrollLeft+parseInt(this.maxWidth) ? true : false
                    this.$refs.tableFixedHeaderWrapper.scrollLeft = scrollLeft
                    xScroll.data.currentScrollLeft= scrollLeft
                    return
                }
                if(xScroll.data.currentScrollTop===scrollTop)return
                xScroll.data.currentScrollTop=scrollTop
                this.$refs.tableMain.classList.remove('debug')
                window.requestAnimationFrame(()=>{
                    if(this.fixedLeft.length>0){
                        tableLeftWrapper.scrollTop = scrollTop
                    }
                    if(this.fixedRight.length>0){
                        tableRightWrapper.scrollTop = scrollTop
                    }
                    window.requestAnimationFrame(()=>{
                        this.$refs.tableMain.classList.add('debug')
                    })
                })
            },
            scrollLeftGradient(){
                let scrollLeft = this.$refs.tableFixedHeaderWrapper.scrollLeft
                if(this.oldScrollLeft===scrollLeft)return
                this.$refs.tableMainWrapper.scrollLeft = scrollLeft
            },
            runSpanMethod(){
                this.headerColumns.forEach((col,colIndex)=>{
                    this.bodyData.forEach((row,rowIndex)=>{
                        let obj = this.spanMethod(row,colIndex,rowIndex)||{}
                        if(!obj.rowspan){
                            obj.rowspan = 1
                        }else if(obj.rowspan>1){
                            let i = 1
                           while(i<obj.rowspan){
                               delete this.bodyData[rowIndex+i][col.field]
                               i++
                           }
                           console.log(this.bodyData)
                        }
                        if(!obj.colspan){
                            obj.colspan = 1
                        }
                        if(!this.cell[colIndex]){
                            this.cell[colIndex] = []
                        }
                        this.cell[colIndex][rowIndex] = obj
                    })
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    *{
        transition: .3s all ease;
        -webkit-font-smoothing: antialiased;
    }
    .x-table-wrapper{
        -webkit-font-smoothing: antialiased;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid #efefef;
        border-left: 1px solid white;
        margin: 0;
        padding: 0;
        display: inline-block;
        &.borderHidden{
            border-bottom: none;
        }
    }
    .x-table{
        transition: .3s all;
        min-width: 100%;
        color:#515a6e;
        border-collapse: collapse;
        border-spacing: 0;
        border-bottom: 1px solid #efefef;
        overflow: scroll;
        &.bordered{
            border:1px solid #efefef;
            td,th{
                border: 1px solid #efefef;
            }
        }
        &.compact{
            td,th{
                padding: 6px;
            }
        }
        &.stripe{
            tbody {
                >tr{
                    &:nth-child(odd){
                        background-color: #FCF9F9;
                    }
                }
            }
        }
        th{
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
        }
        td,th{
            color:lighten(#515a6e,13.5%);
            text-align: center;
            padding: 13px;
            border-bottom: 1px solid #efefef;
        }
        tr{
            &:hover{
                background-color: #FCF9F9;
            }
        }
        &-th{
            display: inline-flex;
            align-items: center;
            &-icon{
                fill: #666666;
                margin-left: .15em;
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                width: 1em;
                height: 1em;
                cursor: pointer;
            }
        }
        &-loading{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255,255,255,.6);
            z-index: 2;
        }
        &-main{
            display: inline-block;
            &-header{
                width: 100%;
                background-color: #f9f9f9;
                overflow: scroll;
                z-index: 3;
                &::-webkit-scrollbar{
                    display: none;
                }
                -ms-overflow-style: none;
                scrollbar-width: none;
                overflow: -moz-scrollbars-none;
                table{
                    thead{
                        background-color: #f9f9f9;
                    }
                }
            }
            &-body{
                border-bottom: 1px solid #efefef;
            }
        }
        &-left{
            position: absolute;
            left: 0;
            top: 0;
            will-change: transform;
            box-shadow: 6px 0 6px -4px rgba(0,0,0,0.15);
            &-header{
                background-color: #f9f9f9;
                z-index: 4;
            }
            &-body{
                will-change: transform;
                z-index: 4;
                background-color: white;
                &::-webkit-scrollbar{
                    display: none;
                }
                -ms-overflow-style: none;
                scrollbar-width: none;
                overflow: -moz-scrollbars-none;
            }
        }
        &-right{
            position: absolute;
            top: 0;
            right: 0;
            box-shadow: -6px 0 6px -4px rgba(0,0,0,0.15);
            will-change: transform;
            &-body{
                &::-webkit-scrollbar{
                    display: none;
                }
                -ms-overflow-style: none;
                scrollbar-width: none;
                overflow: -moz-scrollbars-none;
                z-index: 4;
                background-color: white;
            }
            &-header{
                z-index: 4;
                background-color: #f9f9f9;
            }
        }
    }
    .boxShadowNone{
        box-shadow: none !important;
    }
    .stopScroll{
        pointer-events:none!important;
    }
    .debug{
        transform: translateZ(0);
    }
</style>
