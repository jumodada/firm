<template>
    <div class="firm-main-card">
        <div class="parting"></div>
        <span class="mark"></span>
        <div :class="{active:isActive}" class="description" ref="description">
            一个基于Vue2.0的PC端组件库
        </div>
        <div class="card-group">
            <div class="card-group-item">
                <div class="card-group-item-title">
                    <x-icon font-size="60" name="compass"></x-icon>
                </div>
                <div class="card-group-item-content">

                </div>
            </div>
            <div class="card-group-item"></div>
            <div class="card-group-item"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        data() {
            return {
                isActive: false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/styles/color-select";

    .description {
        color: $brand1-1;
        margin-top: 30px;
        font-size: 30px;
        opacity: 0;
        transition: all .3s ease-out;
    }

    .active {
        opacity: 1;
        transform: translateY(10px);
        transition-delay: .3s;
    }

    .firm-main-card {
        height: 1000px;
        background-color: $brand1-2;
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
            &-item{
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 300px;
                height: 450px;
                border: 1px solid $text1-1;
                background-color: white;
                border-radius: 10px;
                transition: .35s all ease;
                cursor: pointer;
                &:not(:first-child){
                    margin-left: 3rem;
                }
                &:hover{
                    box-shadow: 3px 0 4px 2px rgba(0,0,0,0.15);
                    transform: scale(1.01);
                }
                &-title{
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        .mark {
            margin-top: 30px;
            padding: 3px 30px;
            max-width: 0;
            height: 20px;
            border-radius: 12px;
            background-image: -webkit-gradient(linear, left top, right top, from(#ffd200), to(#c34ccc));
            background-image: linear-gradient(90deg, #ffd200 0%, #c34ccc 100%);
        }
    }
</style>
