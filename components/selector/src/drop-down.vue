<template>
    <div @click="toFocus" class="f-select-drop">
     123
    </div>
</template>

<script>
    export default {
        name: "drop-down",
        methods:{
            toFocus(){
                this.$parent.$refs.input.$el.focus()
            }
        }
    }
</script>
