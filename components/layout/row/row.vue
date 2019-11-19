<template>
<div class="row" :style="rowStyle"
        :class="rowClass"
>
<slot></slot>
</div>
</template>

<script>
    export default {
        name: "f-row",
        props:{
            flex:{
                type:[Number,String]
            },
            arrange:{
                type: String,
                validator(val){
                  return   ['right','left','center'].indexOf(val)>-1
                }
            },
            gutter:{
                type:[Number,String]
            }
        },
        mounted(){
            this.$children.forEach(vm=>{
                vm.flex = this.flex
                vm.gutter = this.gutter
            })
        },
        computed:{
            rowStyle(){
                return {
                    marginLeft:-this.flex/2+'px',
                    marginRight:-this.flex/2+'px'
                }
            },
            rowClass(){
                let {arrange} = this
                return [arrange && `row-${arrange}`]
            }

        }
    }

</script>

<style scoped lang="scss">
.row{
    display: flex;
    flex-wrap: wrap;
    &-left{
        justify-content: flex-start;
    }
    &-center{
        justify-content: center;
    }
    &-right{
        justify-content: flex-end;
    }
}
</style>
