<template lang="html">
    <header class="common-header">
      <span @click="foo2=!foo2">显示/隐藏</span>
      <span v-text="commonHeaderTitle" @click="emitEvent" :class="[foo1,foo2 ? 'showOrHide':'']"></span>
    </header>
</template>

<script>
export default {
    props:{
      commonHeaderTitle:{
        type:String,
        required:true
      }
    },
    data() {
        return {
            foo2: true,
            foo1:'toggleClass'
        }
    },
    methods:{
      emitEvent(){
        this.$emit('actionDo');
      }
    }
}
</script>

<style lang="scss">
.common-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 10px;
    color: #fff;
    background: #7373f5;
}
.showOrHide {
  visibility: visible!important;
}
.toggleClass{
  font-size: 15px;
  visibility: hidden;
}
</style>
