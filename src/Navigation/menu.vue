<template>
<div class="x-menu" :class="{vertical}">
    <slot></slot>
</div>
</template>

<script>
    export default {
        name: "x-menu",
        props:{
            selected:{
                type:Array,
                default:()=>[]
            },
            single:{
                type: Boolean,
                default:true
            },
            vertical:{
                type: Boolean,
                default:false
            }
        },
        data(){
          return {
              items:[],
              selectedArr:[]
          }
        },
        provide(){
          return {
              root:this
          }
        },
         mounted(){
                 this.tellChilcVertical()
                 this.updateChild()
                 this.watchChild()
         },
        updated(){
           this.updateChild()
        },
        methods:{
            addItem(vm){
               this.items.push(vm)
            },
          updateChild(){
              this.items.forEach(vm=>{
                  if(this.selected.indexOf(vm.name)>-1){
                      vm.selected = true
                  }else{
                      vm.selected = false
                  }
              })
          },
            watchChild(){
                this.items.forEach(vm=>{
                    vm.$on('update:selected',name=>{
                        if(this.single){
                            this.$emit('update:selected',[name])
                        }else{
                            if(this.selected.indexOf(name)<0){
                                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                                selectedCopy.push(name)
                                this.$emit('update:selected',selectedCopy)
                            }
                        }
                    })
                })
            },
            tellChilcVertical(){
                if(this.vertical){
                    this.$children.forEach(child=>{
                        child.vertical = true
                        if(child.$options.name==='x-sub-menu'){
                            child.tellChilcVertical()
                        }
                    })
                }
            }
        },

    }
</script>

<style scoped lang="scss">
.x-menu{
    display: flex;
    opacity: 0.6;
    transition: .3s all ease-in;
    border-bottom: 1px solid #e6e6e6;
    color: #515a6e;
    &:hover{
        opacity: 1;
    }
    &.vertical{
        max-width: 15em;
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        border-bottom: none;
        border-right: 1px solid #e6e6e6;
    }
}
</style>
