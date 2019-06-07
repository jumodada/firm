<template>
    <div class="switch" :class="{checked:toggle,openStatus:toggle}" ref="switch" @click="switchChecked">
        <div class="switch-open" v-if="toggle">
            <slot name="open"></slot>
        </div>
        <div  class="switch-close" v-if="!toggle">
            <slot name="close"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "x-switch",
        props:{

        },
        data(){
          return {
              toggle:false
          }
        },
        methods:{
            switchChecked(){
                this.toggle =!this.toggle
            }
        }
    }
</script>

<style scoped lang="scss">
    .switch{
        height: 20px;
        width: 50px;
        background-color: rgba(231, 231, 231, 0.95);
        color: white;
        border-radius: 35px;
        display: inline-flex;
        position: relative;
        font-size: 14px;
        transition: all .2s ease-in-out;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        &-open{
            position: absolute;
            left: 7px;
            top: 0;
        }
        &-close{
            position: absolute;
            left: 24px;
            top:0
        }
            &::after{
                content: "";
                width: 18px;
                height: 18px;
                border-radius: 18px;
                background-color: #fff;
                position: absolute;
                left: 1px;
                top: 1px;
                cursor: pointer;
                transition: left .2s ease-in-out,width .2s ease-in-out;
            }
        &.checked{
            &:after{
                left: 31px;
            }
        }
        &.openStatus{
            background-color: #2d8cf0;
            color: white;
        }
    }
</style>
