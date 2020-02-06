<template>
<div class="x-menu"
     ref="menu"
     :class="{vertical}"
     @mouseleave="fadeOut"
     @mouseenter="fadeIn"
     :style="{backgroundColor:backGroundColor,color:textColor}">
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
            },
            backGroundColor:{
                type: String,
            },
            textColor:{
                type: String,
            },
            activeColor:{
                type:String
            },
            activeBackGroundColor:{
                type:String
            },
            opacity:{
                type:Boolean,
                default:false
            }
        },
        data(){
          return {
              items:[],
              selectedArr:[],
          }
        },
        provide(){
          return {
              root:this
          }
        },
         mounted(){
                 this.isOpacity()
                 this.tellChildrenColor()
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
                    vm.$on('menuItemUpdate',name=>{
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
            },
            tellChildrenColor(){
                if(this.textColor&&this.backGroundColor&&this.activeColor){
                    this.$children.forEach(child=>{
                        child.textColor = this.textColor
                        child.changeXianColor(this.activeColor)
                        if(this.activeColor){
                            child.activeColor = this.activeColor
                        }
                        if(this.activeBackGroundColor){
                            child.activeBackGroundColor = this.activeBackGroundColor
                        }
                        if(child.$options.name==='x-sub-menu'){
                            child.tellChildrenColor(this.backGroundColor)
                            if(this.backGroundColor){
                                child.backGroundColor=this.backGroundColor
                            }
                        }
                    })
                }
            },
            isOpacity(){
                if(!this.opacity)return
                this.$refs.menu.style.opacity = .7
            },
            fadeIn(){
                if(!this.opacity)return
                this.$refs.menu.style.opacity = 1
            },
            fadeOut(){
                if(!this.opacity)return
                this.$refs.menu.style.opacity = .7
            }
        },

    }
</script>

<style scoped lang="scss">
.x-menu{
    display: flex;
    transition: .3s all ease-in;
    border-bottom: 1px solid #e6e6e6;
    color: #515a6e;

    &:first-child{
        padding-left: 40px;
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
