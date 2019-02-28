<template>
     <div class="x-button-group">
         <slot></slot>
     </div>
</template>

<script>
    export default {
        name: "button-group",
        mounted(){
            console.log(this.$el.children)
            Object.keys(this.$el.children).forEach(index=>{
               let nodeName =  this.$el.children[index].nodeName
                if(nodeName.toLowerCase() !== 'button'){
                    console.error('x-button-group的子元素应该全是x-button')
                }
            })
        }
    }
</script>

<style scoped lang="scss">
.x-button-group{
    display: inline-flex;
    vertical-align: center;
    > .x-button{
        border-radius: 0;
        &:not(:first-child){
            margin-left: -1px;
        }
        &:first-child{
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
        }
        &:last-child{
            border-top-right-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
        }
        &:hover{
            border-color: #ef6c14;
            position:relative;
            z-index: 1;
        }
    }
}
</style>
