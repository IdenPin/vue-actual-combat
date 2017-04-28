<template lang="html">
  <div>
    <top-header header-title="院校信息" :fix-head="true"></top-header>
    <div class="container-content">
      <ul class="university-list">
        <li v-for="i in schooListData">
          <!-- <router-link to=""> -->
          <router-link :to="{name:'SchoolDetail',query:{sId:i.id}}">
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
      <mt-spinner color="#108EE9" v-show="scroll" style="text-align:center" type="triple-bounce"></mt-spinner>
    </div>
    <bottom-footer :fix-footer="true"></bottom-footer>
  </div>
</template>

<script>
require('../assets/scss/school-list.scss')
import topHeader from '../components/Header'
import bottomFooter from '../components/Footer'
import $ from 'webpack-zepto'
import utils from '../libs/utils'
// https://github.com/marcuswestin/store.js
import LS from 'store';
export default {
    data() {
        return {
            scroll: true,
            schooListData: [],
            searchKey: {
                universityName: '',
                areaid: '',
                type: '',
                educationLevel: '',
                property: 1,
                offset: 0,
                rows: 10,
            }
        }
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
        $(window).on('scroll', utils.throttle(this.getScrollData, 300, 1000));
    },
    beforeRouteLeave(to, from, next) {
        // ===================== beforeRouteLeave 路由切换离开前执行（3）
        // 如果跳转到详情页面，则记录关键数据
        // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
        if (to.name === 'schoolDetail') {
            LS.set('cache_scrollTop', $(window).scrollTop());
            LS.set('cache_schooListData', this.schooListData);
            LS.set('cache_searchKey', this.searchKey);
        }
        $(window).off('scroll');
        next();
    },
    beforeRouteEnter(to, from, next) {
        // ===================== beforeRouteEnter 最先执行（1）
        if (from.name !== 'schoolDetail') {
            // 页面切换移除之前记录的数据集
            if (LS.get('cache_scrollTop')) {
                LS.remove('cache_scrollTop');
                LS.remove('cache_schooListData');
                LS.remove('cache_searchKey');
            }
        }
        next();
    },
    methods: {
        // 获取院校数据
        getSchoolList() {
            let params = $.param(this.searchKey);
            var _this = this;
            $.get('http://zj.test.zhigaokao.cn/university/getRemoteUniversityList.do?' + params, (d) => {
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
        // 滚动加载数据
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
        topHeader,
        bottomFooter
    }
}
</script>

<style lang="scss">
</style>
