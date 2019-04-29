<template>
    <svg class="x-icon" @click="$emit('click',$event)"  :style="`fill:${color}`" :class="{loading:loading}">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>

</template>

<script>
    import '../svg.js'
    export default {
        name: "x-icon",
        props:{
            name,
            color:{
                type:String
            },
            loading:{
                type: Boolean,
                default:false
            }
            }
    }
</script>

<style scoped lang="scss">
    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .x-icon {
        width: 1em;
        height: 1em;
        &.loading{
            animation: spin 1s infinite linear;
        }
    }
</style>
