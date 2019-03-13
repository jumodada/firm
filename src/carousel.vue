<template>
<div class="x-slides"
     @mouseleave="hoveroutListener"
     @mouseenter="hoverinListener"

>
    <div class="x-slides-window">
        <div class="x-slides-wrapper">
            <slot></slot>
        </div>
    </div>
    <span  @click="clickSelected(index-1)" v-for="index in childrenLength" :class="{active:selectedIndex===index-1}">
        {{index}}
    </span>

</div>
</template>

<script>
    import CarouselItem from './cascader-item'
    export default {
        name: "slides",
        props:{
          selected:{
              type:String
          },
            autoPlay:{
                type: Boolean,
                default:true
            }
        },
        data(){
          return{
              childrenLength:0,
              lastSelected:null,
              hasTimer:true
          }
        },
        components:{
            'x-carousel-item':CarouselItem
        },
        mounted(){
            this.lastSelected = this.selected
            this.childrenLength = this.$children.length
            this.updateChildrens(this.selected)
            this.automationPlay()
        },
        updated(){
            this.updateChildrens(this.selected)
        },
        computed:{
          selectedIndex(){
              return this.names.indexOf(this.selected) ||0
          },
            names(){
              return this.$children.map(vm=>vm.name)
            }
        },
        methods:{
            automationPlay(){
                this.timer&&clearInterval(this.timer)
                this.timer = setInterval(()=>{
                   let index = this.names.indexOf(this.getSelected())
                   index++
                   if(index===this.names.length){
                       index=0
                   }
                   // index--
                   // if(index===-1){
                   //     index=this.names.length-1
                   // }
                   this.autoPlaySelected(index)
               },2000)
            },
            updateChildrens(){

                    let selected = this.getSelected()
                    this.$children.forEach(vm=>{
                     let reverse =this.selectedIndex > this.lastSelected?false:true
                      if(this.lastSelected===this.$children.length-1&&this.selectedIndex===0&&this.hasTimer){
                            reverse = false
                       }
                      if(this.lastSelected===0&&this.selectedIndex===this.$children.length-1&&this.hasTimer){
                      reverse = true
                      }
                      vm.reverse = reverse
                      this.$nextTick(()=>{
                      vm.selected = selected
                      })
                })
            },
            getSelected(){
                let first = this.$children[0]
                return   this.selected || first.name
            },
            clickSelected(index){
                this.duration=0.6
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
            },
            clearAndSet(){
                let durationTime = .6
                clearInterval(this.timer2)
                setTimeout(()=>{
                    this.$children.forEach(vm=>vm.duration=durationTime)
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
                this.$children.forEach(vm=>vm.duration=duration)
                this.$emit('update:selected',this.names[theIndex])
                if(theIndex===newIndex)return
                this.timer2 = setInterval(()=>{
                    if(theIndex===newIndex){
                        this.clearAndSet()
                    }
                    this.$emit('update:selected',this.names[theIndex])
                    oldIndex>newIndex?theIndex--:theIndex++
                },duration*animationDuration)
            }

        }
    }
</script>

<style scoped lang="scss">
        .x-slides{
            &-window{

            }
            &-wrapper{
                position: relative;
                overflow: hidden;
                width: 100%;
            }
            .active{
                color:red
            }
        }
</style>
