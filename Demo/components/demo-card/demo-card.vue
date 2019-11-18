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
                transition: .23s transform ease;
            }
            &-down{
                transition: .23s all ease-in-out;
                width: 100%;
            }
        }
        .icon-reverse{
            transform: rotate(180deg);
            &:hover{
                transform: rotate(180deg) translateY(7px) !important;
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
        <div :class="{'icon-reverse':dropDownShow}" class="demo-card-drop" @click="dropDownShow=!dropDownShow">
            <x-icon class="demo-card-drop-icon"
                    name="xia" color="#B1B1B1"></x-icon>
        </div>
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
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
            },
            enter(el) {
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px'
                }
                el.style.overflow = 'hidden'
            },
            beforeLeave(el) {
                el.style.height = el.scrollHeight + 'px'
                el.style.overflow = 'hidden'
            },
            leave(el) {
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
            },
        }
    }
</script>
