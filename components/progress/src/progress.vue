<template>
    <div :class="progress">
        <div class="f-progress-bar-wrapper">
            <div :style="progressBarBg" class="f-progress-barBg">
                <div :style="barStyle" :class="progressBar">
                    <div v-if="animation==='wave'" :style="waveStyle" class="f-progress-wave"></div>
                </div>
            </div>
        </div>
        <div :class="progressText">

        </div>
    </div>
</template>

<script>
    import {getDarkColor} from "../../../src/utils/color";

    export default {
        name: "f-progress",
        props:{
            percent:{
                type:Number,
                default:0
            },
            status:{
                type:String,
                default:'normal',
                validator:val=>['normal','error','success','active'].indexOf(val)>-1
            },
            height:{
                type:Number,
                default:0
            },
            color:{
                type:String,
                default:'#26acee'
            },
            animation:{
                type:String,
                validator:val=>['wave','stripe','ripple'].indexOf(val)>-1
            },
        },
        computed:{
            progress(){
                return [
                    'f-progress'
                ]
            },
            waveStyle(){
                let height = (this.height||10)
                let sideLength = height*3
                return {
                    height:sideLength+'px',
                    width:sideLength+'px',
                    right:-sideLength+10+'px',
                    bottom:`calc(50% + ${height/2}px)`,
                    display:this.percent===100?'none':''
                }
            },
            barStyle(){
                let style = {
                    'background-color':this.bgColor(),
                    height:(this.height||10)+'px',
                    width:this.percent+'%',
                }
                if(this.animation==='stripe'){
                    let darkColor = getDarkColor(this.bgColor(),0.3)
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
                        'f-progress-active':this.status==='active'
                    }
                ]
            },
            progressBarBg(){
              return {
                  height:this.height+'px'
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
