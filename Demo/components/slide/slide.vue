<template>
    <div class="firm-slider">

    </div>
</template>

<script>
    import routes from '../../router'
    export default {
        name: "slide",
        mounted() {
            console.log(routes)
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/color-select";
    @import "../../assets/styles/shadow-select";
    .firm-slider{
        width: 240px;
        height: calc(100vh - 70px);
        box-shadow: $shadow-right-black;
        background-color: $brand1-3;
    }
</style>
