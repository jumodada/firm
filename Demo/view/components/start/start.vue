<template>
    <div id="xxx">
    </div>
</template>

<script>
    import md from '../install/index.md'
    import showdown from 'showdown'
    import Vue from 'vue'
    export default {
        name: "start",
        mounted() {
            // var converter = new showdown.Converter()
            // let text = md.toString()
            // let html = converter.makeHtml(text)
            // html = '<div>' + html + '</div>'
            // var Profile = Vue.extend({
            //     template:html,
            //     data: function () {
            //         return {
            //             firstName: 'Walter',
            //         }
            //     }
            // })
            // new Profile().$mount('#xxx')
        }
    }
</script>

<style scoped>

</style>
