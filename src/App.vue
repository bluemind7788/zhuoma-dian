<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="stylus">
*
  margin 0
  padding 0
  
body
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  background-color #fff

.clearfix:after
  content "."
  display block
  clear both
  visibility hidden
  line-height 0
  height 0

#app, .view, body, html
  width 100%
  height 100%
ul, li
  list-style none
a
  text-decoration none
  
</style>
