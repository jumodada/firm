# Upload上传组件


## 表格
:::demo 暂定
```html
<f-upload :on-exceeded="exceeded" :max-length="3" multiple action="https://vue-wheel-node-server.herokuapp.com/upload">
    <f-button  icon="shangchuan">上传</f-button>
</f-upload>

<script>
export default {
    data(){
        return {
       
        }
    },
    methods:{
      exceeded(files){
         console.log(files)
      }      
    }
 
}
</script>

```
:::
