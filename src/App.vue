<template>
<div id="app">
  <transition name="slide-fade">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
}

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 1000px;
  opacity: 0;
}

</style>
