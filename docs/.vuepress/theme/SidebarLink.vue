<template>
<div class="SidebarLink">
    <ul>
       <li  class="SidebarLink-li" @click="selectedLi" :class="{active:$route.path===item.path}">
            {{item.title}}
       </li>
        <p v-for="(child,index) in item.headers"
           class="SidebarLink-p"
           @click="selectedP(index,child)"
           :class="{active:index===selectedPItem}"
           v-if="$route.path===item.path">
            {{child.title}}
        </p>
    </ul>
</div>
</template>


<script>
    import Local from '../../localstore'
  export default {
      props:['item'],
      inject:['eventBus'],
      data(){
          return{
             selectedPItem:0
          }
      },
      mounted(){

          let pathName =Local.get('pathName')
          if(pathName){
              this.item.headers&&this.item.headers.forEach((item,index)=>{
                if(item.slug===pathName){
                    this.selectedPItem =  index
                }
            })
          }
      },
      methods:{
          selectedLi(){
              Local.set('pathName',null)
              this.selectedPItem= 0
             setTimeout(()=>{
                 this.$router.push({path:`${this.item.path}`})
             })
          },
          selectedP(index,child){
                this.selectedPItem = index
                this.$router.push({path:`#${child.slug}`})
               Local.set('pathName',child.slug)
          }
      }
  }
</script>


<style scoped lang="scss">
  .SidebarLink-li{
      color: #515a6e;
      margin: 15px 0 10px 0;
      padding-left: 20px;
      transition: .4s all ease-out;
      &:hover{
          color:white;
          border-left: 6px solid #aa1704;
          box-shadow: rgba(223, 176, 122, 0.7) 0 0 20px;
          background: linear-gradient(45deg,#f9bc62, #f4c86b);
          transform:translateX(20px)
      }
      &.active{
          border-left: 6px solid #aa1704;
          color:#e0620d
      }

  }
  .SidebarLink-p{
      color: #999999;
      margin-left: 60px;
      font-size: 13px;
      transition: .3s all ease-in;
      padding-left: 5px;
      &:hover{
            z-index: 10;
            color:#e0620d;
            font-size: 14px;
            border-left: 5px #f25e0e solid;
      }
      &.active{
          z-index: 10;
          color:#e0620d;
          font-size: 14px;
          border-left: 5px #f25e0e solid;
      }
  }
</style>


