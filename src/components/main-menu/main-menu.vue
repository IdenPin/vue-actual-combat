<template lang="html">
  <div class="main-menu">
    <img src="./img/banner.png" class="home-banner">
    <div class="container-content">
      <div class="user-eara">
        <span v-text="userLocation"></span>
        <router-link :to="{name:''}" class="modify-user-area">修改</router-link>
      </div>
      <ul class="item-list">
        <li>
          <router-link :to="{name:'scoreAnalysis'}">
            <i class="icon icon-cjfx"></i>
            <span>成绩分析</span>
            <em>有效期：2016.09.10-2017.09.10</em>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'acceptRate'}">
            <i class="icon icon-lqlyc"></i>
            <span>录取率预测</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'schoolList'}">
            <i class="icon icon-yxlqcx"></i>
            <span>院校信息查询</span>
          </router-link>
        </li>
      </ul>
    </div>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
export default {
  data() {
    return {
      'userLocation': "天津市，天津市南开区实验学校"
    };
  },
  components: {
    stickyFooter
  }
};
</script>

<style lang="scss">
@import "../../assets/style/common.scss";
@import "main-menu";

</style>
