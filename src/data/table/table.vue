<template>
    <div style="position:relative;" ref="totalWrapper" >
        <div  :class="{boxShadowNone:hiddenShadow}" class="x-table-header-left" :style="{maxHeight:`${maxHeight+'px'}`,overflow:'hidden'}" ref="tableFixedLeftHeaderWrapper">
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
                    <col style="width: 60px">
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
                        @mouseenter="leftWrapperHover"
                        @mouseleave="leftWrapperHover"
                >
                    <colgroup>
                        <col style="width:60px">
                        <col v-for="column in headerColumns" :key="column.field" :style="{width:`${column.width}px`}">
                    </colgroup>
                    <thead class="x-table-head" v-if="!columns[0].width">
                    <tr>
                        <th v-if="checkBoxOn">
                            <input @change="onChangeAllItems" type="checkbox" ref="fixedInput">
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
            <!--                左边固定-->
            <div  v-if="fixedLeft" class="x-table-left" :style="{maxHeight:`${fixedLeftHeight+'px'}`,overflow:'hidden',overflowY:'auto'}" ref="tableLeftWrapper"
                  @wheel="scrollGradient('left',$event)"
                  @mouseenter="leftWrapperHover"
                  @mouseleave="leftWrapperHover"
                  :class="{boxShadowNone:hiddenShadow}"
            >
                <table class="x-table" :class="{bordered,compact,stripe:stripe}" ref="tableLeft">
                    <colgroup>
                        <col style="width: 60px">
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
                            <td :key="column.field" ref="tableLeftTd">
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
            fixedLeftHeight(){
                if(this.maxWidth){
                    return `${this.maxHeight-14}`
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
                hiddenShadow:true
            }
        },
        mounted(){
            this.setBodyData()
            this.setColumns()
            this.$nextTick(()=>{
                this.setHeaderToTop()
                this.checkFixedAndClone()
                this.setFixedWidth()
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
                if(this.columns[0].width){
                    this.$refs.fixedInput.indeterminate = selectedStatus==='half'
                    this.$refs.fixedInput.checked = selectedStatus==='All'
                }else{
                    this.$refs.input.indeterminate = selectedStatus==='half'
                    this.$refs.input.checked = selectedStatus==='All'
                }
            }
        },
        methods:{
            setMainWidth(){
                this.$refs.table.style.width = getComputedStyle(this.$refs.table).width
                this.$refs.tableMainWrapper.style.width = this.maxWidth +'px'
            },
            setHeaderToTop(){
                this.$refs.tableFixedHeader.width = getComputedStyle(this.$refs.tableFixedHeader).width
                this.$refs.tableFixedHeaderWrapper.style.width = this.maxWidth+'px'
            },
            tableAddEventListener(){
                this.$refs.tableMainWrapper.addEventListener('scroll',(e)=>{
                    if(!this.canIListen)return
                    this.scrollGradient('main',e,'handle')
                })
            },
            tableRemoveEventListener(){
                this.$refs.tableMainWrapper.removeEventListener('scroll',(e)=>{
                    if(!this.canIListen)return
                    this.scrollGradient('main',e,'handle')
                })
            },
            checkFixedAndClone(){
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
                let {width} = getComputedStyle(this.$refs.table)
                let [tableLeftWrapperWidth,leftArr,totalWidth] = [0,[],0]
                this.fixedLeft.forEach((item,index)=>{
                    totalWidth += item.width
                    if(item.fixed==='left'){
                        tableLeftWrapperWidth += item.width
                        leftArr.push(index)
                    }
                })
                tableLeftWrapperWidth += 60 //按钮固定的宽度
                 this.$refs.tableLeft.style.width = totalWidth+ 60+leftArr.length +'px'
                 this.$refs.tableLeftWrapper.style.width = tableLeftWrapperWidth+'px'
                 this.$refs.tableFixedLeftHeader.style.width = totalWidth+60+leftArr.length +'px'
                 this.$refs.tableFixedLeftHeaderWrapper.style.width = tableLeftWrapperWidth+'px'
                 this.$refs.wrapper.style.width = totalWidth+60+leftArr.length +'px'
                 this.$refs.totalWrapper.style.top = getComputedStyle(this.$refs.tableFixedLeftHeaderWrapper).height

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
                this.$refs.trLeft[index].style.backgroundColor = typeName[e.type]
            },
            scrollGradient(part,e,scrollType){
                let x ={
                    left:[`tableLeftWrapper`,`tableMainWrapper`],
                    main:[`tableMainWrapper`,`tableLeftWrapper`]
                }
                let scrollLeft = this.$refs.tableMainWrapper.scrollLeft
                if(scrollLeft===0){
                    this.hiddenShadow = true
                }else{
                    this.hiddenShadow = false
                }
                if(scrollType==='handle'){
                    let scrollTop = this.$refs[x[part][0]].scrollTop
                    this.$refs[x[part][1]].scrollTop= scrollTop
                    this.$refs.tableFixedHeaderWrapper.scrollLeft = scrollLeft
                }else{
                    this.$refs[x[part][1]].scrollTop += e.deltaY
                    setTimeout(()=>{
                        this.repairScrollTop(x[part][0],x[part][1])
                    },25)
                }
            },
            repairScrollTop(part1,part2){
                let scrollTop = this.$refs[part1].scrollTop
                this.$refs[part2].scrollTop= scrollTop
            },
            leftWrapperHover(e){
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
            text-align: left;
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
            top: -12.3%;
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
            top: -12.3%;
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
    }
    .boxShadowNone{
        box-shadow: none !important;
    }
</style>
