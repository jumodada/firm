<style lang="scss">
    .firm-components-page{
        display: flex;
        width: 100%;
        &-content{
            padding: 20px;
            width: 100%;
            color:#313639;
            h2{
                text-align: left;
            }
            a{
                text-decoration: none;
                color:#ffb311;
                opacity: 0;
                &:hover{
                    opacity: 1;
                }
            }
        }
    }
</style>

<template>
    <div class="firm-components-page">
        <slider></slider>
       <div class="firm-components-page-content">
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
    import slider from '../slide'
    export default {
        name: "components",
        components:{
            slider
        },
        mounted() {
            this.renderAnchorHref()
        },
        methods:{
            renderAnchorHref() {
                const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
                const basePath = location.href.split('#').splice(0, 2).join('#')
                Array.prototype.slice.call(anchors).forEach(item => item.href = basePath + item.getAttribute('href'))
            },
        }
    }
</script>

