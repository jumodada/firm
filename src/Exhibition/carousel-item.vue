<template>
  <transition @before-enter="beforeEnter"
              @leave="leave"
              name="slide"
  >
    <div class="carousel-item"
         ref="carousel"
         v-if="visible" @click="bounce"
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
                duration:.5,
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
               if(this.card){
                   if(!this.reverse){
                       el.style.transform = 'translateX(-30%) scale(0.6)'
                   }else{
                       el.style.transform = ' translateX(-30%) scale(0.6)'
                   }
                   el.style.opacity= 0
               }
                el.style.transition = `${this.duration}s all`
            },
            bounce(){
                let [direction,index] = [this.exhibitionStyle.slice(9,16),this.$parent.selectedIndex]
               if(direction==='left'){
                   this.$parent.goBack(index,'back')
               }else if(direction==='right'){
                   this.$parent.goBack(index,'go')
               }
            }
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
    cursor: pointer;
    &.position-left{
      width: 50%;
      position: absolute;
      top: 0;
      left: -10px;
      transform:scale(0.82);
    }
    &.position-main{
      width: 50%;
      transform: translateX(50%);
      position: relative;
      z-index: 3;
    }
    &.position-right{
      transform: translateX(100%) scale(0.82);
      width: 50%;
      position: absolute;
      top: 0;
      left: 10px;
    }
  }
</style>
