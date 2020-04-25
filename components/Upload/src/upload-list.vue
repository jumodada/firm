<template>
        <transition-group
                class="f-upload-ul" name="fade-drop" tag="ul">
            <li v-for="(file,index) in fileLists" :key="file.uid">
               <transition name="fade-drop">
                   <div v-if="file.status!=='finished'">
                      <div class="f-upload-ul-file-info">
                          <Icon color="#c2c5cb" font-size="16" :name="formatName(file)"></Icon>
                          <span>{{file.name}}</span>
                          <Icon v-if="file.status==='fromOuter'" @click="handleRemove(index)" class="f-upload-ul-file-info-delete" font-size="12" name="wrong"></Icon>
                      </div>
                       <Progress v-if="file.status!=='fromOuter'" :status="processStatus(file)" animation="stripe" :percent="Math.floor(file.percent)" :bar-width="7"></Progress>
                   </div>
               </transition>
            </li>
        </transition-group>
</template>

<script>
    import Icon from '../../icon'
    import Progress from '../../progress'

    export default {
        name: "upload-list",
        components: {
            Icon,
            Progress
        },
        props: {
            fileLists: {
                type: Array,
                default: () => []
            },
            beforeRemove:Function
        },
        methods:{
            processStatus(file){
                if(file.status==='finished')return 'success'
                return 'normal'
            },
            handleRemove(idx){
                if(this.beforeRemove&&!this.beforeRemove(this.fileLists[idx],this.fileLists))return
                this.$parent.fileLists.splice(idx,1)
            },
            formatName(file){
                let formatName = file.name.split('.').pop().toLocaleLowerCase()||''
                let name = 'lixian'
                let format = {
                    image:['gif','jpg','jpeg','png','bmp','webp'],
                    film:['mp4','m3u8','rmvb','avi','swf','3gp','mkv','flv'],
                    notes:['mp3','wav','wma','ogg','aac','flac'],
                    document:['doc','txt','docx','pages','epub','pdf'],
                    stats:['numbers','csv','xls','xlsx'],
                    videocamera:['keynote','ppt','pptx']
                 }
                 Object.keys(format).forEach(key=>{if(format[key].indexOf(formatName)>-1)name= key})
                return name
            }
        }
    }
</script>
