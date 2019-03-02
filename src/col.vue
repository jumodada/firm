<template>
<div class="col" :class="[colClasses]"
     :style="colStyle"
>
        <slot>
        </slot>
</div>
</template>

<script>
    let validator = val=>{
        let keys = Object.keys(val)
        let valid = true
        keys.forEach(key=>{
            if(['span','offset'].indexOf(key) ===-1){
                valid = false
            }
        })
        return valid
    }
    export default {
        name: "xCol",
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            },
            pad:{type:Object, validator},
            np:{type:Object, validator},
            pc:{type:Object, validator},
            wp:{type:Object, validator},
        },
        data(){
            return {
                flex:0,
            }
        },
        computed:{
            colClasses(){

                let {span,offset,pad,np,pc,wp} = this
                let createClass = (obj,str = '')=>{
                    if(!obj) return
                    let array = []
                    if(obj.span){
                        array.push(`col-${str}${obj.span}`)
                    }
                    if(obj.offset){
                        array.push(`offset-${str}${obj.offset}`)
                    }
                    return array
                }
                return [
                    createClass({span,offset}),
                    createClass(pad,'iPad-'),
                    createClass(np,'narrowPc-'),
                    createClass(pc,'pc-'),
                    createClass(wp,'widePc-'),
            ]
            },
            colStyle(){
                return {
                    paddingLeft:this.flex/2 + 'px',
                    paddingRight:this.flex/2 + 'px',
                    marginRight:this.gutter + 'px'
                }
            }
        }


    }
</script>

<style scoped lang="scss">
    .col{
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

            @media (min-width: 577px){
                    $class-prefix:col-iPad-;
                    $class-offset:offset-iPad-;
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
            @media (min-width: 769px){
                    $class-prefix:col-narrowPc-;
                    $class-offset:offset-narrowPc-;
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
            @media (min-width: 993px) {
                    $class-prefix:col-pc-;
                    $class-offset:offset-pc-;
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
            @media (min-width: 1201px){
                    $class-prefix:col-widePc-;
                    $class-offset:offset-widePc-;
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
    }
</style>
