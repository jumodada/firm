<template>
    <div class="cascader">
        <div class="trigger" @click="onClick" ref="trigger">
            <div class="trigger-text">{{selectedArray}}</div>
              <span class="icon-span" @click="clealAll">
                   <transition name="fade" mode="out-in">
                   <x-icon name="xia" color="#dbdbdb" class="trigger-x-icon-xia"
                           :class="[{rotate:popoverVisible}]"
                           v-if="IconToggle"
                           key="xia"

                   >

                   </x-icon>
                    <x-icon name="wrong" color="#dbdbdb" class="trigger-x-icon-wrong"
                            key="wrong"
                            v-if="!IconToggle">

                    </x-icon>
                </transition>
              </span>
        </div>

        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave"
        >
            <div class="popover-wrapper"
                 v-if="popoverVisible"
                 ref="popoverWrapper">
                <x-cascader-items
                        :items="source" class="popover"
                        :selected="selected"
                        @update:selected="onUpdateSelected"
                        v-show="popoverVisible"
                        :popoverVisible="popoverVisible"
                >
                </x-cascader-items>
            </div>
        </transition>

    </div>
</template>

<script>
    import Icon from './icon'
    import xCascaderItems from './cascader-item'
    export default {
        name: 'x-',
        components: {
            xCascaderItems,
            'x-icon':Icon
        },
        props: {
            source: {
                type: Array
            },
            size:{
                type: String
            },
            selected:{
                type:Array,
                default:()=>[]
            },
        },
        data () {
            return {
                popoverVisible: false,
                showSelected:'',
                IconToggle:true

            }
        },
        mounted(){
            this.mouseenterFn = ()=>{
                if(this.showSelected){
                    this.IconToggle=false
                }
            }
                this.$refs.trigger.addEventListener('mouseenter',this.mouseenterFn)
            this.mouseleaveFn = ()=>{
                this.IconToggle=true

            }
            this.$refs.trigger.addEventListener('mouseleave',this.mouseleaveFn)
        },
        beforeDestroy(){
            this.remvoeListener()
            this.$refs.popoverWrapper && this.$refs.popoverWrapper.remove()
        },
        methods:{
            contentPosition(){
                const {popoverWrapper,trigger} = this.$refs
                document.body.appendChild(popoverWrapper)
                let {top,left,height} = trigger.getBoundingClientRect()
                let x = {
                        top:top + height + window.scrollY,
                        left:left + window.screenX
                }
                popoverWrapper.style.left = x.left + 'px'
                popoverWrapper.style.top = x.top + 'px'
            },
            onClick(){
               if(!this.popoverVisible){
                   this.selectedCopy = JSON.parse(JSON.stringify(this.selected))//假使用户没有选完或者放弃选择，还可以保持之前的popover选择不被更改。
               }
                this.addListener()
                this.popoverVisible =!this.popoverVisible
                if(!this.popoverVisible){
                    this.close()
                }
                if(this.popoverVisible){
                   this.$nextTick(()=>{
                       this.contentPosition()
                   })
                }
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            },
            close(){
                let length = this.selected.length

                if(this.selected[length-1]==='$#end' ||this.showSelected.length){
                    if(this.showSelected.length &&this.selected[length-1]!=='$#end'){
                        this.$emit('update:selected',this.selectedCopy)
                    }
                }else{
                    this.selectedCopy = []
                    this.$emit('update:selected',this.selectedCopy)
                }
                this.popoverVisible =false
                this.remvoeListener()
            },
            addListener(){
                this.fn = e=>{
                    if(e.path.indexOf(this.$refs.popoverWrapper)===-1 && e.path.indexOf(this.$refs.trigger)===-1){
                        this.close()
                    }
                }
                document.addEventListener('click',this.fn)
            },
            remvoeListener(){
                document.removeEventListener('click',this.fn)
            },
            beforeEnter(el) {
                el.style.height = 0
                el.style.overflow = 'hidden'
            },
            enter(el) {
                   this.$nextTick(()=>{
                      let height= el.children[0].children[0].clientHeight
                       el.style.height = height+ 'px'

                   })
            },
            beforeLeave(el) {
                el.style.height = 206 + 'px'
                el.style.overflow = 'hidden'
            },
            leave(el) {
                el.style.height = 0
            },
            clealAll(){
                if(this.showSelected){
                    this.IconToggle =!this.IconToggle
                    this.selectedCopy = []
                    this.$emit('update:selected',this.selectedCopy)
                    this.showSelected = ''
                }
            }

        },
        computed:{
            selectedArray(){
                 let length = this.selected.length

                 if(this.selected[length-1]==='$#end'){
                     this.close()
                    let arr = this.selected.map((item=>item.name))
                     arr.pop()
                     this.showSelected = arr.join(' /')
                     return this.showSelected
                 }else{
                     return this.showSelected
                 }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";

    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
        transform: translateX(100%);
    }
    .cascader {
        .trigger {
            border: 1px solid $border-color;
            height: 32px;
            width: 230px;
            margin: 0;
            padding: 0.3em 1em;
            display: flex;
            align-items: center;
            color: $font-color;
            border-radius: 5px;
            overflow: auto;
            &:hover{
                cursor: pointer;
            }
            .icon-span{
                margin-left: auto;
                display:flex;
                justify-content: center;
                align-items: center;
                .trigger-x-icon-xia{
                    display: inline-flex;
                }
                .trigger-x-icon-wrong{
                    display: inline-flex;
                }
                .rotate{
                    transform: rotate(180deg);
                    transition: .3s all ease;
                }
            }
            .trigger-text{
                transform: rotate(0deg)
            }


        }
    }
    .popover-wrapper {
        position: absolute;
        color:$font-color;
        display: flex;
        transition: all .3s ;
        @extend .box-shadow;
        .popover{

        }
        .label {
            white-space: nowrap;
        }
    }
</style>
