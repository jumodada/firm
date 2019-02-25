<template>
<div v-if="active">
    <slot></slot>
</div>
</template>

<script>
    export default {
        name: "g-tabs-panel",
        inject:['eventBus'],
        data(){
            return {
                active:false
            }
        },
        props:{
            name:{
                type: Number|String,
                required:true
            }
        },
        created(){
            if(!this.eventBus)return
            this.eventBus.$on('update:selected',(name)=>{
                this.active = name === this.name;
            })
        },
    }
</script>

<style scoped>

</style>
