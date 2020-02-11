# Upload上传组件


## 表格
:::demo 暂定
```html
<f-upload :default-file-lists="fileLists" :on-exceeded="exceeded" :max-length="3" multiple action="https://vue-wheel-node-server.herokuapp.com/upload">
    <f-button  icon="shangchuan">上传</f-button>
</f-upload>

<script>
export default {
    data(){
        return {
          fileLists:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
