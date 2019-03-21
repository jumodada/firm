<template>
    <div class="x-menu-item-group">
        <template>
           <div class="item-group-title">
               <slot name="title"></slot>
           </div>
        </template>
        <slot>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "x-menu-item-group",
        props:{
            name:{
                type:String
            }
        },
        data(){
            return {
                vertical:false,
                textColor:null,
                activeColor:null,
                activeBackGroundColor:null,
            }
        },
        methods:{
            childClosePopover(){
                if(this.$parent.$options.name==='x-sub-menu'){
                    this.open = false
                    this.$parent.childClosePopover()
                }
            },
            tellChilcVertical(){
                this.$children.forEach(child=>{
                    child.vertical = true
                    if(child.$options.name==='x-sub-menu'||child.$options.name==='x-menu-item-group'){
                        child.tellChilcVertical()
                    }
                })
            },
            tellChildrenColor(bc){
                this.$children.forEach(child=>{
                    if(this.activeColor){
                        child.activeColor = this.activeColor
                    }
                    if(this.activeBackGroundColor){
                        child.activeBackGroundColor = this.activeBackGroundColor
                    }
                    child.textColor = this.textColor
                    if(child.$options.name==='x-sub-menu'){
                        child.tellChildrenColor(bc)
                        if(bc){
                            child.backGroundColor= bc
                        }
                    }
                    if(child.$options.name==='x-menu-item-group'){
                        child.tellChildrenColor(bc)
                        if(bc){
                            child.backGroundColor= bc
                        }
                    }

                })
            },
        }
    }
</script>

<style scoped lang="scss">
            .x-menu-item-group{
                .item-group-title{
                    padding: 5px 10px;
                    font-size: 13px;
                    margin-left: 20px;
                    color: #999999;
                }
            }
</style>
