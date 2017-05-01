<template lang="html">
  <div class="enrollment-plan">
      <div class="select-plan">
          <div class="item">2015</div>
          <div class="item">文史</div>
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
          <tbody>
              <tr v-for="(v,i) in dataList">
                  <td>{{v.majoredName}}</td>
                  <td>{{v.planEnrolling}}</td>
                  <td>{{v.lengthOfSchooling}}</td>
                  <td>{{v.schoolFee}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import $ from 'webpack-zepto';
export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    getEnrollPlan() {
      $.get('http://s1.service.zhigaokao.cn/university/getUniversityMajorEnrollingPlanList.do?userKey=&universityId=1&year=2015&universityMajorType=1&batch=&offset=0&rows=20', (res) => {
        if (res.rtnCode === '0000000') {
          this.dataList = res.bizData;
        }
      });
    }
  },
  mounted() {
    this.getEnrollPlan();
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
.enrollment-plan {
    background: #fff;
    padding-top: px2rem(10);
    margin-bottom: $footerHeight;
    padding-bottom: px2rem(20);
    .select-plan {
        width: 200px;
        display: flex;
        margin: 0 auto;
        .item {
            flex: 0 0 55px;
            margin: px2rem(5) auto px2rem(15);
            text-align: center;
            font-size: px2rem(10);
            border: 1px solid #108EE9;
            color: $mainColor;
            border-radius: px2rem(3);
            padding: 0 px2rem(10);
        }
    }
    .enroll-plan-table {
        margin: 0 auto;
        border: 1px solid #ecebeb;
        width: 100%;
        font-size: px2rem(12);
        thead {
            background-color: #108EE9;
            th {
                color: #fff;
                padding: 1px 0;
                font-weight: normal;
                &:last-child {
                    border-right: 1px solid #108EE9;
                }
            }
        }
        tr {
            td {
                border: 1px solid #ecebeb;
                text-align: center;
            }
        }
    }
}
</style>
