import upload from './src/upload'

upload.install = function(Vue) {
    Vue.component(upload.name, upload)
}

export default upload
