<template>
            <transition
                    name="slide"
            >
                <div class="tabs-item"
                     :class="{disabled:disabled,reverse:isReverse}"
                     v-if="parseInt(active)===parseInt(name)">
                    <slot></slot>
                </div>
            </transition>
</template>

<script>
    export default {
        name: "xTabs-item",
        props:{
            item:{
                type:String,
                required: true
            },
            name:{
                type: String|Number,
                required: true
            },
            disabled:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return {
               active:null,
                isReverse:false

            }
        },
        created(){
             this.$parent.headerClass.push(this.item)
             this.$parent.disabledClass[this.name] = this.disabled
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
    .tabs-item{
        transition: .4s all ease-in-out;
    }
</style>
