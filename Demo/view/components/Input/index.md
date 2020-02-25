# Input输入框 


## 输入框
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
<f-row>
<f-input show-surplus  :max-length="20" v-model="value" placeholder="123"></f-input>
{{value}}
</f-row>

<script>
export default{
        data(){
           return {
               value:''           
          }
        }
}
</script>
```
:::



