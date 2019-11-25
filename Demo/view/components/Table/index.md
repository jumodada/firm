# Table表格


## 表格
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
<f-row>
    <f-table 
    :columns="columns"
     :data="data">
    </f-table>
</f-row>

<script>
export default {
    data(){
        return {
            columns:[
                {title:'名字',key:'name'}
            ],
            data:[
                {key:1,name:'夏克明'},
                {key:2,name:'夏克明'},
                {key:3,name:'夏克明'},
                {key:4,name:'夏克明'},
                ]
        }
    }
}
</script>

```
:::
