# Button按钮 


## 按钮类型
:::demo 支持五种类型的按钮，使用`dashed`、`type`、`round`、`plain`,`circle`为按钮添加固定样式
```html
<f-row>
<f-button>Default</f-button> 
<f-button dashed>Dashed</f-button> 
<f-button type="primary">Type</f-button> 
<f-button round>Round</f-button>  
<f-button type="primary" plain>Plain</f-button>
<f-button icon="github1" circle></f-button>  
</f-row>

<f-row> 
<f-button type="primary">Primary</f-button> 
<f-button type="info">Info</f-button> 
<f-button type="warn">Warn</f-button> 
<f-button type="error">Error</f-button> 
<f-button type="success">Success</f-button>
</f-row>
 

```
:::


## 图标位置
:::demo 设置`position`改变图标在按钮内容左右的位置，默认是`left`
```html
<f-row>
<f-button icon="left" type="primary">left</f-button>    
<f-button icon="right" type="primary" position="right">right</f-button>    
</f-row>

```
:::


## 按钮大小
:::demo 设置`size`可以更改Button的大小尺寸，提供四种大小`big`、`medium`、`small`、`mini`
```html
<f-row>
<f-button-group>
<f-button @click="buttonSize='big'">big</f-button>
<f-button @click="buttonSize='medium'">medium</f-button>
<f-button @click="buttonSize='small'">small</f-button>
<f-button @click="buttonSize='mini'">mini</f-button>
</f-button-group>        
</f-row>

<f-row>
<f-button type="primary" :size="buttonSize">Size</f-button>
</f-row>

<script>
export default {
    data(){
        return {
            buttonSize:'big'
        }
    }
}

</script>


```
:::


## 加载中
:::demo 
```html
<f-row>
<f-button >Size</f-button>
</f-row>

<script>
export default {
    data(){
        return {
            buttonSize:'big'
        }
    }
}

</script>


```
:::

