<template>
    <label class="f-checkbox">
        <input :checked="checkBoxValue" @change="toggle" class="f-checkbox-input" id="fTableCheckbox" type="checkbox"/>
        <span class="f-checkbox-virtual-checkbox"
              :class="{'f-checkbox-virtual-checkbox-active':value}"> </span>
    </label>
</template>

<script>
    export default {
        name: "f-check-box",
        props: {
           value:{
               type:Boolean,
               default:false,
           }
        },
        data(){
            return{
                checkBoxValue:this.value
            }
        },
        methods: {
            toggle(e) {
                let {checked} = e.target
                this.checkBoxValue = checked
                this.$emit('on-change', checked)
                this.$emit('input',checked)
            }
        }

    }
</script>

