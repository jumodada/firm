# Popover气泡框


## 触发方式
:::demo 设置`trigger`改变气泡框的触发方式
```html
<f-popover title="提示" content="这是Hover触发的内容"  trigger="hover" >
<f-button class="button">Hover</f-button>
</f-popover>

<f-popover @on-confirm="yy" :before-confirm="xxx" confirm  title="提示" content="这是Click触发的内容" trigger="click" >
<f-button class="button">Click</f-button>
</f-popover>

<f-popover title="提示" content="这是Focus触发的内容" trigger="focus">
<f-button class="button">Focus</f-button>
</f-popover>


<script>
export default {
    data(){
        return {
          
        }
    },
    methods:{
     xxx(){ 
            return new Promise(resolve=>{
        setTimeout(()=>{
      resolve(1)  
},2000)            

})
      },
yy(e,res){
console.log(e,res)
}
   }
 
}
</script>



```
:::


## 内部关闭
:::demo   通过`v-model`绑定控制显示关闭
```html

<f-popover v-model="visible"  trigger="click"  position="right">
<f-button class="button">Click</f-button>
  <div @click="visible=false" slot="content" >
      <div>todo-list</div>
  </div>
</f-popover>



<script>
export default {
    data(){
        return {
            visible:true
        }
    }
 
}
</script>



```
:::