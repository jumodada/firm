<template>
    <svg class="icon" :style="`fill:${color}`">

        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>

<script>
    import './svg.js'
    export default {
        name: "g-icon",
        props:['name','color']
    }
</script>

<style scoped lang="scss">
    .icon {
        width: 1em;
        height: 1em;
    }
</style>
