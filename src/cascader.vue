<template>
    <div class="cascader">
        <div class="trigger"
             :class="`size-${size}`"
             @click="onClick" ref="trigger">
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
                        :dynamic="dynamic"
                        :size="size"
                        @update:selected="onUpdateSelected"
                        v-show="popoverVisible"
                        :popoverVisible="popoverVisible">
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
                type: String,
                default:'medium',
                validator(val){
                    return ['big','medium','small'].indexOf(val)>-1
                }
            },
            selected:{
                type:Array,
                default:()=>[]
            },
            dynamic:{
                type:Boolean,
                default:false
            },
            loadData:{
                type:Function
            },
            selectToChange:{
                type:Boolean,
                default:false
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
                if(newSelected[newSelected.length-2]&& newSelected[newSelected.length-2].isLeaf  ||newSelected[newSelected.length-1]&& newSelected[newSelected.length-1].isLeaf)return//树叶不走这条路
                if(this.loadData){
                    let newSelectedCopy = JSON.parse(JSON.stringify(newSelected))
                    let lastItem = newSelectedCopy[newSelectedCopy.length-1]
                    let itemInSource = []
                    newSelectedCopy.forEach(item=>{
                       if(itemInSource.length===0){
                          this.source.forEach(child=>{
                                if(child.name===item.name){
                                    itemInSource.push(child)
                                }
                          })
                       }else{
                          if(itemInSource[0].children){
                              itemInSource[0].children.forEach(childItem=>{
                                  if(childItem.name===item.name){
                                      itemInSource.pop()
                                      itemInSource.push(childItem)
                                  }
                              })
                          }
                       }
                    })
                    let updateSource = res=>{
                        if(!this.popoverVisible)return
                         let itemSource= itemInSource[0]
                        if(this.dynamic &&this.popoverVisible){
                            let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                            if(selectedCopy[selectedCopy.length-1] && selectedCopy[selectedCopy.length-1].iconToggle){    //避免提前关闭造成的bug
                                selectedCopy[selectedCopy.length-1].iconToggle = ''
                                this.$emit('update:selected',selectedCopy)
                            }
                        }
                        if(res.length>=1){
                            this.$set(itemSource,'children',res)
                        }else{
                            let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                            selectedCopy.push('$#end')                             //这段后面可以废弃掉的
                            this.$emit('update:selected',selectedCopy)
                            this.$nextTick(()=>{
                                this.close()

                            })
                        }
                    }
                     this.loadData(lastItem,updateSource)
                }
            },
            close(){
                let length = this.selected.length
                if(!this.selectToChange){
                    if(this.selected[length-1]==='$#end' ||this.showSelected.length){
                        if(this.showSelected.length &&this.selected[length-1]!=='$#end'){
                            this.$emit('update:selected',this.selectedCopy)
                        }
                    }else{
                        this.selectedCopy = []
                        this.$emit('update:selected',this.selectedCopy) //没选完就给空
                    }
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
                document.removeEventListener('mouseenter',this.mouseenterFn)
                document.removeEventListener('mouseleave',this.mouseleaveFn)
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
            },
        },
        computed:{
            selectedArray(){
                     let length = this.selected.length
                    if(!this.selectToChange){
                       if(this.selected[length-1]==='$#end'){
                           this.close()
                           let arr = this.selected.map((item=>item.name))
                           let deleteUndefined = []
                           arr.forEach(item=>{
                               if(item){
                                   deleteUndefined.push(item)                 //在trigger上显示
                               }
                           })
                           this.showSelected = deleteUndefined.join(' /')
                           return this.showSelected
                       }
                       else{
                           return this.showSelected
                       }
                   }else{
                       let arr = this.selected.map((item=>item.name))    //选择既改变
                       if(!arr[arr.length-1]){
                           arr.pop()
                       }
                       this.showSelected = arr.join(' /')
                        if(this.selected[this.selected.length-1]&&this.selected[this.selected.length-1]==='$#end'){
                            this.close()
                        }
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
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            &:hover{
                cursor: pointer;
            }
            &.size-big{
                height: 35px;
                width: 240px;
                font-size: 16px;
                padding: 0.35em 1.1em;
            }
            &.size-small{
                height: 27px;
                width: 200px;
                font-size: 12px;
                padding: 0.3em 1em;
            }
            .icon-span{
                margin-left: auto;
                display:flex;
                justify-content: center;
                align-items: center;
                .trigger-x-icon-xia{
                    display: inline-flex;
                    transition: all .3s ease;
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



