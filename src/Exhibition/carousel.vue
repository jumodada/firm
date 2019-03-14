<template>
  <div class="x-carousel"
       @mouseleave="hoveroutListener"
       @mouseenter="hoverinListener"

  >
    <div class="x-carousel-window">
      <div class="x-carousel-wrapper">
                 <span @click="goBack(selectedIndex,'back')">
                 <x-icon  name="left" class="x-icon x-icon-left" color="#f49303">后退</x-icon>
                 </span>
        <span @click="goBack(selectedIndex,'go')" class="x-carousel-icon-right">
                <x-icon  name="right" class="x-icon x-icon-right" color="#f49303">前进</x-icon>
                 </span>
        <slot></slot>
      </div>
    </div>
    <div class="x-carousel-button-group">
      <button
              @mouseenter="hoverSelected(index-1)"
              @click="clickSelected(index-1)" class="x-carousel-button" v-for="index in childrenLength" :class="{active:selectedIndex===index-1}">
      </button>
    </div>

  </div>
</template>

<script>
    import Icon from '../currency/icon'
    import CarouselItem from './carousel-item'
    export default {
        name: "carousel",
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type: Boolean,
                default:true
            },
            toHover:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelected:null,
                hasTimer:true,
                autoTimerDuration:2000
            }
        },
        components:{
            'x-carousel-item':CarouselItem,
            'x-icon':Icon
        },
        mounted(){
            this.lastSelected = this.selected
            this.computedNumbers()
            this.updateChildrens(this.selected)
            this.automationPlay()
        },
        updated(){
            this.updateChildrens(this.selected)
        },
        beforeDestroy(){
            clearInterval(this.timer2)
        },
        computed:{
            selectedIndex(){
                return this.names.indexOf(this.selected) ||0
            },
            names(){
                return this.nameItems.map(vm=>vm.name)
            },
            nameItems(){
                return this.$children.filter(child=>child.$options.name==='carousel-item')
            }
        },
        methods:{
            computedNumbers(){
                this.childrenLength = this.$children.filter(child=>child.$options.name==='carousel-item').length
            },
            automationPlay(){
                clearTimeout(this.timer)
                let run = () => {
                    this.autoIndex = this.names.indexOf(this.getSelected())
                    this.autoIndex++
                    if(this.autoIndex===this.names.length){
                        this.autoIndex=0
                    }
                    this.autoPlaySelected(this.autoIndex)
                    this.timer = setTimeout(run,this.autoTimerDuration)
                }
                this.timer = setTimeout(run,this.autoTimerDuration)
            },
            updateChildrens(){
                let selected = this.getSelected()
                this.nameItems.forEach(vm=>{
                    let reverse =this.selectedIndex > this.lastSelected?false:true
                    if(this.lastSelected===this.nameItems.length-1&&this.selectedIndex===0&&this.hasTimer){
                        reverse = false
                    }
                    if(this.lastSelected===0&&this.selectedIndex===this.nameItems.length-1&&this.hasTimer){
                        reverse = true
                    }
                    vm.reverse = reverse
                    this.$nextTick(()=>{
                        vm.selected = selected
                    })
                })
            },
            getSelected(){
                let first = this.nameItems[0]
                return   this.selected || first.name
            },
            clickSelected(index){
                if(this.toHover)return
                clearInterval(this.timer2)
                if(this.selectedIndex===index)return
                this.hoverinListener()
                this.lastSelected= this.selectedIndex
                this.forwardAndBack(this.lastSelected,index)
            },
            hoverSelected(index){
                if(!this.toHover)return
                clearInterval(this.timer2)
                if(this.selectedIndex===index)return
                this.hoverinListener()
                this.lastSelected= this.selectedIndex
                this.forwardAndBack(this.lastSelected,index)
            },
            autoPlaySelected(index){
                this.lastSelected= this.selectedIndex
                this.$emit('update:selected',this.names[index])
            },
            hoverinListener(){
                clearInterval(this.timer)
                this.hasTimer = false
            },
            hoveroutListener(){
                this.automationPlay()
                this.hasTimer = true
                let duration= .6
                this.duration=.6
                this.nameItems.forEach(vm=>vm.duration=duration)
            },
            clearAndSet(){
                let durationTime = .6
                clearInterval(this.timer2)
                setTimeout(()=>{
                    this.nameItems.forEach(vm=>vm.duration=durationTime)
                    this.duration=durationTime
                })
            },
            forwardAndBack(oldVal,newVal){
                let num
                let duration
                let theIndex
                let oldIndex =oldVal
                let newIndex =newVal
                let animationDuration = 500
                num= oldIndex-newIndex
                if(oldIndex>newIndex){
                    duration  = this.duration /num
                    theIndex = oldIndex-1
                }else{
                    duration  = -this.duration /num
                    theIndex = oldIndex+1
                }
                this.duration = duration
                this.nameItems.forEach(vm=>vm.duration=duration)
                this.$emit('update:selected',this.names[theIndex])
                if(theIndex===newIndex)return
                this.timer2 = setInterval(()=>{
                    if(theIndex===newIndex){
                        this.clearAndSet()
                    }
                    this.$emit('update:selected',this.names[theIndex])
                    oldIndex>newIndex?theIndex--:theIndex++
                },duration*animationDuration)
            },
            goBack(index,goOrback){
                this.hasTimer = true
                if(goOrback==='go'){
                    index++
                    if(index===this.names.length){
                        index=0
                    }
                }else{
                    index--
                    if(index===-1){
                        index=this.names.length-1
                    }
                }
                let duration=.2
                this.nameItems.forEach(vm=>vm.duration=duration)
                this.lastSelected= this.selectedIndex
                this.$emit('update:selected',this.names[index])
            },
        }
    }
</script>

<style scoped lang="scss">
  .x-carousel{
    .x-icon{
      width: 3em;
      height: 3em;
      opacity: 0;
      transition: all .4s ease-in-out;
      z-index: 10;
      cursor: pointer;
      &:hover{
        opacity: 1;
        cursor: pointer;
      }
    }
    &:hover{
      .x-icon-right{
        opacity: 1;
        transform: translateY(-50%) translateX(-100%);
      }
      .x-icon-left{
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }
      .x-carousel-button-group{
        opacity: 1;
        transform: translateY(0);
      }
    }
    &-window{
      .x-icon-left{
        position: absolute;
        top: 50%;
        opacity: 0;
        transform: translateY(-50%) translateX(-100%);
      }
      .x-icon-right{
        position: absolute;
        top: 50%;
        left: 100%;
        opacity: 0;
        transform: translateY(-50%) translateX(0%);
      }
    }
    &-wrapper{
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    .x-carousel-button-group{
      opacity: 0;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .4s ease-in-out;
      transform: translateY(700%);
      .x-carousel-button{
        padding: 0;
        position: relative;
        top: -3em;
        margin: 0 .5em;
        height: 6px;
        border:1px solid #eeeeee;
        outline: none;
        width: 3em;
        border-radius: 4px;
        transition: all .6s;
        opacity: 0.6;
        cursor: pointer;
        &:hover{
          border:1px solid #ef6c14;
          opacity: 0.1;
        }
      }
      .active{
        background-color: #ef6c14;
        border:1px solid #ef6c14;
      }
    }
  }
</style>
