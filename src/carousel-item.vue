<template>
  <transition @before-enter="beforeEnter"
              @leave="leave"
              name="slide"
  >
    <div class="carousel-item" v-if="visible" :class="{reverse}">
        <slot></slot>
    </div>
</transition>
</template>

<script>
    export default {
        name: "carousel-item",
        props:{
          name:{
              type:String,
              required:true
          }
        },
        data(){
            return{
                selected:null,
                reverse:false,
                duration:.6
            }
        },
        computed:{
            visible(){
                return this.selected === this.name
            }
        },
        mounted(){
          this.$parent.duration = this.duration
        },
        methods:{
            beforeEnter(el) {
                el.style.transition = `${this.duration}s all ease-in-out`
            },
            leave(el) {
                el.style.transition = `${this.duration}s all ease-in-out`
            },
        }
    }
</script>

<style scoped lang="scss">
    .slide-leave-active {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .slide-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    .slide-enter.reverse {
        transform: translateX(-100%);
        opacity: 0;
    }
    .slide-leave-to {
        transform: translateX(-100%) scale(0.5);
        opacity: 0;
    }
    .slide-leave-to.reverse {
        transform: translateX(100%) scale(0.5);
        opacity: 0;
    }
    .carousel-item{

    }
</style>

