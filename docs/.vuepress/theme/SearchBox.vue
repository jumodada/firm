<template>
  <div class="search-box">
  <div class="search-box-search">
    <img ref="search" @click="inputShow=!inputShow" class="search-box-search-img" src="./search.svg" alt="">
    <transition
            @before-enter="beforeEnter"
            @enter="Enter"
            @before-leave="beforeLeave"
            @leave="leave"
    >
     <input
             @input="query = $event.target.value"
             aria-label="Search"
             :value="query"
             :class="{ 'focused': focused }"
             autocomplete="off"
             spellcheck="false"
             @focus="focused = true"
             @blur="focused = false"
             @keyup.enter="go(focusIndex)"
             @keyup.up="onUp"
             @keyup.down="onDown"
             v-show="inputShow"
     >
    </transition>
  </div>
    <ul
      class="suggestions"
      v-if="showSuggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path" @click.prevent>
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      inputShow:false
    }
  },

  computed: {
    showSuggestions () {
      return (
        this.focused &&
        this.suggestions &&
        this.suggestions.length
      )
    },

    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const { pages, themeConfig } = this.$site
      const max = themeConfig.searchMaxSuggestions || 5
      const localePath = this.$localePath
      const matches = item => (
        item.title &&
        item.title.toLowerCase().indexOf(query) > -1
      )
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }
        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              }))
            }
          }
        }
      }
      return res
    },

    // make suggestions align right when there are not enough items
    alignRight () {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },

  methods: {
      beforeEnter(el) {
          el.style.width = 0
          el.style.transition='.35s all ease-in-out'
          this.$refs.search.style.transform = 'translateX(-15rem)'
      },
      Enter(el){
             setTimeout(()=>{
                 el.style.width = ''
             },15)
      },
      beforeLeave(el){
          el.style.transition='.35s all ease-in-out'
          el.style.width = ''
      },
      leave(el) {
          el.style.width = 0
          this.$refs.search.style.transform = 'translateX(0)'
      },
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },

    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },

    go (i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },

    focus (i) {
      this.focusIndex = i
    },

    unfocus () {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
@import 'styles/config.styl'

.slide-fade-enter-active,.slide-fade-leave-active
  transition all .3s ease

.slide-fade-enter, .slide-fade-leave-to
   opacity 0

.search-box
  display inline-block
  position relative
  margin-right 1rem
 .search-box-search
   position absolute
   top -1rem
   left -20rem
   display inline-flex
   justify-content center
   align-items center
   cursor pointer
 .search-box-search-img
   transition .35s all ease
   position relative
   left 15rem
  input
    cursor text
    width 14rem
    color #ef6c14
    display inline-block
    border none
    border-bottom 3px solid #ef6c14
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .35s ease
    background #515a6e
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
  .suggestions
    background #fff
    width 20rem
    position absolute
    top 1.5rem
    border 1px solid darken($borderColor, 10%)
    border-radius 6px
    padding 0.4rem
    list-style-type none
    &.align-right
      right 0
  .suggestion
    line-height 1.4
    padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    a
      white-space normal
      color lighten($textColor, 35%)
      .page-title
        font-weight 600
      .header
        font-size 0.9em
        margin-left 0.25em
    &.focused
      background-color #f3f4f5
      a
        color $accentColor

@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      &:focus
        cursor text
        left 0
        width 10rem

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    .suggestions
      left 0

@media (max-width: $MQMobile)
  .search-box
    margin-right 0
    input
      left 1rem
    .suggestions
      right 0

@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width calc(100vw - 4rem)
    input:focus
      width 8rem
</style>
