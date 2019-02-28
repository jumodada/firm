<template>
    <div class="collapse">
   <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "x-collapse",
        data(){
            return {
                eventBus:new Vue(),
            }
        },
        props:{
          single:{
              type:Boolean,
              default:false
          },
            selected:{
              type: Array
            }
        },
        provide(){
          return {
              eventBus: this.eventBus
          }
        },

        mounted(){
            this.eventBus.$emit('update:selected',this.selected)
            this.eventBus.$on('update:addSelected',name=>{
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))

                if(this.single){
                    selectedCopy = [name]
                }else{
                    selectedCopy.push(name)
                }
                this.$emit('update:selected',selectedCopy)
                this.eventBus.$emit('update:selected',selectedCopy)
            })
            this.eventBus.$on('update:removeSelected',name=>{
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))

                let index= selectedCopy.indexOf(name)
                selectedCopy.splice(index,1)

                this.$emit('update:selected',selectedCopy)
                this.eventBus.$emit('update:selected',selectedCopy)
            })
        }
    }
</script>

<style scoped lang="scss">
    $grey:#ddd;
    $border-radius:4px;
        .collapse{
            color: rgba(0,0,0,0.65);
            background-color: #fafafa;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            border-bottom: 0;

        }
</style>
