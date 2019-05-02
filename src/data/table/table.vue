<template>
    <div class="x-table-wrapper" :style="`${maxHeight}+ px`">
        <table class="x-table" :class="{bordered,compact,stripe:stripe}">
            <thead class="x-table-head">
            <tr>
                <th v-if="checkBoxOn">
                    <input @change="onChangeAllItems" ref="input"
                           type="checkbox"></th>
                <th v-for="column in columns" :key="column.field">
                    <div class="x-table-th">
                        {{column.text}}
                        {{column.field}}
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
            <tbody>
            <tr v-for="(item,index) in bodyData" :key="item.key">
                <th v-if="checkBoxOn">
                    <input :checked="inSelected(item)" @change="changeItem(item,index,$event)" type="checkbox">
                </th>
                <td v-if="numberVisible">{{index+1}}</td>
                <template v-for="column in columns">
                    <td :key="column.field">
                        {{item[column.field]}}
                    </td>
                </template>
            </tr>
            </tbody>
        </table>
        <loading v-if="loading" class="x-table-loading"></loading>
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
            defaultSort:Object
        },
        data(){
          return {
              order:{},
              bodyData:{}
          }
        },
        mounted(){
            this.bodyData = JSON.parse(JSON.stringify(this.data))
            // this.setOrderAttr()
        },
        watch:{
            selectedItems(){
                let selectedStatus = this.selectedItems.length===this.bodyData.length?'All':this.selectedItems.length>0?'half':'none'
                this.$refs.input.indeterminate = selectedStatus==='half'
                this.$refs.input.checked = selectedStatus==='All'
            }
        },
        methods:{
            setOrderAttr(){
                if(!this.defaultSort)return
                this.columns.forEach(item=>{
                    this.order[item.field] = true
                })
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

        }
    }
</script>

<style lang="scss">
    .x-table-wrapper{
        -webkit-font-smoothing: antialiased;
        position: relative;
        .x-table{
            transition: .3s all;
            width: 100%;
            color:#515a6e;
            border-collapse: collapse;
            border-spacing: 0;
            border-bottom: 1px solid #efefef;
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
                            background-color: lighten(#f1eeee,3.5%);
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
                    transition: .3s all ease;
                    background-color: lighten(#f1eeee,3.5%);
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
        }
    }
</style>
