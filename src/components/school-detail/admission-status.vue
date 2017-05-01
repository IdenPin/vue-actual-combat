<template lang="html">
  <div class="admission-status">
    <div class="school-admission">
      <div class="title" style="padding-top:20px;">
        院校录取信息
      </div>
      <div class="chart">
        <IEcharts :option="line" :loading="line.loading" :resizable="true" @ready="onReady" @click="onClick"></IEcharts>
      </div>
    </div>
    <div class="major-admission">
      <div class="title">
        专业录取信息
      </div>
      <div class="">
        <table class="table" cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                  <th>专业名称</th>
                  <th>录取数</th>
                  <th>最高分</th>
                  <th>最低分</th>
                  <th>平均分</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(v,i) in tableList">
                    <td>{{v.majorName}}</td>
                    <td>{{v.realEnrollingNumber}}</td>
                    <td>{{v.maxScore}}</td>
                    <td>{{v.minScore}}</td>
                    <td>{{v.averageScore}}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3';
import $ from 'webpack-zepto';
export default {
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    tableList: [],
    screenWidth: document.body.clientWidth,
    line: {
      loading: true,
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      color: [
        'F6A623', 'EA6264', '49D1E2'
      ],
      legend: {
        top: 'bottom',
        itemGap: 20,
        symbol: 'line',
        selectedMode: true,
        orient: 'horizontal',
        textStyle: {
          color: '#4A4A4A',
          fontSize: 12
        },
        data: ['最低分', '平均分']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '18%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        data: [],
        axisTick: {
          show: false,
          inside: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: '#707070'
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisTick: {
          show: false,
          inside: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 12
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#707070'
          }
        },
        splitLine: {
          show: true
        }
      },
      series: [{
        name: '最低分',
        type: 'line',
        data: [],
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#F6A623',
            width: 2,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            color: '#EA6264',
            borderWidth: 2,
            borderType: 'solid'
          }
        }
      }, {
        name: '平均分',
        type: 'line',
        data: [],
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#F6A623',
            width: 2,
            type: 'solid'
          }
        },
        itemStyle: {
          normal: {
            color: '#EA6264',
            borderWidth: 2,
            borderType: 'solid'
          }
        }
      }]
    }
  }),
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth;
      })();
    };
    this.getSchoolAdmissionData();
    this.getMajorTableList();
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenWidth);
          // that.getSchoolAdmissionData();
          that.timer = false;
        }, 400);
      };
    }
  },
  methods: {
    onReady(instance) {
      // console.log(instance);
    },
    onClick(event, instance, echarts) {
      console.log(arguments);
    },
    getSchoolAdmissionData() {
      const that = this;
      $.get('http://s1.service.zhigaokao.cn/university/queryUniversityEnrollingChart.do?userKey=&universityId=1&majorType=1&batch=1&offset=0', (res) => {
        if (res.rtnCode === '0000000') {
          let dataList = res.bizData;
          this.line.xAxis.data = [];
          this.line.series[0].data = [];
          this.line.series[1].data = [];
          for (let i in dataList) {
            this.line.xAxis.data.unshift(dataList[i].year);
            this.line.series[0].data.unshift(dataList[i].lowestScore);
            this.line.series[1].data.unshift(dataList[i].averageScore);
          }
          that.line.loading = !that.line.loading;
        };
      });
    },
    getMajorTableList() {
      $.get('http://s1.service.zhigaokao.cn/university/getUniversityMajorEnrollingSituationList.do?userKey=&universityId=1&year=2015&batch=1&universityMajorType=1&offset=0&rows=20', (res) => {
        if (res.rtnCode === '0000000') {
          let tableList = res.bizData;
          for (let i in tableList) {
            this.tableList.push(tableList[i]);
          }
        };
      });
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
.admission-status {
    background: #fff;
    margin-bottom: $footerHeight;
    .school-admission {
        .chart,
        .vue-echarts {
            width: 100%;
            height: px2rem(210);
        }
    }
    .title {
        padding: px2rem(10) px2rem(15);
        font-size: px2rem(12);
    }
    .major-admission {
        padding-bottom: px2rem(20);
        .table {
            padding-bottom: px2rem(10);
            border: 1px solid rgba(7,17,17,.1);
            width: 100%;
            font-size: px2rem(12);
            border: 1px solid #ecebeb;
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
}
</style>
