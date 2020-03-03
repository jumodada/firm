# Popover气泡框


## 触发方式
:::demo 设置`trigger`改变气泡框的触发方式
```html
<f-popover title="提示" content="这是Hover触发的内容"  trigger="hover" >
<f-button class="button">Hover</f-button>
</f-popover>

<f-popover  title="提示" content="这是Click触发的内容" trigger="click" >
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
    }
}
</script>



```
:::

## 插槽分发
:::demo   可以通过具名插槽自定义气泡框的内容，`title`、`content`、`footer`。利用`v-model`绑定控制气泡框的展示与隐藏。
```html

<f-popover v-model="visible" title-icon="gantan"  trigger="click"  position="right-start">
<f-button size="small" type="error" class="button">撤销</f-button>
  <div slot="title">提示</div>
  <div slot="content">
      <div>确定撤销该商品吗</div>
  </div>
  <div slot="footer">
    <f-button @click="handleCancel" type="text" size="mini">取消</f-button>
    <f-button @click="handleConfirm" type="primary" size="mini">确定</f-button>
  </div>
</f-popover>



<script>
export default {
  data(){
    return {
        visible:false 
    }
  },
    methods:{
     handleCancel(){
        this.visible = false
        this.$message.warn('已取消')   
     },
    handleConfirm(){
        this.visible = false
        this.$message.success('点击了确定')   
     }
   }
}
</script>



```
:::

## 位置
:::demo 通过`position`可以设置弹出框的弹出方向
```html
<div class="grid-top" >
<f-popover position="top-start" title="提示" content="内容.........">
<f-button class="button">上左</f-button>
</f-popover>

<f-popover  title="提示" content="内容.........">
<f-button class="button">上中</f-button>
</f-popover>

<f-popover position="top-end"  title="提示" content="内容.........">
<f-button  class="button">上右</f-button>
</f-popover>
</div>
<div class="grid-center">
<f-popover position="left-start" title="提示" content="内容.........">
<f-button class="button">左上</f-button>
</f-popover>
<f-popover class="float-right"   position="right-start"  title="提示" content="内容.........">
<f-button  class="button">右上</f-button>
</f-popover>
</div>
<div class="grid-center">
      <f-popover position="left" title="提示" content="内容.........">
      <f-button class="button">左中</f-button>
      </f-popover>
      <f-popover class="float-right"   position="right"  title="提示" content="内容.........">
      <f-button  class="button">右中</f-button>
      </f-popover>
 </div>
<div class="grid-center">
<f-popover position="left-end" title="提示" content="内容.........">
<f-button class="button">左下</f-button>
</f-popover>
<f-popover class="float-right"   position="right-end"  title="提示" content="内容.........">
<f-button  class="button">右下</f-button>
</f-popover>
</div>
<div class="grid-top" >
<f-popover position="bottom-start" title="提示" content="内容.........">
<f-button class="button">下左</f-button>
</f-popover>

<f-popover  position="bottom" title="提示" content="内容.........">
<f-button class="button">下中</f-button>
</f-popover>

<f-popover position="bottom-end"  title="提示" content="内容.........">
<f-button  class="button">下右</f-button>
</f-popover>
</div>
<script>
export default {
    data(){
        return {
          
        }
    }
}
</script>



```
:::


## 确认框与异步
:::demo 设置`confirm`开启确认框。绑定`before-confirm`钩子可以进行一些异步操作。
```html
<f-popover @on-confirm-failed="handleFailed" @on-cancel="handleCancel" :before-confirm="notPromise" confirm  title="提示" content="确定要发送吗">
<f-button type="warn" class="button">立即结束</f-button>
</f-popover>
<f-popover @on-confirm-success="handleSuccess" @on-cancel="handleCancel" :before-confirm="handleBeforeSuccess" confirm  title="提示" content="确定要发送吗">
<f-button type="success" class="button">成功</f-button>
</f-popover>
<f-popover @on-confirm-failed="handleFailed" @on-cancel="handleCancel" :before-confirm="handleBeforeFailed" confirm  title="提示" content="确定要发送吗">
<f-button type="error"  class="button">失败</f-button>
</f-popover>
<f-popover :confirm-timeout="1000"
 @on-confirm-failed="handleFailed"
 @on-confirm-timeOut="handleTimeout"
 @on-cancel="handleCancel"
 :before-confirm="handleBeforeFailed" 
 confirm  
 title="提示" content="确定要发送吗">
<f-button type="info"  class="button">超时</f-button>
</f-popover>
<script>
export default {
    data(){
        return {
          
        }
    },
    methods:{
     notPromise(){
      return function(){}
     },
      handleBeforeFailed(){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('error')
        },2000)
     })
     },
     handleBeforeSuccess(){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('success')
        },2000)
     })
     },
      handleCancel(){
        this.$message.error('已取消') 
     },
      handleSuccess(){
        this.$message.success('发送成功') 
     },
     handleFailed(){
        this.$message.error('发送失败') 
     },
     handleTimeout(){
     this.$message.error('请求超时')
     }
   }
}
</script>



```
:::
## API


### Props
| 参数      | 说明    | 类型      | 可选值       | 默认   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 弹出框标题   | string  |   -   | - |
| content     | 弹出框内容   | string  |   -   | - |
| trigger     | 弹出框的触发方式   | string  |   hover/click/focus   | click |
| position     | 弹出框出现位置   | string  |   top/top-start/top-end/right/right-start/right-end/left/left-start/left-end/bottom/bottom-start/bottom-end   | top |
| confirm     | 开启确认框，提供`on-confirm`和`on-cancel`方法   | boolean  |  false/true  | false |
| before-confirm     | 绑定则在点击确认框后调用，希望返回一个`promise`，成功则关闭弹出框  | function  |  -  | - |
| before-timeOut     | 绑定`before-confirm`后的超时限制  | number  |  -  | - |


### Events
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| on-confirm     | 点击确后触发   | - |
| on-confirm-success     | 绑定`before-confirm`，调用成功后触发   | - |
| on-confirm-failed     | 绑定`before-confirm`，调用失败后触发   | - |
| on-confirm-timeOut     | 绑定`before-confirm`，超时触发。需设置`before-timeOut `   | - |


### Slot
| 名称       | 说明    
|---------- |-------- |
| -    | 弹出框内嵌的内容 |
| title     | 标题   |
| content   | 内容   |
| footer    | 尾部。css设置了`text-align:right`   |

