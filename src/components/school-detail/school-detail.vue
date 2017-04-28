<template lang="html">
  <div class="school-detail">
    <schoolDetailCommon></schoolDetailCommon>
    <div class="tab">
      <div class="tab-item" v-for="(v,index) in tabs">
          <router-link :to="{path:v.view}">{{v.text}}</router-link>
      </div>
    </div>
    <router-view :schoolBaseData="schoolBaseData" :majorData="majorData"></router-view>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
import schoolDetailCommon from '../school-detail/school-detail-common';
import $ from 'webpack-zepto';
export default {
  data() {
    return {
      schoolBaseData: {},
      majorData: {},
      tabs: [{
          text: '院校简介',
          view: '/schoolIntro?' + $.param(this.$route.query)
        },
        {
          text: '开设专业',
          view: '/openProfessional?' + $.param(this.$route.query)
        },
        {
          text: '招生计划',
          view: '/enrollmentPlan?' + $.param(this.$route.query)
        },
        {
          text: '录取情况',
          view: '/admissionStatus?' + $.param(this.$route.query)
        }
      ]
    };
  },
  methods: {
    // 根据sId拉取院校详细信息
    getSchoolBaseInfo() {
      $.get('http://s1.service.zhigaokao.cn/university/getRemoteUniversityById.do?universityId=' + this.$route.query.sId, (d) => {
        if (d.rtnCode === '0000000') {
          this.schoolBaseData = d.bizData;
          this.domActive = true;
        }
      });
    },
    // 根据sId拉取院校开设专业
    getMajorList() {
      $.get('http://s1.service.zhigaokao.cn/university/getRemoteUniversityMajorListByUniversityId.do?universityId=' + this.$route.query.sId, (d) => {
        if (d.rtnCode === '0000000') {
          this.majorData = d.bizData;
        }
      });
    }
  },
  mounted() {
    this.getSchoolBaseInfo();
    this.getMajorList();
  },
  components: {
    schoolDetailCommon,
    stickyFooter
  }
};
</script>

<style lang="scss">
</style>
