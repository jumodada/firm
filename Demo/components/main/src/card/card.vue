<template>
    <div class="firm-main-card">
        <div class="parting"></div>
        <span class="mark"></span>
        <div :class="{active:isActive}" class="description" ref="description">
            一个基于Vue2.0的PC端组件库
        </div>
        <div class="card-group">
            <cardCompass></cardCompass>
            <cardComponent></cardComponent>
            <cardConcat></cardConcat>
        </div>
    </div>
</template>

<script>
    import cardComponent from './card-components'
    import cardCompass from './card-compass'
    import cardConcat from './card-concat'
    export default {
        name: "card",
        components:{
            cardComponent,
            cardCompass,
            cardConcat
        },
        data() {
            return {
                isActive: false,
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/styles/color-select";
    .description {
        color: $brand1-2;
        margin-top: 30px;
        font-size: 30px;
        opacity: 0;
        transition: all .3s ease-out;
    }
    .firm-main-card{
        height: 1000px;
        background-color: $brand1-1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .parting {
            width: 100%;
            height: 30px;

            &::after {
                content: '';
                display: block;
                position: relative;
                margin: 0;
                padding-bottom: 3%;
                background-color: $brand1-1;
                border-radius: 0 100% 50% 50% / 0% 0% 100% 100%;
                background-size: cover;
                z-index: 100;
            }
        }
        .card-group {
            display: flex;
            justify-content: center;
            margin-top: 50px;

        }
    }
    .active {
        opacity: 1;
        transform: translateY(10px);
        transition-delay: .3s;
    }

</style>
