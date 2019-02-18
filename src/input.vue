<template>
<div class="wrapper">
    <input type="text"
           :value="value"
           :disabled="disabled"
           :readonly="readonly"
           :class="{error:error}"
           @input="$emit('input',$event.target.value)"
           @change="$emit('change',$event.target.value)"
           @blur="$emit('blur',$event.target.value)"
           @focus="$emit('focus',$event.target.value)"

    >
    <gIcon v-if="error" name="gantan" color="#F1453D"></gIcon>
    <span v-if="error" :class="{errorMessage:error}">{{error}}</span>
</div>

</template>

<script>
    import gIcon from './icon'
    export default {
        name: "Input",
        components:{
            gIcon
        },
        props:{
            value:{
                type:String,

            },
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default:false
            },
            error:{
                type:String,
                validator(val){

                    if(val.length>10)return console.error('提示不能超出10个字')
                    return true
                }
            }
        }
    }
</script>

<style scoped lang="scss">
      $height:32px;
      $border-color:#999;
      $border-color-hover:#666;
      $font-size:12px;
      $box-shadow-color:rgba(0,0,0,0.5);
      $red:#F1453D;

      .wrapper{
          font-size: $font-size;
          display: inline-flex;
          align-items: center;
          > :not(:last-child){
              margin-right: .3em;
          }

          > input{
              height: $height;
              border:1px solid $border-color;
              padding: 0 8px;
              font-size: inherit;

              &:hover{
                  border-color: $border-color-hover;
              }
              &:focus{
                  box-shadow: inset 0 1px 3px $box-shadow-color;
                  outline: none;
              }
              &[disabled]{
                  border-color: #ccc;
                  color:#ccc;
                  cursor: not-allowed;
              }
              &.error{
                  border-color: $red;

              }

          }
          .errorMessage{
              color: $red;
          }
      }



</style>
