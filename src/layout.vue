<template>
<div class="layout"  :class="layoutClass">
    <slot></slot>
</div>
</template>

<script>
    export default {
        name: "x-layout",
        data(){
          return {
              layoutClass:{
                  hasSlider:false
              }
          }
        },
        mounted(){
            this.$children.forEach(vm=>{
                if(vm.$options.name === 'x-slider'){
                    this.layoutClass.hasSlider = true
               }
            })
        }
    }
</script>

<style scoped lang="scss">
        .layout{
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            &.hasSlider{
                flex-direction: row;
            }
        }
</style>
