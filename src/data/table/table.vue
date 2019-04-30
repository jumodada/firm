<template>
    <div class="x-table-wrapper">
        <table class="x-table" :class="{bordered,compact,stripe:stripe}">
            <thead class="x-table-head">
            <tr>
                <th v-if="checkBoxOn">
                    <input @change="onChangeAllItems" ref="input"
                           type="checkbox"></th>
                <th v-for="column in columns" :key="column.field">
                    <div class="x-table-th">
                        {{column.text}}
                        {{column.sortBy}}
                        <span class="x-table-th-icon" v-if="column.sortBy=== true">
                            <x-icon  :style="{fill:order==='ascending'?'109CCB':'#666666'}" @click="sortUp(column.field)" name="asc"></x-icon>
                            <x-icon :style="{fill:order==='descending'?'109CCB':'#666666'}" @click="sortDown(column.field)" style="margin-top: 2px" name="desc"></x-icon>
                        </span>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in data" :key="item.key">
                <th v-if="checkBoxOn"><input :checked="inSelected(item)" @change="changeItem(item,index,$event)" type="checkbox"></th>
                <td v-if="numberVisible">{{index+1}}</td>
                <template v-for="column in columns">
                    <td :key="column.field">
                        {{item[column.field]}}
                    </td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Icon from '../../currency/icon'
    export default {
        name: "x-table",
        components:{
            'x-icon': Icon
        },
        props:{
            stripe:{
                type:Boolean,
                default: true
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
              order:true
          }
        },
        watch:{
            selectedItems(){
                let selectedStatus = this.selectedItems.length===this.data.length?'All':this.selectedItems.length>0?'half':'none'
                this.$refs.input.indeterminate = selectedStatus==='half'
                this.$refs.input.checked = selectedStatus==='All'
            }
        },
        methods:{
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
                this.$emit('update:selectedItems',selected?this.data:[])
            },
            sortUp(field){
                console.log(field)
                this.order = this.order === true ? 'ascending' : this.order = this.order === 'ascending' ? true : 'ascending';
                let dataCopy = JSON.parse(JSON.stringify(this.data))
                if(this.defaultSort.prop){
                    dataCopy = dataCopy.sort((a,b)=>{
                        return a[field]-b[field]
                    })
                }
                console.log(dataCopy)
                this.$emit('update:data',dataCopy)
            },
            sortDown(){
                this.order = this.order === true ? 'descending' : this.order = this.order === 'descending' ? true : 'descending';
            }
        }
    }
</script>

<style lang="scss">
    .x-table-wrapper{
        -webkit-font-smoothing: antialiased;
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
        }
    }
</style>
