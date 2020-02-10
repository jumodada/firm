<template>
    <div :class="progress">
        <div class="f-progress-bar-wrapper">
            <div :style="progressBarBg" class="f-progress-barBg">
                <div :style="barStyle" :class="progressBar">
                    <div v-if="animation==='wave'" :style="waveStyle" class="f-progress-wave"></div>
                </div>
            </div>
        </div>
        <span v-if="!hideText" :class="progressText">
            <Icon v-if="percent===100||status==='success'" name="success1"></Icon>
            <span v-else>{{percent+'%'}}</span>
        </span>
    </div>
</template>

<script>
    import {getDarkColor} from "../../../src/utils/color";
    import Icon from '../../icon'
    export default {
        name: "f-progress",
        components:{Icon},
        props:{
            percent:{
                type:Number,
                default:0
            },
            hideText:{
                type:Boolean,
                default:false
            },
            status:{
                type:String,
                default:'normal',
                validator:val=>['normal','error','success'].indexOf(val)>-1
            },
            barWidth:{
                type:Number,
                default:12
            },
            color:{
                type:String,
                default:'#26acee'
            },
            animation:{
                type:String,
                validator:val=>['wave','stripe','ripple'].indexOf(val)>-1
            },
            stripeColorRatio:{
                type:Number,
                default:0.12,
                validator:val=>1>val>0
            }
        },
        computed:{
            progress(){
                return [
                    'f-progress'
                ]
            },
            waveStyle(){
                let barWidth = this.barWidth
                let sideLength = barWidth*3
                return {
                    height:sideLength+'px',
                    width:sideLength+'px',
                    right:-sideLength+10+'px',
                    bottom:`calc(50% + ${barWidth/2}px)`,
                    display:this.percent===100?'none':''
                }
            },
            barStyle(){
                let style = {
                    'background-color':this.bgColor(),
                    height:this.barWidth+'px',
                    width:this.percent+'%',
                }
                if(this.animation==='stripe'&&this.percent!==100&&this.status!=='success'){
                    let darkColor = getDarkColor(this.bgColor(),this.stripeColorRatio)
                    let bottomColor = getDarkColor(this.bgColor(),0.5)
                    style.background = `${this.color} repeating-linear-gradient(-45deg,${this.color} , ${this.color} 30px, ${darkColor} 30px, ${darkColor} 60px)`
                    style['background-size'] = '600px 100%'
                    style['border-bottom'] = `0.2rem solid ${bottomColor}`
                }
              return style
            },
            progressBar(){
                return [
                    'f-progress-bar',
                    {
                        'f-progress-ripple':this.animation==='ripple'
                    }
                ]
            },
            progressBarBg(){
              return {
                  barWidth:this.barWidth+'px'
              }
            },
            progressText(){
                return [
                    'f-progress-text'
                ]
            }
        },
        methods:{
            bgColor(){
                if(this.status==='success'||this.percent===100){
                    return '#17cc15'
                }else if(this.status==='error'){
                    return '#f54242'
                }else{
                    return this.color
                }
            }
        }
    }
</script>
