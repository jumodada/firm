# Input输入框 


## 基础用法
:::demo 支持`v-model`绑定。可用`width`控制输入框的宽度，数字类型默认是`px`，也支持字符串。
```html
<f-row>
<f-input width="200px"  v-model="value" placeholder="normal size"></f-input>
</f-row>

<script>
export default{
        data(){
           return {
               value:''           
          }
        },
        methods:{
       
       }
}
</script>
```
:::


## 图标嵌入
:::demo 设置`icon`在输入框内嵌入图标，还可以通过`icon-position`改变图标的位置，有`left`和`right`，默认是`left`。
```html
<f-row>
<f-input icon="sousuo" :width="200"   v-model="value" placeholder="search something...."></f-input>
<f-input icon="sousuo" style="margin-left: 20px" icon-position="right" :width="200"   v-model="value" placeholder="search something...."></f-input>
</f-row>

<script>
export default{
        data(){
           return {
               value:''           
          }
        },
        methods:{
       
       }
}
</script>
```
:::


## 尺寸大小
:::demo 设置`size`更改输入框的尺寸，提供`large`,`normal`和`small`，默认是`normal`
```html
<f-row>
<f-input size="large" icon="sousuo" :width="200"   v-model="value" placeholder="search something...."></f-input>
<f-input icon="sousuo" style="margin-left: 20px" :width="200"   v-model="value" placeholder="search something...."></f-input>
<f-input size="small"  style="margin-left: 20px" icon="sousuo" :width="200"   v-model="value" placeholder="search something...."></f-input>
</f-row>

<script>
export default{
        data(){
           return {
               value:''           
          }
        },
        methods:{
       
       }
}
</script>
```
:::

## 长度限制与清除
:::demo 设置`max-length`控制输入字符的长度，`show-limit`可以开启长度提示。同时提供`clearable`，设置为`true`时，hover出现删除图标，点击可以清空输入框，并触发`on-cancel`事件。/长度提示条的位置与嵌入图标居右是冲突的/
```html
<f-row>
<f-input show-limit  :max-length="10"  size="large" icon="zhuce" :width="300"   v-model="value1" placeholder="用户名不得超过10个字"></f-input>
</f-row>
<f-row>
<f-input show-limit-outside  clearable icon-position="right" :max-length="10"  size="large" icon="zhuce" :width="300"   v-model="value2" placeholder="用户名不得超过10个字"></f-input>
</f-row>

<script>
export default{
        data(){
           return {
               value1:'' ,          
               value2:'' ,          
          }
        },
        methods:{
       
       }
}
</script>
```
:::