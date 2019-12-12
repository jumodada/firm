<template>
    <table v-if="columns&&columns.length>0" ref="header">
        <colgroup ref="headerColGroup">
            <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
        </colgroup>
        <thead class="f-table-head">
        <tr>
            <th v-for="column in columns " :key="column.key">
                <div class="f-table-th td-div">
                  <template v-if="column.title">
                      {{column.title}}
                  </template>
                    <template v-if="column.type==='selection'">
                      <checkBox :value="checkBoxValue" @on-change="selectAll"></checkBox>
                    </template>
                    <span class="f-table-th-icon" v-if="column.sortBy=== true">
                            <f-icon @click="sortUp(column.key)"
                                    :style="{fill:order.state=== 'ascending' && order.name===column.key ? '109CCB' : '#666666'}"
                                    name="asc"></f-icon>
                            <f-icon @click="sortDown(column.key)"
                                    :style="{fill:order.state === 'descending' && order.name===column.key ? '109CCB' : '#666666'}"
                                    style="margin-top: 2px" name="desc"></f-icon>
                    </span>
                </div>
            </th>
        </tr>
        </thead>
    </table>
</template>

<script>
    import checkBox from '../../../currency/check-box'
    export default {
        name: "f-table-header",
        components:{
            checkBox
        },
        props:{
            columns:{
                type:Array,
                default:()=>[]
            }
        },
        data(){
          return {
              checkBoxValue:false
          }
        },
        mounted(){
            this.$nextTick(()=>{
                this.setColGroup()
            })
        },
         methods:{
             setColGroup() {
                 if(this.columns.length===0)return
                 let width = parseInt(getComputedStyle(this.$refs.header).width)
                 let averageWidth = parseInt(width / this.columns.length)
                 this.columns.forEach((item, index) => {
                     if (!item.width) this.$refs.headerColGroup.children[index].style.width = averageWidth + 'px'
                 })
             },
             selectAll(val){
                 console.log(val)
             }
         }
    }
</script>

<style scoped>
    @import "../../../../src/styles/components/table.scss";
</style>
