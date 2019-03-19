<template>
<div class="x-menu-item" :class="{active:selected}" @click="onClick">
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
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                selected:false
            }
        },
        methods:{
            onClick(){
                this.$emit('update:selected',this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
            .x-menu-item{
                position: relative;
                padding: 10px 20px;
                transition: .3s width ease-in-out;
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
            }
</style>
