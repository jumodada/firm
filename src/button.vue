<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}">
        <g-icon  :name="icon" class="loading">

        </g-icon>
        <div class="content">
            <slot></slot>
        </div>


    </button>


</template>
<script>
    export default {
        props: {
            icon:{

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
        .loading{
            animation: spin 1s infinite linear;
        }
    }
</style>





