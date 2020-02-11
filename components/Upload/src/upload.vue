<template>
    <div class="f-upload">
        <div class="f-upload-select"
             @click="handleClick"
        >
            <input
                    @change="handleChange"
                    class="f-upload-select-input"
                    ref="input"
                    :multiple="multiple"
                    :accept="accept"
                    type="file">
            <slot></slot>
        </div>
        <uploadList :fileLists="fileList"></uploadList>
    </div>
</template>

<script>
    import ajax from './ajax'
    import {isFile} from "../../../src/utils/type-of"
    import uploadList from './upload-list'
    export default {
        name: "f-upload",
        components:{
            uploadList
        },
        data(){
            return {
                fileList: [],
                tempIndex:1
            }
        },
        props:{
            name: {
                type: String,
                default: 'file'
            },
            action: {
                type: String,
                require:true
            },
            data: {
                type: Object
            },
            disabled:{
                type:Boolean,
                default: false
            },
            multiple:{
                type:Boolean,
                default:false
            },
            accept:{
                type:String
            },
            beforeUpload:Function,
            onFormatError: {
                type: Function,
                default () {
                    return {}
                }
            },
            onProgress: {
                type: Function,
                default () {
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default () {
                    return {};
                }
            },
            onError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onExceededSize: {
                type: Function,
                default () {
                    return {};
                }
            },
            format: {
                type: Array,
                default () {
                    return [];
                }
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
        },
        methods:{
            handleChange (e) {
                const {files} = e.target
                this.uploadFiles(files)
                this.$refs.input.value = null
            },
            handleClick(){
                if (this.disabled) return
                this.$refs.input.click()
            },
            uploadFiles(files){
                let postFiles = Array.prototype.slice.call(files)
                if (!this.multiple)postFiles.splice(1)
                postFiles.forEach(file => this.upload(file))
            },
            upload (file) {
                if (!this.beforeUpload) return this.post(file)
                const before = this.beforeUpload(file)
                if (before && before.then) {
                    before.then(processedFile => {
                        if (isFile(processedFile)) {
                            this.post(processedFile)
                        } else {
                            this.post(file)
                        }
                    }, () => {
                         //todo
                    });
                } else if (before !== false) {
                    this.post(file)
                } else {
                    //todo
                }
            },
            updateFileList (file) {
                file.uid = Date.now() + this.tempIndex++
                const _file = {
                    status: 'uploading',
                    name: file.name,
                    size: file.size,
                    percent: 0,
                    uid: file.uid,
                    showProgress: true
                };

                this.fileList.push(_file)
            },
            post (file) {
                if (this.format.length) {
                    const _file_format = file.name.split('.').pop().toLocaleLowerCase()
                    const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format)
                    if (!checked) {
                        this.onFormatError(file, this.fileList)
                        return false
                    }
                }
                if (this.maxSize) {
                    if (file.size > this.maxSize * 1024) {
                        this.onExceededSize(file, this.fileList)
                        return false
                    }
                }

                this.updateFileList(file)
                let formData = new FormData()
                formData.append(this.name, file)
                ajax({
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: file,
                    data: this.data,
                    filename: this.name,
                    action: this.action,
                    onProgress: e => {
                        this.handleProgress(e, file);
                    },
                    onSuccess: res => {
                        this.handleSuccess(res, file);
                    },
                    onError: (err, response) => {
                        this.handleError(err, response, file);
                    }
                })
            },
            getFile (file) {
                return this.fileList.find(_f => file.uid === _f.uid)
            },
            handleProgress (e, file) {
                const _file = this.getFile(file)
                this.onProgress(e, _file, this.fileList)
                _file.percent = e.percent || 0
            },
            handleSuccess (res, file) {
                const _file = this.getFile(file)
                if (_file) {
                    _file.status = 'finished'
                    _file.response = res

                    this.onSuccess(res, _file, this.fileList)
                    setTimeout(() => {
                        _file.showProgress = false
                    }, 700)
                }
            },
            handleError (err, response, file) {
                const _file = this.getFile(file)
                const fileList = this.fileList
                _file.status = 'fail'
                fileList.splice(fileList.indexOf(_file), 1)
                this.onError(err, response, file)
            },
        }
    }
</script>
