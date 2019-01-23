<template>
    <svg class="icon">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>

<script>
    export default {
        name: "icon",
        props:['name']
    }
</script>

<style scoped lang="scss">
    .icon {
        width: 1em;
        height: 1em;
    }
</style>
