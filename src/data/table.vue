<template>
    <div class="x-table-wrapper">
        <table class="x-table" :class="{bordered,compact,stripe:stripe}">
            <thead class="x-table-head">
            <tr>
                <th v-if="checkBoxOn"><input @change="onChangeAllItems" ref="input"
                                             type="checkbox"></th>
                <th v-for="column in columns" :key="column.field">
                    {{column.text}}
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
    export default {
        name: "x-table",
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
                    var itemIndex
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

            }
        }
    }
</script>

<style lang="scss">

        .x-table-wrapper{
            -webkit-font-smoothing: antialiased;
            .x-table{
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
                        padding: 4px;
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
                    padding: 8px;
                    border-bottom: 1px solid #efefef;
                }

            }
        }
</style>
