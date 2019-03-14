<template>
<div class="x-content">
<slot></slot>
</div>
</template>

<script>
    export default {
        name: "x-Content"
    }
</script>

<style scoped lang="scss">
        .x-content{
                flex-grow: 1;
        }
</style>
