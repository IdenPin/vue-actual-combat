<template lang="html">
    <header v-text="headerTitle" class="header" v-if="fixHead">
    </header>
</template>

<script>
export default {
  props:{
    headerTitle: String,
    fixHead:Boolean
  }
}
</script>

<style lang="scss">

</style>
