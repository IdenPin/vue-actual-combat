<template lang="html">
  <div class="school-detail">
      <div id="header-wrapper">
          <!-- 院校基础信息 -->
          <div class="university-base-info" id="school-base-info">
              <div class="school-logo">
                  <img :src="schoolBaseData.photoUrl | schoolAvatarUrl">
                  <!-- <img src="../assets/images/school-default-logo.png" alt=""> -->
              </div>
              <div class="school-info">
                  <div class="university-name">{{schoolBaseData.name}}</div>
                  <div class="university-level">
                      {{schoolBaseData.property}}
                  </div>
                  <div class="university-location">
                      <span class="location">
                        <i class="icon icon-location"></i>
                        <span class="location-area">{{schoolBaseData.province}}</span>
                      </span>
                      <span class="rank">
                        <i class="icon icon-flag"></i>
                        <span class="location-area">排名：{{schoolBaseData.rank}}</span>
                      </span>
                  </div>
              </div>
            </div>
            <div class="enroll-predict">
                <a class="enroll-predict-inner" href="javascript:void(0)">录取率预测</a>
            </div>
      </div>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
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
    toggle(i, v) {
      this.active = i;
      this.currentView = v;
    },
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
    stickyFooter
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
@import 'style/school-detail-common.scss';
</style>
