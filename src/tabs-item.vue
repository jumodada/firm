<template>
    <transition  name="bounce">
<div v-if="parseInt(active)===parseInt(name)">
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
               active:null
            }
        },
        created(){

             this.$parent._data.headerClass.push(this.item)
             this.$parent._data.disabledClass[this.name] = this.disabled

        }
    }
</script>

<style scoped lang="scss">
    $animation-duration:0.3s;
    .bounce-enter-active {
        animation: bounce-in $animation-duration;
    }
    .bounce-leave-active {
        animation: bounce-in $animation-duration reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
