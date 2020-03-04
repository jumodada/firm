<template>
    <div :tabindex="tabIndex" :style="inputStyle" class="f-select-input">
    </div>
</template>

<script>

    export default {
        name: "Input",
        props:{
            multiple:{
                type:Boolean,
                default:false
            },
            width:{
                type:Number,
                default: 200
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            inputStyle(){
                let style = {
                    width:this.width+'px'
                }
                return style
            },
            tabIndex(){
                return this.disabled?-1:0
            }
        },
        methods:{
            focusToggle(e){
                console.log(e)
            }
        }
    }
</script>
