<template lang="html">
  <div class="accept-rate-result">
    <div class="top-wrapper">
      <div class="school-logo">
        <img src="" alt="">
      </div>
      <div class="school-info">

      </div>
    </div>
    <div class="middle-wrapper">
      <div class="subject-score">
        <span>科类：理科</span>
        <span>分数：690</span>
      </div>
      <div class="title">
        测试结果
      </div>
      <div class="text">
        您报考这所院校十拿九稳，可以选择更高的目标了！
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
                <tbody id="result-table-list"><tr><td>2016</td><td>一批本科</td><td>-</td><td>593</td><td>-</td></tr><tr><td>2015</td><td>一批本科</td><td>1062</td><td>582</td><td>593</td></tr><tr><td>2014</td><td>一批本科</td><td>1134</td><td>599</td><td>609</td></tr></tbody>
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
  components: {
    stickyFooter
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
@import "style/accept-rate-result.scss";
</style>
