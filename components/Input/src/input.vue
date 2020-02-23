<template>
<div class="f-input-wrapper" ref="wrapper" :disabled="disabled">
    <input type="text"
           :value="value"
           :disabled="disabled"
           :readonly="readonly"
           :class="{error:error}"
           @input="$emit('input',$event.target.value)"
           @change="$emit('change',$event.target.value)"
           @blur="$emit('blur',$event.target.value)"
           @focus="$emit('focus',$event.target.value)"
           ref="input"

    >
    <xIcon v-if="error" name="gantan" color="#F1453D"></xIcon>
    <div class="cloak" v-if="disabled" ref="cloak"></div>
    <span v-if="error" :class="{errorMessage:error}">{{error}}</span>
</div>

</template>

<script>
    import xIcon from '../../icon/src/icon'
    export default {
        name: "f-input",
        components:{
            xIcon
        },
        props:{
            value:{
                type:String,

            },
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default:false
            },
            error:{
                type:String,
                validator(val){
                    if(val.length>10)return console.error('不能多于十个字')
                    return true
                }
            }
        },
        mounted(){
            if(this.disabled){
                 this.$refs.cloak.style.width = getComputedStyle(this.$refs.wrapper).width
            }

        }
    }
</script>
