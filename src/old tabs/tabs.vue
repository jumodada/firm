<template>
    <div class="tabs-header" :class="positionStyle">
            <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "g-tabs",
        props:{
            selected:{
                type:String,
                required:true
            },
            position:{
                type: String,
                default:'top',
                validator(val){
                    return ['top','left','right','bottom'].indexOf(val)>-1
                }
            }
        },
        data(){
          return {
              eventBus:new Vue()
          }
        },
        computed:{
            positionStyle(){
                return `postion-${this.position}`
            },
            classes(){
                return {
                    active:this.active
                }
            }
        },
        provide(){
          return {
              eventBus:this.eventBus
          }
        },
        created(){
            this.$emit('update:selected', '这是emit出来的')
        },
        mounted(){

            if(this.$children.length===0){
                throw new Error('tabs的子组件应该是tabs-head和tabs-panel，但你没有子组件')
            }
            this.$children.forEach(vm=>{
                if(vm.$options.name ==='g-tabs-header'){
                    vm.$children.forEach(child=>{
                        if(child.name===this.selected && child.$options.name==='g-tabs-item'){

                            this.eventBus.$emit('update:selected',this.selected,child)

                        }
                    })
                }
            })

        }
    }
</script>

<style scoped lang="scss">
.tabs-header{

}
</style>
