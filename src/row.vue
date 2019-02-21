<template>
<div class="row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}"

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
            }
        },
        mounted(){
            this.$children.forEach(vm=>{
                vm.gutter = this.gutter
                vm.haha = 'haha'
            })
            console.log(this.$children);
        },
    }
    // var div =  document.createElement('div')
    // var childDiv = document.createElement('div')
    // div.appendChild(childDiv)
    // document.body.appendChild(div)

</script>

<style scoped lang="scss">
.row{
    display: flex;
}
</style>
