<template>
    <div>
        <tr v-for="(item,index) in data" :key="item.key">
            <th v-if="checkBoxOn">
                <input :checked="inSelected(item)" @change="changeItem(item,index,$event)" type="checkbox"></th>
            <td v-if="numberVisible">{{index+1}}</td>
            <template v-for="column in columns">
                <td :key="column.field">
                    {{item[column.field]}}
                </td>
            </template>
        </tr>
    </div>
</template>

<script>
    export default {
        name: "x-table-column",
        props:{
          data:Array ,
            sortBy:{
                type:Boolean,
                default:false
            },
        },
        methods:{
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
        }
    }
</script>

<style scoped lang="scss">

</style>
