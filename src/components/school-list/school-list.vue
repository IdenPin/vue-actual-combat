<template lang="html">
  <div class="school-list">
    <div class="select-condition">
      <ul>
        <li><i class="icon icon-search-input"></i></li>
        <li>院校属地</li>
        <li>院校分类</li>
        <li>学历层次</li>
        <li>院校特征</li>
      </ul>
    </div>
    <div class="container-content">
      <ul class="university-list">
        <li v-for="i in schooListData">
          <router-link :to="{name:'schoolDetail',query:{sId:i.id}}">
            <div class="school-logo">
                <img :src="i.photoUrl | schoolAvatarUrl" />
            </div>
            <div class="school-info">
                <div class="university-name">{{i.name}}</div>
                <div class="university-level">
                    <span v-for="j in i.propertys" >{{j | raplaceLabel}}</span>
                </div>
                <div class="university-location">
                    <span class="location">
                        <i class="icon icon-location"></i>
                        <span class="location-area">{{i.province}}</span>
                    </span>
                    <span class="rank">
                        <i class="icon icon-flag"></i>
                        <span class="location-area">排名：{{i.rank}}</span>
                    </span>
                </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <pulseLoader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></pulseLoader>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import $ from 'webpack-zepto';
import store from 'store';
import utils from '../../libs/utils';
import pulseLoader from 'vue-spinner/src/PulseLoader.vue';
import stickyFooter from '../sticky-footer/sticky-footer';
export default {
  data() {
    return {
      scroll: true,
      schooListData: [],
      searchKey: {
        universityName: '',
        areaid: '',
        type: '',
        educationLevel: 1,
        property: '',
        offset: 0,
        rows: 10
      },
      spinner: {
        size: '14px',
        loading: true,
        color: '#108EE9'
      }
    };
  },
  mounted() {
    if (store.get('cache_scrollTop')) {
      this.schooListData = store.get('cache_schooListData');
      this.searchKey = store.get('cache_searchKey');
      this.$nextTick(() => $(window).scrollTop(store.get('cache_scrollTop')));
    } else {
      this.getSchoolList();
    }
    // 滚动加载
    $(window).on('scroll', utils.throttle(this.getScrollData, 500));
  },
  beforeRouteEnter(to, from, next) {
    // ===================== beforeRouteEnter 最先执行（1）
    if (from.name !== 'schoolIntro') {
      // 页面切换移除之前记录的数据集
      if (store.get('cache_scrollTop')) {
        store.remove('cache_scrollTop');
        store.remove('cache_schooListData');
        store.remove('cache_searchKey');
      }
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    // ===================== beforeRouteLeave 最后执行（3）
    if (to.name === 'schoolDetail') {
      store.set('cache_scrollTop', $(window).scrollTop());
      store.set('cache_schooListData', this.schooListData);
      store.set('cache_searchKey', this.searchKey);
    }
    $(window).off('scroll');
    next();
  },
  methods: {
    getSchoolList() {
      let params = $.param(this.searchKey);
      var _this = this;
      $.get('http://s1.service.zhigaokao.cn/university/getRemoteUniversityList.do?' + params, (d) => {
        this.scroll = true;
        let {
          rtnCode,
          bizData: {
            universityList
          }
        } = d;
        if (rtnCode === '0000000') {
          let {
            length: Len
          } = universityList;
          if (Len === 0) {
            this.scroll = false;
          }
          universityList.forEach(v => _this.schooListData.push(v));
        }
      });
    },
    getScrollData() {
      if (this.scroll) {
        let totalheight = parseInt($(window).height(), 20) + parseInt($(window).scrollTop(), 20);
        if ($(document).height() <= totalheight + 200) {
          this.scroll = false;
          this.searchKey.offset += this.searchKey.rows;
          this.getSchoolList();
        }
      }
    }
  },
  components: {
    stickyFooter,
    pulseLoader
  }
};
</script>

<style lang="scss">
@import "../../assets/style/common.scss";
@import "school-list";
</style>
