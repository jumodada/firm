<template>
  <div class="table-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "g-tabs-header",
        inject: ['eventBus'],
        mounted () {
            if(!this.eventBus)return
            this.eventBus.$on('update:selected',(item,vm)=>{
                  let {top,width,height,left} = vm.$el.getBoundingClientRect()
                  this.$refs.line.style.width = `${width}px`
                  this.$refs.line.style.transform = `translateX(${left}px)`

           })

        }

    }
</script>

<style scoped lang="scss">
       $tab-height:40px;
       $blue:#1296db;
       $border-color: #ddd;
      .table-head{
          display: flex;
          height: $tab-height;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          border: 1px solid  $border-color;
        >.actions-wrapper{
          margin-left: auto;
          margin-right: 2em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        >.line{
          position: absolute;
          bottom: 0;
          border-bottom: $blue solid 3px;
          transition: all .3s;
        }
      }
</style>
