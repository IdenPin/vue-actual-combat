<template lang="html">
  <div class="accept-rate-result">
    <div class="top-wrapper">
      <div class="school-logo">
        <img :src="acceptRateData.img">
      </div>
      <div class="school-info">
        <p>目标院校：{{acceptRateData.universityName}}</p>
        <p>目标批次：{{acceptRateData.batch | batchStr}}</p>
      </div>
    </div>
    <div class="middle-wrapper">
      <div class="subject-score">
        <span>科类：{{params.type | subjectStr}}</span>
        <span>分数：{{acceptRateData.score}}</span>
      </div>
      <div class="title">
        测试结果
      </div>
      <div class="text">
        录取率98%，您报考这所院校十拿九稳，可以选择更高的目标了！
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="title">
        历史数据
      </div>
      <div class="table-list">
        <table class="table">
                <thead>
                    <tr>
                        <th>年份</th>
                        <th>批次</th>
                        <th>录取人数</th>
                        <th>最低分</th>
                        <th>平均分</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(v,index) in acceptRateData.historyList">
                    <td>{{v.year}}</td>
                    <td>{{v.batch}}</td>
                    <td>{{v.enrollingNumber}}</td>
                    <td>{{v.minScore}}</td>
                    <td>{{v.avgScore}}</td>
                  </tr>
                </tbody>
            </table>
      </div>
    </div>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
import $ from 'webpack-zepto';
import store from 'store';

export default {
  data() {
    return {
      params: store.get('acceptRate'),
      percent: {},
      acceptRateData: {}
    };
  },
  mounted() {
    // 录取率
    $.ajax({
      url: 'http://alipaybackend.zhigaokao.cn/predict/predictProbability',
      data: this.params,
      success: (res) => {
        if (res.rtnCode === '0000000') {
          this.acceptRateData = res.bizData;
        };
      }
    });
    // 录取院校信息
    $.ajax({
      url: 'http://alipaybackend.zhigaokao.cn/predict/forecast',
      data: {
        categorie: this.params.type,
        batch: this.params.batch,
        score: this.params.score,
        uid: this.params.userId,
        areaId: this.params.areaId
      },
      success: (res) => {
        if (res.rtnCode === '0000000') {
          this.percent = res.bizData;
        };
      }
    });
    console.info(this.params);
  },
  filters: {
    subjectStr(v) {
      return ['', '文科', '理科'][v];
    },
    batchStr(v) {
      let foo;
      switch (v + '') {
        case '1':
          foo = '本科一批次';
          break;
        case '2':
          foo = '本科二批次';
          break;
        case '3':
          foo = '本科三批次';
          break;
        case '4':
        case '8':
          foo = '高职专科批';
          break;
      }
      return foo;
    }
  },
  components: {
    stickyFooter
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
@import "style/accept-rate-result.scss";
</style>
