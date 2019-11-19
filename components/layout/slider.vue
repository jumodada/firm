<template>
    <transition name="fade">
        <div class="slider" v-if="!hide">
            <slot></slot>
            <button @click="hide=!hide">隐藏</button>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "f-slider",
        data() {
            return {
                hide: false
            }
        },

    }
</script>

<style scoped lang="scss">
    .slider {

    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }

</style>
