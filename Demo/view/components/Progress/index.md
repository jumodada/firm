# Progress进度条


## 进度条
:::demo 使用`status`给进度条设置状态，`percent`为100自动设置为`success`
```html
<f-progress :percent="5"  > </f-progress>
<f-progress :percent="60"  status="success"> </f-progress>
<f-progress :percent="20" status="error" > </f-progress>
<f-progress :percent="100"> </f-progress>
<script>
export default {
 
}
</script>

```
:::

## 宽度
:::demo 通过`bar-width`控制进度条的宽度，默认值是12。`color`可以替换默认颜色
```html
<f-progress  color="#2aa515" :percent="60"> </f-progress>
<f-progress  color="#ffb311" :bar-width="15" :percent="60" > </f-progress>
<f-progress color="#f54242" :bar-width="18" :percent="20" > </f-progress>
<script>
export default {
 
}
</script>

```
:::


## 动画
:::demo 使用`animation`给进度条添加动画，`percent`为100自动取消动画
```html
<f-progress :percent="60"  animation="wave"> </f-progress>
<f-progress :percent="20"  animation="ripple"  > </f-progress>
<f-progress  color="#f54242" :percent="60" animation="stripe"> </f-progress>
<script>
export default {
  
 
}
</script>

```
:::