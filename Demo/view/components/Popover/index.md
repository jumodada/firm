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


## 自定义内容
:::demo   可以通过具名插槽自定义气泡框的内容。利用`v-model`绑定控制气泡框的展示与隐藏。
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
        this.$message.warn('点击了取消')   
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