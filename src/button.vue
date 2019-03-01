<template >
    <button class="x-button"
            :class="[[`icon-${position}`],
             typeStyle,sizeStyle,plainStyle,dangerStyle]
            "
            ref="button"
            :style="roundStyle"
            :disabled="disabled"
            @click="onClick"
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
        methods:{
          onClick(){
                this.$emit('click')
                this.dangerAnimation()
          },
            dangerAnimation(){
                let arr = this.$refs.button.classList
                if(this.type==='error'){
                    arr.remove('loop')
                    arr.add('loop')
                    setTimeout(()=>{     //为什么不用定时器就无法清除呢,cao
                        arr.remove('loop')
                    },300)
                }
            }
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
            },
            roundStyle(){
                if(this.round){
                    return 'border-radius:21px;'
                }
            },
            plainStyle(){
                if(this.plain){
                    return 'plain'
                }
            },
            dangerStyle(){
                if(this.danger){
                    return 'danger'
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
            type:{
              type:String,
              validator(val){
                  return ['primary','success','warn','error','info'].indexOf(val)>-1
              },
            },
            plain:{
                type:Boolean,
                default:false
            },
            size:{
                type:String,
                default:'medium',
                validator(val){
                    return ['big','medium','small','mini'].indexOf(val)>-1
                }
            },
            round:{
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
            danger:{
                type:Boolean,
                default: false
            },
            position:{
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
    $height:38px;
    $font-size: 14px;
    $button-bg: white;
    $button-active-bg: #eee;
    $border-radius: 4px;
    $color: #333;
    $border-color: #999;

    @keyframes loop {
        to {
            top: -8px;
            left: -8px;
            bottom: -8px;
            right: -8px;
            border-width: 6px;
            opacity: 0;
        }
    }
    @keyframes danger {
        0% {
            transform: scale(1);
            opacity: 0.0;
        }
        25% {
            transform: scale(1.02);
            opacity: 0.1;
        }
        50% {
            transform: scale(1.04);
            opacity: 0.3;
        }
        75% {
            transform: scale(1.06);
            opacity: 0.5;
        }
        100% {
            transform: scale(1.08);
            opacity: 0.0;
        }
    }
    @-webkit-keyframes danger {
        0% {
            -webkit-transform: scale(0);
            opacity: 0.0;
        }
        25% {
            -webkit-transform: scale(0);
            opacity: 0.1;
        }
        50% {
            -webkit-transform: scale(0.1);
            opacity: 0.3;
        }
        75% {
            -webkit-transform: scale(0.5);
            opacity: 0.5;
        }
        100% {
            -webkit-transform: scale(1);
            opacity: 0.0;
        }
    }
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
        padding: 0 1em;
        height:$height;
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: all .3s cubic-bezier(.645,.045,.355,1);

        &.size-big{
            font-size: 16px;
            height: 45px;
            padding:  0 1.5em;
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
            border-radius: 3px;
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
        &.icon-right{
            > .x-icon {
                order: 2;
                margin-right: 0;
                margin-left:0.3em;
            }
            > .x-button-content {
                order: 1;
            }
        }
        &[disabled]{
            color: #c0c4cc;
            background:none;
            pointer-events: none;
            border-color: #ebeef5;
            opacity: 0.5;
        }

        &.type-error {
            color:white;
            background-color: #f56c6c;
            border-color: #f56c6c;
            &:active{
                opacity: 1;
                color:white;
                background-color: #d81e06;
                border-color: #d81e06;
            }
        }

        &.type-warn{
            color:white;
            background-color: #e6a23c;
            border-color: #e6a23c;
            &:hover{
                color:#e6a23c;
                background-color: #fdf6ec;
                border-color: #e6a23c;
            }
        }
        &.type-info{
            color:white;
            background-color: #bfbfbf;
            border-color: #bfbfbf;
            &:hover{
                color:#909399;
                background-color: #f4f4f5;
                border-color: #909399;
            }
        }
        &.type-success{
            color:white;
            background-color: #67c23a;
            border-color: #67c23a;
            &:hover{
                opacity: 1;
                color:#67c23a;
                background-color: #f0f9eb;
                border-color: #67c23a;
            }
        }
        &.type-primary{
            color:white;
            background-color: #409EFF;
            border-color: #409EFF;
            &:hover{
                opacity: 1;
                color:#409EFF;
                background-color: #ecf5ff;
                border-color: #409EFF;
            }
        }
        &.type-success.plain{
            color:#67c23a;
            background-color: #f0f9eb;
            border-color: #67c23a;
            &:hover{
                opacity: 1;
                color:white;
                background-color: #67c23a;
                border-color: #67c23a;
            }
        }

        &.type-primary.plain{
             color:#409EFF;
             background-color: #ecf5ff;
             border-color: #409EFF;
            &:hover{
                opacity: 1;
                color:white;
                background-color: #409EFF;
                border-color: #409EFF;
            }

        }

        &.type-info.plain{
            color:#909399;
            background-color: #f4f4f5;
            border-color: #909399;
            &:hover{
                opacity: 1;
                color:white;
                background-color: #909399;
                border-color: #909399;
            }
        }
        &.type-warn.plain{
            color:#e6a23c;
            background-color: #fdf6ec;
            border-color: #e6a23c;
            &:hover{
                opacity: 1;
                color:white;
                background-color: #e6a23c;
                border-color: #e6a23c;
            }
        }
        &.type-error.plain{
            color:#f56c6c;
            background-color: #fef0f0;
            border-color: #f56c6c;
            &:hover{
                opacity: 1;
                color:white;
                background-color: #f56c6c;
                border-color: #f56c6c;
            }
            &:active{
                opacity: 1;
                color:white;
                background-color: #d81e06;
                border-color: #d81e06;
            }
        }
        &.danger:hover{
            border: 6px solid #f56c6c;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            z-index: 1;
            opacity: 0;
            -webkit-animation: danger 1s ease-out;
            -moz-animation: danger 1s ease-out;
            animation: danger 1s ease-out;
            -webkit-animation-iteration-count: infinite;
            -moz-animation-iteration-count: infinite;
            animation-iteration-count: infinite;
        }

        .loading{
            animation: spin 1s infinite linear;
        }

    }
    .loop {
        position: relative;
        &::before {
            content: '';
            display: block;
            background-color: inherit;
            pointer-events: none;
            position: absolute;
            z-index: 1;
            top: -3px;
            left: -3px;
            bottom: -3px;
            right: -3px;
            border-radius: inherit;
            border: 0 solid inherit;
            opacity: 0.3;
            animation: loop 0.3s ease-in-out ;
            flex-shrink: 0;
        }
    }

</style>





