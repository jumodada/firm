<template>
    <div id="xxx">
        <test></test>
    </div>
</template>

<script>
    export default {
        name: "start",
        components: {
            test: (function () {

                let render = function () {
                    let _vm = this
                    let _h = _vm.$createElement
                    let _c = _vm._self._c || _h
                    return _c(
                        "div",
                        [
                            _c("x-button", '开始', {attrs: {loading: _vm.loading}},)
                        ],
                    )
                }
                let staticRenderFns = []
                render._withStripped = true
                const democomponentExport = {
                    data() {
                        return {
                            loading: true
                        }
                    }
                }
                return {
                    render,
                    staticRenderFns,
                    ...democomponentExport
                }
            })()

        },
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
