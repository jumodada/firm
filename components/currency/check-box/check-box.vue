<template>
    <label class="f-checkbox" for="fTableCheckbox">
        <input ref="input" class="f-checkbox-input" id="fTableCheckbox" type="checkbox" />
        <span @click="toggle" class="f-checkbox-virtual-checkbox" :class="{'f-checkbox-virtual-checkbox-active':isActive}"> </span>
    </label>
</template>

<script>
    export default {
        name: "f-check-box",
        data(){
            return {
                isActive:false
            }
        },
        methods:{
            toggle(){
                let {checked} = document.querySelector('#fTableCheckbox')
                this.isActive = checked
            }
        }

    }
</script>

