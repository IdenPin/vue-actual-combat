<template lang="html">
  <div class="school-list">
    <!-- <top-header header-title="院校信息" :fix-head="true"></top-header> -->
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
      <!-- <mt-spinner color="#108EE9" v-show="scroll" style="text-align:center" type="triple-bounce"></mt-spinner> -->
    </div>
    <pulseLoader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></pulseLoader>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import $ from 'webpack-zepto';
import LS from 'store';
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
        size: '12px',
        loading: true,
        color: '#108EE9'
      }
    };
  },
  mounted() {
    if (LS.get('cache_scrollTop')) {
      this.schooListData = LS.get('cache_schooListData');
      this.searchKey = LS.get('cache_searchKey');
      this.$nextTick(() => $(window).scrollTop(LS.get('cache_scrollTop')));
    } else {
      this.getSchoolList();
    }
    // 滚动加载
    $(window).on('scroll', utils.throttle(this.getScrollData, 500));
  },
  methods: {
    getSchoolList() {
      let params = $.param(this.searchKey);
      var _this = this;
      $.get('http://s1.service.zhigaokao.cn/university/getRemoteUniversityList.do?' + params, (d) => {
        this.scroll = true;
        if (d.rtnCode === '0000000') {
          if (d.bizData.universityList.length === 0) {
            this.scroll = false;
          }
          d.bizData.universityList.forEach(function(v) {
            _this.schooListData.push(v);
          });
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
.school-list {
    margin-bottom: $footerHeight;
    .v-spinner {
        text-align: center;
        margin-top: px2rem(15);
    }
}
</style>
