<template>
    <div class="header">
        <div class="header-brand">
            <x-icon color="white" font-size="30" name="F"></x-icon>
        </div>
        <div class="header-nav">
            <x-icon color="white" name="left"></x-icon>
            <router-link class="header-nav-item" :to="'/'" v-for="(item,index) in routerItems" :key="index">
                {{item}}
            </router-link>
            <x-icon color="white" name="right"></x-icon>
        </div>
        <div class="header-angle">
            <x-icon color="white" font-size="35px" class="header-angle-icon" name="github1"></x-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                routerItems: ['首页', '组件', '指南']
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/styles/color-select";

    .header {
        position: relative;
        background-color: $brand1-1;
        z-index: 9999;
        width: 100%;
        padding:19px;
        display: flex;
        align-items: center;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        &-brand {
            cursor: pointer;
            float: left;
        }

        &-nav {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            text-align: end;
            margin-right: 120px;
            &-item {
                margin-left: 15px;
                margin-right: 15px;
                color: white;
                cursor: pointer;
                text-decoration: none;
                &::after {
                    position: absolute;
                    display: block;
                    content: '';
                    width: 33px;
                    height: 2px;
                    background-color: white;
                    transition: all .2s;
                    opacity: 0;
                }

                &:hover {
                    &::after {
                        transform: translateY(2px);
                        opacity: 1;
                    }
                }
            }
        }
        &-angle{
            position: absolute;
            right: 0;
            top: 0;
            width: 120px;
            height: 120px;
            border-width: 60px;
            border-style: solid;
            border-color:#1d2022 #1d2022 #313639 #313639;
            background-color: white;
            &-icon{
                cursor: pointer;
                position: absolute;
                top: -40px;
                transform: rotate(45deg);
                transition: .25s all ease;
                &:hover{
                    transform: rotate(56deg) scale(1.05);
                }
            }
        }
    }
</style>
