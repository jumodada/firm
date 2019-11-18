<style lang="scss" scoped>
    .demo-card-wrapper {
        width: 60vw;
        margin-left: 21px;
        display: inline-flex;
        flex-direction: column;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        .demo-card-source {
            padding: 33px 23px;
        }
        .demo-card-drop{
            height: 40px;
            width: 100%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .3s transform ease-in-out;
            &:hover{
                transform: translateY(7px);
            }
            &-icon{
                transition: .32s transform ease;
            }
            .icon-reverse{
                transform: rotate(180deg);
            }
            &-down{
                transition: .4s all;
                width: 100%;
                min-height: 50px;

            }
        }
    }
</style>


<template>
    <div class="demo-card-wrapper">
        <div class="demo-card-source">
            <slot name="source"></slot>
        </div>
       <transition @before-enter="beforeEnter"
                   @enter="enter"
                   @before-leave="beforeLeave"
                   @leave="leave">
           <div class="demo-card-drop-down" v-show="dropDownShow">
               <slot></slot>
           </div>
       </transition>
        <div class="demo-card-drop" @click="dropDownShow=!dropDownShow">
            <x-icon :class="{'icon-reverse':dropDownShow}" class="demo-card-drop-icon"
                    name="xia" color="#B1B1B1"></x-icon>
        </div>
        <x-collapse>
            <x-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </x-collapse-item>
        </x-collapse>
    </div>
</template>

<script>
    export default {
        name: 'demo-card',
        data() {
            return {
                dropDownShow:false
            }
        },
        methods:{
            beforeEnter(el) {
                el.style.overflow = 'hidden'
                el.style.transition = '.4s all'
                el.transition = '.4s all'
                el.style.height = 0
            },
            enter(el,done) {
                setTimeout(() => {
                    el.style.height = ''
                    done()
                }, 30)
            },
            leave(el,done) {
                setTimeout(() => {
                    el.style.height = ''
                    el.style.overflow = 'hidden'
                    done()
                }, 30)
            },
            beforeLeave(el) {
                el.style.height = 0
                el.style.overflow = ''
            },
        }
    }
</script>
