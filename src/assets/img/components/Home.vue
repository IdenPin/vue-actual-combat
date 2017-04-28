<template lang="html">
  <div>
    <top-head header-title="智高考服务平台" :fix-head="true"></top-head>
    <img src="../assets/images/intro-banner.png" alt="" class="home-banner">

    <div class="container-content">
      <div class="user-eara">
        <span v-text="userLocation"></span>
        <router-link :to="{name:'EventTest'}" class="modify-user-area">修改</router-link>
      </div>

      <ul class="item-list">
        <li>
          <router-link :to="{name:'ComParentChild'}">
            <i class="icon icon-cjfx"></i>
            <span>成绩分析</span>
            <em>有效期：2016.09.10-2017.09.10</em>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'TableSort'}">
            <i class="icon icon-lqlyc"></i>
            <span>录取率预测</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'SchoolList'}">
            <i class="icon icon-yxlqcx"></i>
            <span>院校信息查询</span>
          </router-link>
        </li>
      </ul>
    </div>
    <bottom-footer :fix-footer="true"></bottom-footer>
  </div>
</template>

<script>
require('../assets/scss/home.scss');
import topHead from '../components/Header.vue';
import bottomFooter from '../components/Footer.vue';

export default {
    data() {
        return {
            userLocation: '天津市，天津市南开区实验学校'
        }
    },
    components: {
        topHead,
        bottomFooter
    }
}
</script>

<style lang="scss">
</style>
