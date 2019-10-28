<template>
    <div class="header">
        <div class="header-brand">
            <x-icon color="white" font-size="70" name="symbol"></x-icon>
        </div>
        <div class="header-nav">
            <x-icon color="white" name="left"></x-icon>
            <router-link class="header-nav-item" :to="'/'" v-for="(item,index) in routerItems" :key="index">
                {{item}}
            </router-link>
            <x-icon color="white" name="right"></x-icon>
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
        background-color: $brand1-1;
        position: fixed;
        top: 0;
        z-index: 9999;
        width: 100%;
        padding: 0 19px;
        display: flex;
        align-items: center;

        &-brand {
            cursor: pointer;
        }

        &-nav {
            position: absolute;
            right: 60px;
            display: inline-flex;
            align-items: center;

            &-item {
                margin-left: 10px;
                margin-right: 10px;
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
    }
</style>
