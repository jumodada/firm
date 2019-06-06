<template>
    <div class="switch" ref="switch" @click="switchChecked">

        <slot name="open"></slot>
        <slot name="close"></slot>
    </div>
</template>

<script>
    export default {
        name: "x-switch",
        methods:{
            switchChecked(e){
                if(e.target.classList.contains('checked')){
                    return e.target.classList.remove('checked')
                }
                e.target.classList.add('checked')
            }
        }
    }
</script>

<style scoped lang="scss">
    .switch{
        height: 20px;
        width: 50px;
        background-color: #dddddd;
        border-radius: 35px;
        display: inline-flex;
        position: relative;
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
                left: 32px;
            }
        }
    }
</style>
