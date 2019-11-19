<template>
     <div class="f-button-group">
         <slot></slot>
     </div>
</template>

<script>
    export default {
        name: "button-group",
        mounted(){
           this.$children.forEach(child=>{
                if(child.$options.name !== 'f-button'){
                    console.error('f-button-group的子元素应该全是f-button')
                }
            })
        }
    }
</script>

<style scoped lang="scss">
 .f-button-group{
    display: inline-flex;
    vertical-align: center;
    @import "../../../../src/global";

     /deep/ .f-button{

         &:not(:first-child){
             margin-left: -1px;
         }
         &:first-child{
             border-top-left-radius: $border-radius !important;
             border-bottom-left-radius: $border-radius !important;
         }
         &:last-child{
             border-top-right-radius: $border-radius !important;
             border-bottom-right-radius: $border-radius !important;
         }
         &:hover{
             border-color: #ef6c14;
             position:relative;
             z-index: 1;
         }
             border-radius: 0 !important;

     }
}
</style>
