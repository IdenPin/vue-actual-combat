<template lang="html">
  <div>
    <top-header header-title="院校详情" :fix-head="true"></top-header>
    <div class="container-content">

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




    <div id="content-wrapper">
      <div class="university-detail-info">
          <ul class="main-content-tabs">
              <li @click="toggle(index,tab.view)" v-for="(tab,index) in tabs" :class="{active:active==index}">
                    {{tab.type}}
              </li>
          </ul>
      </div>
      <div class="main-content">
            <div class="swiper-container content-container">
                <div class="swiper-wrapper content-wrapper">
                    <component :is="currentView" :schoolBaseData="schoolBaseData" :majorData="majorData" v-if="domActive"></component>
                    <!-- 院校简介 -->
                    <!-- <div class="swiper-slide hide" id="school-info-li">
                        <div class="school-detail-info">
                            <div>院校类型：{{uData.typeName}}</div>
                            <div>学历层次：{{uData.levelName}}</div>
                            <div>院校隶属：{{uData.subjection}}</div>
                            <div>所在省份：{{uData.province}}</div>
                            <div>院校网址：{{uData.url}}</div>
                            <div>联系电话：{{uData.contactPhone}}</div>
                            <div>院校地址：{{uData.address}}</div>
                            <p v-html="uData.universityIntro"></p>
                        </div>
                    </div> -->
                    <!-- 开设专业 -->
                    <!-- <div class="swiper-slide hide">
                        <div class="all-major-container">
                            <div class="major-tab-container">
                                <ul class="major-tab" id="major-tab">
                                  <li data-type="">key</li>
                                </ul>
                            </div>
                            <div class="major-container">
                                <ul class="specific-major-list" id="major-container"></ul>
                            </div>
                        </div>
                    </div> -->
                    <!-- 招生计划 -->
                    <div class="swiper-slide hide">
                        <div class="enrolling-plan-container">
                            <div class="enrolling-plan-tab-container">
                                <ul class="enrolling-plan-tab">
                                    <li id="income-plan-year"></li>
                                    <li id="income-plan-type"></li>
                                    <li id="income-plan-batch"></li>
                                </ul>
                            </div>
                            <table class="enroll-plan-table" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width="55%">专业名称</th>
                                        <th>计划人数</th>
                                        <th>学制</th>
                                        <th>学费</th>
                                    </tr>
                                </thead>
                                <!-- 招生计划table -->
                                <tbody id="enroll-plan"></tbody>
                            </table>
                                <tr>
                                    <td>majoredName</td>
                                    <td>planEnrolling</td>
                                    <td>lengthOfSchooling</td>
                                    <td>schoolFee</td>
                                </tr>
                        </div>
                        <div class="no-data-tips hide">
                          <i class="icon-no-data"></i>
                          <p>真抱歉，没有匹配到院校招生计划</p>
                        </div>
                    </div>
                    <!-- 录取情况 -->
                    <div class="swiper-slide hide">
                          <div class="switch-condition">
                            <span class="title">院校录取信息</span>
                            <div class="right">
                                <span class="type" id="ue-type"></span>
                                <span class="batch" id="ue-batch"></span>
                            </div>
                          </div>
                          <div id="school-enroll-chart"></div>
                          <div class="no-data-tips hide">
                            <i class="icon-no-data"></i>
                            <p>真抱歉，没有匹配到院校录取信息</p>
                          </div>
                        <div class="major-enrolling-info">
                            <div class="major-enrolling-info-opt">
                                <span class="title">专业录取信息</span>
                                <div class="right">
                                    <span id="me-year" class="year"></span>
                                    <span id="me-type" class="type"></span>
                                    <span id="me-batch" class="batch"></span>
                                </div>
                            </div>
                            <div class="major-enrolling-data">
                                <table class="major-enrolling-table" cellpadding="0" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>专业名称</th>
                                            <th>录取数</th>
                                            <th>最高分</th>
                                            <th>最低分</th>
                                            <th>平均分</th>
                                        </tr>
                                    </thead>
                                    <tbody id="major-enroll-table">
                                        <tr>
                                            <td>majorName</td>
                                            <td>realEnrollingNumber</td>
                                            <td>highestScore</td>
                                            <td>lowestScore</td>
                                            <td>averageScore</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>



      <bottom-footer :fix-footer="true"></bottom-footer>
  </div>
</template>

<script>
require('../assets/scss/school-detail.scss')
import topHeader from "../components/Header"
import bottomFooter from "../components/Footer"
import $ from 'webpack-zepto'
export default {
    data() {
        return {
            domActive:false,
            schoolBaseData: {},
            majorData:{},
            active: 0,
            currentView: 'child1',
            tabs: [{
                    type: '院校简介',
                    view: 'child1'
                },
                {
                    type: '开设专业',
                    view: 'child2'
                },
                {
                    type: '招生计划',
                    view: 'child3'
                },
                {
                    type: '录取情况',
                    view: 'child4'
                }
            ]
        }
    },
    methods: {
        //tab切换
        toggle(i, v) {
            this.active = i
            this.currentView = v
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
        },


    },
    mounted() {
        this.getSchoolBaseInfo();
        this.getMajorList();
    },
    components: {
        topHeader,
        bottomFooter,
        'child1': {
            props: ['schoolBaseData'],
            template: `
                  <div class="swiper-slide" id="school-info-li">
                      <div class="school-detail-info">
                        <div>院校类型：{{schoolBaseData.typeName}}</div>
                        <div>学历层次：{{schoolBaseData.levelName}}</div>
                        <div>院校隶属：{{schoolBaseData.subjection}}</div>
                        <div>所在省份：{{schoolBaseData.province}}</div>
                        <div>院校网址：{{schoolBaseData.url}}</div>
                        <div>联系电话：{{schoolBaseData.contactPhone}}</div>
                        <div>院校地址：{{schoolBaseData.address}}</div>
                        <p v-html="schoolBaseData.universityIntro"></p>
                      </div>
                  </div>
                `
        },

        'child2': {
            props: ['majorData'],
            template: `
                      <div class="swiper-slide">
                          <div class="all-major-container">
                              <div class="major-tab-container">
                                  <ul class="major-tab" id="major-tab">
                                    <li data-type="" v-for="(v,k,i) in majorData">{{k}}</li>
                                  </ul>
                              </div>
                              <div class="major-container">
                                  <ul class="specific-major-list" id="major-container" v-for="(v,k,i) in majorData">
                                    <li v-for="(x,y,z) in majorData[k]">{{x.majorName}}</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  `
        },
        'child3': {
            // props: ['myMessage'],
            template: `
                          <p>this is child3</p>
                        `
        },
        'child4': {
            // props: ['myMessage'],
            template: `
                              <p>this is child4</p>
                            `
        },
    }
}
// Vue.component('child4', {
//     template: "<p>this is child4</p>"
// })
</script>

<style lang="scss">
</style>
