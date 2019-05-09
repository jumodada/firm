<template>
    <div style="position:relative;" ref="totalWrapper" >
        <div  v-if="fixedLeft.length>0" :class="{boxShadowNone:hiddenShadow}" class="x-table-header-left" :style="{maxHeight:`${maxHeight+'px'}`,overflow:'hidden'}" ref="tableFixedLeftHeaderWrapper">
            <table class="x-table" :class="{bordered,compact,stripe:stripe}" v-if="columns[0].width" ref="tableFixedLeftHeader">
                <colgroup>
                    <col style="width: 60px">
                    <col v-for="column in fixedLeft" :key="column.field" :style="{width:`${column.width}px`}">
                </colgroup>
                <thead class="x-table-head">
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
        <div class="x-table-header-main" :style="{maxHeight:`${maxHeight+'px'}`,overflow:'auto'}" ref="tableFixedHeaderWrapper">
            <table class="x-table" :class="{bordered,compact,stripe:stripe}" v-if="columns[0].width" ref="tableFixedHeader">
                <colgroup>
                    <col v-if="checkBoxOn" style="width: 60px">
                    <col v-for="column in headerColumns" :key="column.field" :style="{width:`${column.width}px`}">
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
        <div class="x-table-wrapper" ref="wrapper" :class="{borderHidden:columns[0].width}">
            <!--           主体-->
            <div :style="{maxHeight:`${maxHeight+'px'}`,overflow:'auto'}" ref="tableMainWrapper">
                <table
                        class="x-table" :class="{bordered,compact,stripe:stripe}" ref="table"
                        @wheel="scrollGradient('main',$event)"
                        @mouseenter="WrapperHover"
                        @mouseleave="WrapperHover"
                >
                    <colgroup>
                        <col v-if="checkBoxOn" style="width:60px">
                        <col v-for="column in headerColumns" :key="column.field" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead class="x-table-head" v-if="!columns[0].width">
                    <tr>
                        <th v-if="checkBoxOn">
                            <input @change="onChangeAllItems" type="checkbox" ref="mainInput">
                        </th>
                        <th v-for="column in headerColumns"
                            :key="column.field">
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
                    <tbody ref="tBodyMain">
                    <tr v-for="(item,index) in bodyData" :key="item.key"
                        @mouseenter="hoverChangeMain(index,$event)"
                        @mouseleave="hoverChangeMain(index,$event)"
                        ref="trMain">
                        <td v-if="checkBoxOn">
                            <input :checked="inSelected(item)" @change="changeItem(item,index,$event)" type="checkbox">
                        </td>
                        <td v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in headerColumns">
                            <td :key="column.field">
                                <span :style="{visibility:column.fixed==='left'?'hidden':''}">{{item[column.field]}}</span>
                            </td>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--  左边固定  -->
            <div   class="x-table-left" :style="{maxHeight:`${fixedWrapperHeight+'px'}`,overflow:'hidden',overflowY:'auto'}" ref="tableLeftWrapper"
                  @wheel="scrollGradient('left',$event)"
                  @mouseenter="WrapperHover"
                  @mouseleave="WrapperHover"
                  :class="{boxShadowNone:hiddenShadow}"
                   v-if="fixedLeft.length>0"
            >
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableLeft">
                    <colgroup>
                        <col v-if="checkBoxOn" style="width: 60px">
                        <col v-for="column in fixedLeft" :key="column.field" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody>
                    <tr v-for="(item,index) in bodyData" :key="item.key"
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
            <!--  右边固定  -->
            <div class="x-table-right" :style="{maxHeight:`${fixedWrapperHeight+'px'}`,overflow:'hidden',overflowY:'auto'}" ref="tableRightWrapper"
                  @wheel="scrollGradient('left',$event)"
                  @mouseenter="WrapperHover"
                  @mouseleave="WrapperHover"
                  :class="{boxShadowNone:hiddenShadow}"
                  v-if="fixedRight.length>0"
            >
                <table  class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableRight">
                    <colgroup>
                        <col v-for="column in fixedRight" :key="column.field" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <tbody>
                    <tr v-for="(item,index) in bodyData" :key="item.key"
                        @mouseenter="hoverChangeMain(index,$event)"
                        @mouseleave="hoverChangeMain(index,$event)"
                        ref="trRight"
                    >
                        <td v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in fixedRight">
                            <td :key="column.field">
                                <span :style="{visibility:column.fixed==='left'?'':'hidden'}">{{item[column.field]}}</span>
                            </td>
                        </template>
                    </tr>
                    </tbody>
                </table>
            </div>
            <loading v-if="loading" class="x-table-loading"></loading>
        </div>
    </div>
