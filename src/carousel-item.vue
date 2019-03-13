<template>
  <transition @before-enter="beforeEnter"
              @enter="enter"
              @before-leave="beforeLeave"
              @leave="leave">
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
                reverse:false
            }
        },
        computed:{
            visible(){
                return this.selected === this.name
            }
        },
        methods:{
            beforeEnter(el) {
                  el.style.opacity = 0
                  el.style.transform ='translateX(100%)'
            },
            enter(el) {
                   el.style.opacity = 1
                   el.style.transform  = 'translateX(0)'
            },
            beforeLeave(el) {
                // el.style.position='absolute'
                // el.style.top= 0
                // el.style.left= 0
                el.style.width='100%'
                el.style.height='100%'
                el.style.opacity = 1
                el.style.transform  = 'translateX(0)'
            },
            leave(el) {
                el.style.opacity = 0
                el.style.transform = 'translateX(-100%) scale(0.5)'
            },
        }
    }
</script>

<style scoped lang="scss">

    .carousel-item{
            transition: 1s all ease-in-out;
    }
</style>
.slide-enter-active, .slide-leave-active {
transition: all .6s;
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
