<template>
    <div class="firm-components-page">
        <slider></slider>
       <router-view></router-view>
    </div>
</template>

<script>
    import slider from '../slide'
    export default {
        name: "components",
        components:{
            slider
        }
    }
</script>

<style scoped lang="scss">
    .firm-components-page{
        display: flex;
    }
</style>
