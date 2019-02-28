<template >
    <button class="x-button"
            :class="[[`icon-${iconPosition}`],
             typeStyle,sizeStyle]
            "
            :disabled="disabled"
            @click="$emit('click')"
    >
        <x-icon  :name="icon"
                 :color="color"
                 :style="disabledStyle"
                 v-if="icon || loading"  :class="{loading:loading}">
            </x-icon>
        <div class="x-button-content"
             :style="disabledStyle"
        >
            <slot></slot>
        </div>
    </button>

</template>
<script>

    import Icon from'./icon.vue'
    export default {
        name:'x-button',
        components:{
            'x-icon':Icon
        },
        computed:{
            disabledStyle(){
                if(this.disabled){
                    return 'fill:#ccc; pointer-events: none;'
                }
            },
            typeStyle(){
                if(!this.type)return
                return `type-${this.type}`
            },
            sizeStyle(){
                if(!this.size)return
                return `size-${this.size}`
            }
        },

        props: {
            icon:{
                type:String
            },
            disabled:{
              type:Boolean,
                default:false
            },
            type:{
              type:String,
              validator(val){
                  return ['primary','success','warn','error','info'].indexOf(val)>-1
              },
            },
            size:{
                type:String,
                default:'medium',
                validator(val){
                    return ['big','medium','small','mini'].indexOf(val)>-1
                }
            },

            color:{
              type:String,
                default:'black'
            },
            loading:{
                type:Boolean,
                default: false
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value) {
                    return !(value !== 'left' && value !== 'right');
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    $button-height: 37px;
    $font-size: 14px;
    $button-bg: white;
    $button-active-bg: #eee;
    $border-radius: 4px;
    $color: #333;
    $border-color: #999;
    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .x-button {
        font-size: $font-size;
        height: $button-height;
        padding: 0 1em;
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: top;
        &.size-big{
            font-size: 16px;
            height: 45px;
            padding: 0 1.1em;
            border-radius: 5px;
        }
        &.size-medium{
            font-size: 15px;
            height: 38px;
            padding: 0 1em;
            border-radius: 4px;
        }
        &.size-small{
            font-size: 10px;
            height: 30px;
            padding: 0 0.8em;
            border-radius: 3.5px;
        }
        &.size-mini{
            font-size: 7px;
            height: 26px;
            padding: 0 0.6em;
            border-radius: 3px;
        }
        &:hover {
            opacity: 0.6;
        }
        &:active {
            background-color: $button-active-bg;
        }
        &:focus {
            outline: none;
        }
        > .x-button-content{
            order: 2;
        }
        > .x-icon  {
            order: 1;
            margin-left: 0;
            margin-right: 0.3em;
        }
        &.icon-right {
            > .x-icon {
                order: 2;
                margin-right: 0;
                margin-left:0.3em;
            }
            > .content {
                order: 1;
            }
        }
        &[disabled]{
            border-color: #ccc;
            color:#ccc;
            cursor: not-allowed;
            background-image: none;
        }
        &[disabled]:hover{
            opacity: 1;
        }
        &.type-error{
            color:white;
            background-color: #d81e06;
            border-color: #d81e06;
        }
        &.type-warn{
            color:white;
            background-color: #bda109;
            border-color: #bda109;
        }
        &.type-info{
            color:white;
            background-color: #bfbfbf;
            border-color: #bfbfbf;
        }
        &.type-success{
            color:white;
            background-color: #1fab06;
            border-color: #1fab06;
        }
        &.type-primary{
            color:white;
            background-color: rgb(64, 158, 255);
            border-color: rgb(64, 158, 255);
        }


        .loading{
            animation: spin 1s infinite linear;
        }



    }
</style>





