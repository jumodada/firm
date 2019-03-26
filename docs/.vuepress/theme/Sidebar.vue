<template>
 <div>
   <p @click="toggleSliderBar"  :class="{'page-x-icon-move':canIMove}" class="page-x-icon">
     <img  style="height: 2em;width: 2em"  src="./liebiao.svg" alt="">
   </p>
   <transition name="slide">
     <div class="sidebar" v-show="toggle">
       <NavLinks/>
       <slot name="top"/>
       <ul class="sidebar-links" v-if="items.length">
         <li v-for="(item, i) in items" :key="i">
           <SidebarGroup
                   v-if="item.type === 'group'"
                   :item="item"
                   :first="i === 0"
                   :open="i === openGroupIndex"
                   :collapsable="item.collapsable || item.collapsible"
                   @toggle="toggleGroup(i)"
           />
           <SidebarLink v-else :item="item"/>
         </li>
       </ul>
       <slot name="bottom"/>
     </div>
   </transition>
 </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive } from './util'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ['items'],

  data () {
    return {
      openGroupIndex: 0,
        toggle:true,
        canIMove:false
    }
  },

  created () {
    this.refreshIndex()
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },

  methods: {
      toggleSliderBar(){
          this.canIMove = !this.canIMove
          this.toggle =!this.toggle
          this.$parent.$children[2].canIMove=this.canIMove
      },
    refreshIndex () {
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      return isActive(this.$route, page.path)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import 'styles/config.styl'

.slide-enter-active
  transition all .4s ease

.slide-leave-active {
  transition all .4s
}
.slide-enter, .slide-leave-to
  transform translateX(-100%)

.page-x-icon
  transition .4s all ease
  position fixed
  top 7%
  left 23%
  z-index 10
  cursor pointer
.page-x-icon-move
  position fixed
  top 7%
  left 3%

.sidebar
  &::-webkit-scrollbar
    display none
    transition .4s all ease-in
  ul
    padding 0
    margin 0
    list-style-type none
    color:white
    transition .4s all ease-in
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  .sidebar-links
    padding 1.5rem 0

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    .sidebar-links
      padding 1rem 0
</style>
