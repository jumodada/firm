<template >
    <button class="g-button lala"
            :class="{[`icon-${iconPosition}`]:true,
            }"
            :disabled="disabled"
            @click="$emit('click')"

    >
        <g-icon  :name="icon"
                 :color="color"
                 :style="disabledStyle"
                 v-if="icon || loading"  :class="{loading:loading}">

            </g-icon>
        <div class="content"
             :style="disabledStyle"
        >
            <slot></slot>
        </div>
    </button>

</template>
<script>

    import Icon from'./icon.vue'
    export default {
        mounted(){
          console.log(this.$el.querySelector('use'))
        },
        components:{
            'g-icon':Icon
        },
        computed:{
            disabledStyle(){
                if(this.disabled){
                    return 'fill:#ccc; pointer-events: none;'
                }
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
<style lang="scss">
    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: top;
        &:hover {
            border-color: var(--border-color-hover);
        }
        &:active {
            background-color: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }
        > .content {
            order: 2;
        }
        > .icon {
            order: 1;
            margin-left: 0;
            margin-right: 0.3em;
        }
        &.icon-right {
            > .icon {
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
        }

        .loading{
            animation: spin 1s infinite linear;
        }



    }
</style>





