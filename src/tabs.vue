<template>
    <div class="tabs-header">

            <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-tabs",
        props:{
            selected:{
                type:String,
                // required:true
            },
            direction:{
                type: String,
                default:'horizontal',
                validator(val){
                    return ['horizontal','vertical'].indexOf(val)>-1
                }
            }
        },
        created(){
            // this.$emit('update:selected','xxx')
        }
    }
</script>

<style scoped lang="scss">
.tabs-header{

}
</style>