</template>

<script>
    import loading from '../../currency/dynamic icon/loading'
    import Icon from '../../currency/icon'
    export default {
        name: "x-table",
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
        },
        computed:{
            fixedWrapperHeight(){
                if(this.maxWidth){
                    return `${this.maxHeight-15}`
                }else{
                    return `${this.maxHeight}`
                }
            }
        },
        data(){
            return {
                order:{},
                bodyData:{},
                headerColumns: {},
                fixedLeft:[],
                fixedRight:[],
                canIListen:true,
                hiddenShadow:true,
            }
        },
        mounted(){
            this.setColumns()
            this.checkFixed()
            this.setBodyData()
            this.$nextTick(()=>{
                this.setHeaderToTop()
                if(this.fixedLeft.length>0||this.fixedRight.length>0){
                    this.setFixedWidth()
                }
                this.setMainWidth()
            })
            this.tableAddEventListener()
        },
        beforeDestroy(){
            this.tableRemoveEventListener()
        },
        watch:{
            selectedItems(){
                let selectedStatus = this.selectedItems.length===this.bodyData.length?'All':this.selectedItems.length>0?'half':'none'
                if(this.fixedLeft.length>0){
                    this.$refs.fixedInput.indeterminate = selectedStatus==='half'
                    this.$refs.fixedInput.checked = selectedStatus==='All'
                }else{
                    this.$refs.fixedMainInput.indeterminate = selectedStatus==='half'
                    this.$refs.fixedMainInput.checked = selectedStatus==='All'
                }
            }
        },
        methods:{
            tableAddEventListener(){
                if(this.fixedLeft.length===0&&this.fixedRight.length===0)return
                this.$refs.tableMainWrapper.addEventListener('scroll',(e)=>{
                    if(!this.canIListen)return
                    this.scrollGradient('main',e,'handle')
                })
            },
            tableRemoveEventListener(){
                if(this.fixedLeft.length===0&&this.fixedRight.length===0)return
                this.$refs.tableMainWrapper.removeEventListener('scroll',(e)=>{
                    if(!this.canIListen)return
                    this.scrollGradient('main',e,'handle')
                })
            },
            setMainWidth(){
                this.$refs.table.style.width = getComputedStyle(this.$refs.table).width
                this.$refs.tableMainWrapper.style.width = this.maxWidth +'px'
            },
            setHeaderToTop(){
                let [height,refs] = [getComputedStyle(this.$refs.tableFixedHeaderWrapper).height,this.$refs]
                refs.tableFixedHeader.width = getComputedStyle(this.$refs.tableFixedHeader).width
                if(refs.tableFixedLeftHeaderWrapper){
                    refs.tableFixedLeftHeaderWrapper.style.top = '-'+height
                }
                if(refs.tableFixedHeaderWrapper){
                    refs.tableFixedHeaderWrapper.style.width = this.maxWidth+'px'
                    refs.tableFixedHeaderWrapper.style.top = '-'+height
                }
                refs.totalWrapper.style.top = height
            },
            checkFixed(){
                this.columns.forEach((item,index)=>{
                    if(item.fixed){
                        let columnsCopy = JSON.parse(JSON.stringify(this.columns))
                        columnsCopy.splice(index,1)
                        columnsCopy.unshift(item)
                        this.headerColumns.splice(index,1)
                        this.headerColumns.unshift(item)
                        this.fixedLeft = columnsCopy
                    }else if(item.fixed==='right'){
                        let columnsCopy = JSON.parse(JSON.stringify(this.columns))
                        columnsCopy.splice(index,1).unshift(item)
                        this.fixedRight.push(item)
                    }
                })
            },
            setFixedWidth(){
                let [tableLeftWrapperWidth,tableRightWrapperWidth,leftArr,rightArr,totalWidth,refs] = [0,0,[],[],0,this.$refs]
                this.fixedLeft.forEach((item,index)=>{
                    totalWidth += item.width
                    if(item.fixed==='left'){
                        tableLeftWrapperWidth += item.width
                        leftArr.push(index)
                    }else if(item.fixed==='right'){
                        tableRightWrapperWidth += item.width
                        rightArr.push(index)
                    }
                })
                let Width = this.checkBoxOn?totalWidth+ 60 +leftArr.length +'px':totalWidth +leftArr.length +'px'
                let rightWidth = totalWidth +rightArr.length +'px'
                this.checkBoxOn?tableLeftWrapperWidth += 60:tableLeftWrapperWidth  //按钮固定的宽度
                if(leftArr.length>0){
                    this.setColumnFixedWidth(refs,Width,tableLeftWrapperWidth,['tableLeft','tableLeftWrapper','tableFixedLeftHeader','tableFixedLeftHeaderWrapper'])
                }else if(rightArr.length>0){
                    this.setColumnFixedWidth(refs,rightWidth,tableRightWrapperWidth,['tableRight','tableRightWrapper','tableFixedRightHeader','tableFixedRightHeaderWrapper'])
                }
                this.setTableWidth(refs,Width)
            },
            setColumnFixedWidth(refs,Width,tableWrapperWidth,name){
                let maxWidth = tableWrapperWidth+'px'
                refs[name[0]].style.width = Width
                refs[name[1]].style.width = maxWidth
                refs[name[2]].style.width = Width
                refs[name[3]].style.width = maxWidth
            },
            setTableWidth(refs,Width){
                refs.tableFixedHeader.style.width = Width
                refs.tableFixedHeaderWrapper.style.width = parseInt(this.maxWidth)+1+'px'
                refs.wrapper.style.width = Width
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
            scrollGradient(part,e,scrollType){

                if(this.fixedLeft.length===0&&this.fixedRight.length===0)return
                    let x ={
                    left:[`tableLeftWrapper`,`tableMainWrapper`],
                    main:[`tableMainWrapper`,`tableLeftWrapper`]
                }
                let scrollTop = this.$refs[x[part][0]].scrollTop
                let scrollLeft = this.$refs.tableMainWrapper.scrollLeft
                this.hiddenShadow = scrollLeft === 0 ? true : false;
                if(scrollType==='handle'){
                    this.$refs[x[part][1]].scrollTop= scrollTop
                    this.$refs.tableFixedHeaderWrapper.scrollLeft = scrollLeft
                }else{
                    this.$refs[x[part][1]].scrollTop += e.deltaY
                    this.$refs[x[part][0]].scrollTop += e.deltaY
                    setTimeout(()=>{
                        this.repairScrollTop(x[part][0],x[part][1])
                    },25)
                }
            },
            repairScrollTop(part1,part2){
                let scrollTop = this.$refs[part1].scrollTop
                this.$refs[part2].scrollTop= scrollTop
            },
            WrapperHover(e){
                this.canIListen = e.type === 'mouseenter' ? false : true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        transition: .3s all ease;
    }
    .x-table-wrapper{
        -webkit-font-smoothing: antialiased;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid #efefef;
        border-left: 1px solid white;
        margin: 0;
        padding: 0;
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
        overflow: auto;
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
        &-header-main{
            width: 100%;
            position: absolute;
            top: 0;
            background-color: #f9f9f9;
            z-index: 3;
            &::-webkit-scrollbar{
                display: none;
            }
            table{
                thead{
                    background-color: #f9f9f9;
                }
            }
        }
        &-header-left{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #f9f9f9;
            box-shadow: 6px 2px 6px -4px rgba(0,0,0,0.15);
            z-index: 4;
        }
        &-left{
            position: absolute;
            z-index: 2;
            left: -1px;
            top: 0;
            overflow: hidden;
            background-color: white;
            box-shadow: 6px 0 6px -4px rgba(0,0,0,0.15);
            &::-webkit-scrollbar{
                display: none;
            }
        }
        &-right{
            position: absolute;
            z-index: 2;
            right: -1px;
            top: 0;
            overflow: hidden;
            background-color: white;
            box-shadow: -6px 0 6px -4px rgba(0,0,0,0.15);
            &::-webkit-scrollbar{
                display: none;
            }
        }
    }
    .boxShadowNone{
        box-shadow: none !important;
    }
</style>
