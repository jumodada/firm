<template>
  <transition @before-enter="beforeEnter"
              @leave="leave"
              name="slide"
  >
    <div class="carousel-item" v-if="visible"
         :class="{reverse,[exhibitionStyle]:card}">
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
            },
        },
        data(){
            return{
                selected:[],
                reverse:false,
                duration:.6,
                card:false,
                childrenLength:0,
                cardSelected:[]
            }
        },
        computed:{
            visible(){
                let selected = Number(this.selected)
                if(this.card){
                    this.cardSelected = [selected-1,selected,selected+1]
                    if(selected===1){
                        this.cardSelected[0]= this.childrenLength
                    }else if(selected===this.childrenLength){
                        this.cardSelected[2]= 1
                    }
                    return this.cardSelected.indexOf(Number(this.name))>-1
                }else{
                    return this.selected.indexOf(this.name)>-1
                }
            },
            exhibitionStyle(){
                let index = this.cardSelected.indexOf(Number(this.name))
                let position = ['left','main','right']
                console.log(`position-${position[index]}`)
                return `position-${position[index]}`
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
    &.position-left{
      width: 50%;
      position: absolute;
      transform:scale(0.82);
    }
    &.position-main{
      color: #e08806;
      width: 50%;
      transform: translateX(50%);
      z-index: 2;
      position: absolute;
    }
    &.position-right{
      color: green;
      transform: translateX(100%) scale(0.82);
      width: 50%;
    }
  }
</style>
