<template>
<div class="row" :style="rowStyle"
        :class="rowClass"
>
<slot></slot>
</div>
</template>

<script>
    export default {
        name: "gRow",
        props:{
            gutter:{
                type:[Number,String]
            },
            arrange:{
                type: String,
                validator(val){
                  return   ['right','left','center'].indexOf(val)>-1
                }
            }
        },
        mounted(){
            this.$children.forEach(vm=>{
                vm.gutter = this.gutter
            })
        },
        computed:{
            rowStyle(){
                return {
                    marginLeft:-this.gutter/2+'px',
                    marginRight:-this.gutter/2+'px'
                }
            },
            rowClass(){
                let {arrange} = this
                return [arrange && `row-${arrange}`]
            }

        }
    }



    // var div =  document.createElement('div')     created
    // var childDiv = document.createElement('div')
    // div.appendChild(childDiv)
    // document.body.appendChild(div)               mounted

</script>

<style scoped lang="scss">
.row{
    display: flex;
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
