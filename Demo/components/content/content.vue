<style lang="scss">
    .firm-components-page {
        display: flex;
        width: 100%;

        &-content {
            padding: 20px 20px 20px 80px;
            width: 100%;
            color: #313639;
            height: calc(100vh - 70px);
            overflow-x: hidden;
            overflow-y: auto;
            scroll-behavior: smooth;
            h1 {
                margin-left: 21px;
            }

            h2, h3, h4, h5 {
                text-align: left;

                &:hover {
                    a {
                        opacity: 1;
                    }
                }
            }

            a {
                text-decoration: none;
                color: #ffb311;
                opacity: 0;
            }
            >div >table{
                width: 100%;
                color: #949ba9;
                font-size: 14px;
                margin-left: 10px;
                border-collapse: collapse;
                td,tr{
                    text-align: left;
                }
                th{
                    color: #5a6a7a;
                    padding-left: 10px;
                }
                td{
                    padding: 15px 10px;
                    max-width: 230px;
                    white-space: pre-wrap;
                    border-bottom: .5px solid #e9eaed;
                    code{
                        color: #1a2a3a;
                        background-color: #ffecd9;
                        margin: 0 4px;
                        display: inline-block;
                        padding: 2px 5px;
                        font-size: 15px;
                        border-radius: 4px;
                    }
                    &:first-child{
                        color: #7e8592;
                    }
                }
            }
            s{
                text-decoration: none;
                color: red;
            }
        }
    }
    .catalogue{
        width: 13vw;
        margin-top: 40px;
    }
    .row{
        margin-bottom: 10px;
        color: #313639;
    }
</style>

<template>
    <div class="firm-components-page">
        <slider></slider>
        <div v-x-scroll="contentScroll" ref="content" class="firm-components-page-content f-scrollbar-hidden">
            <router-view></router-view>
        </div>
        <catalogue ref="catalogue" class="catalogue"></catalogue>
    </div>
</template>

<script>
    import slider from '../slide'
    import catalogue from '../catalogue'
    import xScroll from "../../../src/directive/scroll"
    export default {
        name: "components",
        directives: {
            xScroll
        },
        components: {slider, catalogue},
        mounted() {
            this.editAnchorHref()
            this.$nextTick(() => this.moveToAnchorHref())
        },
        methods: {
            editAnchorHref() {
                const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
                const basePath = location.href.split('#').splice(0, 2).join('#')
                Array.prototype.slice.call(anchors).forEach(item => item.href = basePath + item.getAttribute('href'))
            },
            moveToAnchorHref() {
                let $el = Array.prototype.slice.call(document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')).find(anchor => this.$route.hash.slice(1) === anchor.href.split('#')[2])
                if ($el) this.$refs.content.scrollTop = $el.offsetTop - 80
            },
            contentScroll(){
               this.$refs.catalogue.isOnScroll(this.$refs.content)
            }
        },
        beforeRouteUpdate(to, from, next) {
            next()
            setTimeout(() => {
                if (to.path !== from.path) {
                    document.documentElement.scrollTop = document.body.scrollTop = 0
                    this.editAnchorHref()
                }
            }, 23)
        },
        watch: {
            '$route'() {
                this.moveToAnchorHref()
            }
        }

    }
</script>

