<template>
<div class="col" :class="[span && `col-${span}`,offset&&`offset-${offset}`]"
     :style="{paddingLeft:gutter/2+'px',paddingRight:gutter/2+'px'}"

>
    <div style="border:2px solid green">
{{this.haha}}
    </div>
        <slot></slot>
</div>
</template>

<script>
    export default {
        name: "gCol",
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            },
        },
        data(){
            return {
                gutter:0,
                haha:''
            }
        },


    }
</script>

<style scoped lang="scss">
    .col{
        height: 100px;
        width: 50%;

        $class-prefix:col-;
        $class-offset:offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: ($n/24) *100%
            }
        }
        @for $n from 1 through 24 {
            &.#{$class-offset}#{$n} {
                margin-left: ($n/24) *100%
            }
        }
    }
</style>
