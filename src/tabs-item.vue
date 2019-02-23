<template>
<div>
    <slot></slot>
</div>
</template>

<script>
    export default {
        name: "g-tabs-item",
        props:{
            disabled:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>

</style>
