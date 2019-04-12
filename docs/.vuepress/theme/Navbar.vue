<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <router-link
            :to="$localePath"
            class="home-link"
    >
      <img
              class="logo"
              v-if="$site.themeConfig.logo"
              :src="$withBase($site.themeConfig.logo)"
              :alt="$siteTitle"
      >
      <span
              ref="siteName"
              class="site-name"
              v-if="$siteTitle"
              :class="{ 'can-hide': $site.themeConfig.logo }"
      >
         <div class="site-name-span">
            <img class="site-name-img" src="./xin.svg" alt="">
           {{$siteTitle}}
         </div>
      </span>
    </router-link>

    <div
            class="links"
            :style="{
        'max-width': linksWrapMaxWidth + 'px'
      }"
    >
      <AlgoliaSearchBox
              v-if="isAlgoliaSearch"
              :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>
      <NavLinks class="can-hide"/>
       <a href="https://github.com/jumodada/vueXin" class="navbar-icon" target="to-github">
         <img  style="height: 2em;width: 2em"  src="./github.svg" alt="">
       </a>
    </div>
    <div class="progress-bar" ref="progressBar"></div>
  </header>
</template>

<script>
    import SidebarButton from './SidebarButton.vue'
    import AlgoliaSearchBox from '@AlgoliaSearchBox'
    import SearchBox from './SearchBox.vue'
    import NavLinks from './NavLinks.vue'

    export default {
        components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

        data () {
            return {
                linksWrapMaxWidth: null
            }
        },
        beforeDestroy(){
            var _this = this
            window.removeEventListener('scroll',function percent(){
                var  scrollTop = document.documentElement.scrollTop
                var  totalHeight = document.body.offsetHeight-window.screen.availHeight+ _this.$el.offsetHeight
                _this.$refs.progressBar.style.width= `${(scrollTop/totalHeight)*105}%`
            }) },
        mounted () {
            var _this = this
            window.addEventListener('scroll',function percent(){
                var  scrollTop = document.documentElement.scrollTop
                var  totalHeight = document.body.offsetHeight-window.screen.availHeight+ _this.$el.offsetHeight
                _this.$refs.progressBar.style.width= `${(scrollTop/totalHeight)*105}%`
            })
            const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
            const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
            const handleLinksWrapWidth = () => {
                if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
                    this.linksWrapMaxWidth = null
                } else {
                    this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
                        (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
                }
            }
            handleLinksWrapWidth()
            window.addEventListener('resize', handleLinksWrapWidth, false)
        },

        computed: {
            algolia () {
                return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
            },

            isAlgoliaSearch () {
                return this.algolia && this.algolia.apiKey && this.algolia.indexName
            }
        }
    }

    function css (el, property) {
        // NOTE: Known bug, will return 'auto' if style value is 'auto'
        const win = el.ownerDocument.defaultView
        // null means not to return pseudo styles
        return win.getComputedStyle(el, null)[property]
    }
</script>

<style scoped  lang="stylus">
  @import 'styles/config.styl'

  $navbar-vertical-padding = 0.9rem
  $navbar-horizontal-padding = 1.5rem

  .navbar
    padding $navbar-vertical-padding $navbar-horizontal-padding
    line-height $navbarHeight - 1.4rem
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 10px 20px 0 rgba(0,0,0,0.12)
    position fixed
    transition .4s all ease-in
    .progress-bar
      position fixed
      top 4rem
      left -30px
      width 0
      height 4px
      background-color #ffcc66
    .navbar-icon
      display flex
      position relative
      top 3px
      width 2em
      height 2em
      justify-content center
      align-items center
    a, span, img
      display inline-block
    .logo
      height $navbarHeight - 1.4rem
      min-width $navbarHeight - 1.4rem
      margin-right 0.8rem
      vertical-align top
    .site-name
      font-size 2rem
      font-weight 600
      color #f89708
      position relative
    .site-name-span
       display inline-flex
       justify-content center
       align-items center
       outline none
    .site-name-img
      position relative
      top -4px

    .links
      padding-left 1.5rem
      box-sizing border-box
      background-color rgb(81, 90, 110)
      white-space nowrap
      font-size 0.9rem
      position absolute
      right $navbar-horizontal-padding
      top $navbar-vertical-padding
      display flex
      .search-box
        flex: 0 0 auto
        vertical-align top
      .nav-links
        flex 1

  @media (max-width: $MQMobile)
    .navbar
      padding-left 4rem
      .can-hide
        display none
      .links
        background-color rgb(81, 90, 110)
        padding-left 1.5rem
</style>

