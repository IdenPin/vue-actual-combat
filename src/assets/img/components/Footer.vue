<template lang="html">
    <footer class="footer" v-if="fixFooter">
      一站式高考升学专家<router-link :to="'http://www.zhigaokao.cn'" exact class="zgk-foot-link">智高考</router-link>提供技术支持
    </footer>
</template>

<script>
export default {
    props: {
        fixFooter: Boolean
    },
    data() {
        return {
            headerTitle: ''
        }
    }
}
</script>

<style lang="scss">

</style>
