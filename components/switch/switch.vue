<template>
    <div class="f-switch" :style="{backgroundColor:toggle?activeColor:inactiveColor}" :class="{checked:toggle,openStatus:toggle,[size]:true}" ref="switch" @click="switchChecked">
        <div class="f-switch-open" v-if="toggle">
            <slot name="open"></slot>
        </div>
        <div  class="f-switch-close" v-if="!toggle">
            <slot name="close"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "f-switch",
        model: {
            prop: 'value',
            event: 'change'
        },
        props:{
            value:Boolean,
            activeColor:{
                type:String,
            },
            inactiveColor:{
                type:String
            },
            size:{
                validator(val){
                    return ['big','medium','small'].indexOf(val)>-1
                }
            }
        },
        data(){
          return {
              toggle:false,
          }
        },
        methods:{
            switchChecked(event){
                event.preventDefault()

                this.toggle = !this.toggle
                this.$emit('on-change',this.toggle)
                this.$emit('change',this.toggle)
            }
        }
    }
</script>
