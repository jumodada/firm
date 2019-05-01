<template>

          <button class="x-button"
                  :class="[[`icon-${position}`],
             typeStyle,sizeStyle,plainStyle,dangerStyle,dashedStyle,loadingStyle,circleStyle]
            "
                  :disabled="disabled"
                  ref="button"
                  :style="roundStyle"
                  @click="onClick"
                  @focus="focusOn"
                  @blur="blurIt"
          >

              <x-icon  :name="icon"
                       :color="color"
                       :style="disabledStyle"
                       v-if="icon || loading"  :class="{loading:loading}">
              </x-icon>
              <div class="x-button-content"
                   :style="disabledStyle"
              >
                  <slot>
                  </slot>
              </div>
              <div class="cloakLeft" v-if="disabled"></div>
              <div class="cloakRight" v-if="disabled"></div>
          </button>

</template>
<script>

    import Icon from './icon.vue'
    export default {
        name:'x-button',
        components:{
            'x-icon': Icon
        },
        methods:{
          onClick(){
                this.$emit('click')
                this.dangerAnimation()
              if(this.loading){

              }else{

              }
          },
            dangerAnimation(){
                let arr = this.$refs.button.classList
                    arr.remove('loop')
                    arr.add('loop')
                    setTimeout(()=>{     //为什么不用定时器就无法清除呢,cao
                        arr.remove('loop')
                    },300)
            },
            focusOn(){

            },
            blurIt(){

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
            circleStyle(){
                if(this.circle){
                    return 'circle'
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
            },
            dashedStyle(){
                if(this.dashed){
                    return 'dashed'
                }
            },
            loadingStyle(){
                if(this.loading){
                    return 'loadingCloak'
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
                default(){
                    if(this.type){
                        return 'white'
                    }else{
                        return 'black'
                    }
                }
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
            dashed:{
                type:Boolean,
                default: false
            },
            circle:{
                type:Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../var";
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
            padding: 0.1em 1em;
            height:$height;
            border-radius: $border-radius;
            border: 1px solid $border-color;
            background: $button-bg;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            transition: all .2s;
            &:focus{
                border-color: #F1C40F;
            }
            >.cloakLeft{
                float: left;
                height: inherit;
                opacity: 0.5;
            }
            >.cloakRight{
                float: right;
                height: inherit;
                opacity: 0.5;
            }

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
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;
                &:hover{
                    color: rgba(0,0,0,.25);
                    border-color: #d9d9d9;
                }
            }
            &.dashed{
                border: 1px dashed $border-color;
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
                    border-color: #e6a23c;
                }
            }
            &.type-info{
                color:white;
                background-color: #bfbfbf;
                border-color: #bfbfbf;
                &:hover{
                    border-color: #909399;
                }
            }
            &.type-success{
                color:white;
                background-color: #67c23a;
                border-color: #67c23a;
                &:hover{
                    opacity: 1;
                    border-color: #67c23a;
                }
            }
            &.type-primary{
                color:white;
                background-color: #409EFF;
                border-color: #409EFF;
                &:hover{
                    opacity: 1;
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


            &.circle{
                width: 2.5em;
                height: 2.5em;
                border-radius: 50%;
                padding: 10px;
                font-size: 16px;
                .x-icon  {
                    margin-left: 0;
                    margin-right: 0;
                }
                &.type-primary:hover{
                background-color: #409EFF;
                }
                &.type-success:hover{
                    background-color: #67c23a;
                }
                &.type-warn:hover{
                    background-color: #e6a23c;
                }
                &.type-error:hover{
                    background-color: #f56c6c;
                }
                &.type-info:hover{
                    background-color: #bfbfbf;
                }
            }

            .loading{
                animation: spin 1s infinite linear;
            }
            &.loadingCloak{
                opacity: .5;
            }
            &[disabled]{
                cursor: not-allowed;
            }
        }

    .loop{
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
            opacity: .3;
            animation: loop .3s ease-in-out ;
            flex-shrink: 0;
        }
    }


</style>





