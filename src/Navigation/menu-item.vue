<template>
<div class="x-menu-item" :class="{active:selected,vertical}" @click="onClick">
    <slot></slot>
</div>
</template>

<script>
    export default {
        name: "x-menu-item",
        inject:['root'],
        created(){
          this.root.addItem(this)
        },
        beforeDestroy(){
          clearTimeout(this.timer)
        },
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                selected:false,
                vertical:false
            }
        },
        methods:{
            onClick(){
                this.root.selectedArr=[]
                this.$emit('update:selected',this.name)
                let judge = this.$parent.$el.classList.contains('x-sub-menu')
                if(judge){
                    this.root.selectedArr=[]
                    this.root.selectedArr.unshift(this.name)
                    this.tellParents(this)
                    this.$parent.childClosePopover()
                }
            },
            tellParents(that){
                if(that.$parent.$parent.$options.name==='x-sub-menu'){
                    this.root.selectedArr.unshift(that.$parent.name)
                    this.tellParents(that.$parent)
                }else{
                    this.root.selectedArr.unshift(that.$parent.name)
                    console.log(this.root.selectedArr)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
            .x-menu-item{
                position: relative;
                padding: 10px 20px;
                transition: .3s width ease-in-out;
                text-overflow: ellipsis;
                overflow: hidden;

                &:hover{
                    cursor: pointer;
                }

                &.active{
                    color:#409eff;
                    &:after{
                        left: 0;
                        width: 100%;
                    }
                }
                &:after{
                    content: "";
                    width: 0;
                    height: 1px;
                    border-bottom:2px solid #409eff;
                    position: absolute;
                    bottom: 1%;
                    left: 50%;
                    transition: all .3s ease-in-out;
                }
                &.vertical{
                    font-size: 17px;
                    padding: 15px 4em 15px 20px;
                    &.active{
                        color:#409eff;
                        background-color: #eefbfa;
                        &:after{
                            left: 0;
                            width: 100%;
                        }
                        &:after{
                            content: "";
                            width: 0;
                            height: 1px;
                            border-bottom:none;
                            position: absolute;
                            bottom: 1%;
                            left: 50%;
                            transition: all .3s ease-in-out;
                        }
                    }

                }
            }
</style>
