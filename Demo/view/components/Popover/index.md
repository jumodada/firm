# Popover气泡框


## 触发方式
:::demo 设置`trigger`改变气泡框的触发方式
```html
<f-popover trigger="hover"  position="bottom">
<f-button class="button">Hover</f-button>
  <div slot="content">
  to do something......
  </div>
</f-popover>

<f-popover trigger="click"  position="top">
<f-button class="button">Click</f-button>
  <div slot="content">
  to do something...... 
  </div>
</f-popover>

<f-popover trigger="focus"  position="bottomStart">
<f-button class="button">Focus</f-button>
  <div slot="content">
  to do something...... 
  </div>
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