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
        name: "g-slider",
        data(){
            return {
                hide:false
            }
        },
        methods:{
            enter: function (el, done) {

                done()
            },
            leave: function (el, done) {

                done()
            },
        }
    }
</script>

<style scoped lang="scss">
            .slider{

            }
            .fade-enter-active, .fade-leave-active {
                transition: all .5s;
            }

</style>
