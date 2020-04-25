<template>
    <label class="f-checkbox">
        <input :checked="value" @change="toggle" class="f-checkbox-input" id="fTableCheckbox" type="checkbox"/>
        <span  class="f-checkbox-virtual-checkbox"
              :class="{'f-checkbox-virtual-checkbox-active':value,disabled}"> </span>
    </label>
</template>

<script>
    export default {
        name: "f-check-box",
        props: {
           value:{
               type:Boolean,
               default:false,
           },
            disabled:{
                type:Boolean,
                default:false,
            }
        },
        methods: {
            toggle(e) {
                if(this.disabled)return e.preventDefault()
                let {checked} = e.target
                this.$emit('on-change', checked)
                this.$emit('input',checked)
            }
        }
    }
</script>

