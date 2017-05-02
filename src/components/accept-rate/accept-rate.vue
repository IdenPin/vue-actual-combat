<template lang="html">
  <div class="rates-forecast">
    <div class="input-wrapper">
      <div class="group">
        <div class="input-name">
          分数
        </div>
        <div class="input-val">
          <input type="text" placeholder="输入总分" v-model="submitParams.score">
        </div>
      </div>
      <div class="title">科目</div>
      <div class="group">
        <div class="input-name">
          文科
        </div>
        <div class="input-val" @click="subjectToggle($event)" ref="subjectWen" dataType="1">
          <i class="icon icon-right"></i>
        </div>
      </div>
      <div class="group">
        <div class="input-name">
          理科
        </div>
        <div class="input-val" @click="subjectToggle($event)" ref="subjectLi" dataType="2">
          <i class="icon icon-right dh"></i>
        </div>
      </div>
      <div class="group margin">
        <div class="input-name">
          选择目标院校
        </div>
        <div class="input-val" @click="maskSchoolControl">
          <div class="text">{{submitParams.universityName}}</div>
          <i class="icon icon-arrow-right"></i>
        </div>
      </div>
      <div class="group margin">
        <div class="input-name">
          院校招生批次
        </div>
        <div class="input-val" @click="maskBatchControl">
          <div class="text">{{submitParams.batch | batchFilter}}</div>
          <i class="icon icon-arrow-right"></i>
        </div>
      </div>
      <div class="start-forecast-btn" :class="{'disabled':!isSubmit}" @click="acceptForcasted">开始预测</div>
    </div>
    <div class="mask-wrapper" v-if="maskSchoolToggle">
      <div class="search-wrapper">
          <div class="search-input">
              <i class="icon icon-search-input"></i>
              <input v-if="submitParams.universityName==='请选择目标院校'" type="text" placeholder="请输入目标大学名称" @input="chooseTargetSchool($event)">
              <input v-else type="text" :placeholder="submitParams.universityName" @input="chooseTargetSchool($event)" debounce="5000">
              <i class="icon-close-icon hide" id="clear-input"></i>
          </div>
          <div class="cancel-btn" @click="maskSchoolControl">取消</div>
      </div>
      <ul class="school-list">
        <li v-for="(v,index) in chooseTargetSchoolData" @click="chooseSchool($event)">
          <i class="icon icon-search-input"></i><span class="school-name" :schoolId="index">{{v}}</span>
        </li>
      </ul>
    </div>
    <div class="mask-wrapper" v-if="maskBatchToggle">
      <ul class="school-list">
        <li v-for="(v,index) in chooseTargetBatchData" @click="chooseBatch($event)">
          <span class="batch-name" :dictId="v.dictId">{{v.name}}</span>
        </li>
      </ul>
    </div>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
import $ from 'webpack-zepto';

export default {
  data() {
    return {
      maskSchoolToggle: false,
      maskBatchToggle: false,
      chooseTargetSchoolData: {},
      chooseTargetBatchData: {},
      isSubmit: false,
      submitParams: {
        areaId: 610000,
        userId: 25331,
        type: 1,
        batch: '请选择批次',
        score: '',
        universityName: '请选择目标院校'
      }
    };
  },
  mounted() {
    if (this.submitParams.score !== '') {
      this.isSubmit = true;
    }
  },
  methods: {
    maskSchoolControl() {
      this.maskSchoolToggle = !this.maskSchoolToggle;
    },
    maskBatchControl() {
      this.maskBatchToggle = !this.maskBatchToggle;
    },
    subjectToggle(event) {
      $(event.target).find('i').removeClass('dh').parent().parent().siblings().find('.icon-right').addClass('dh');
      this.submitParams.type = $(event.target).attr('dataType');
    },
    chooseTargetSchool(event) {
      $.ajax({
        url: 'http://alipaybackend.zhigaokao.cn/predict/university',
        data: {
          "name": event.target.value
        },
        success: (res) => {
          if (res.rtnCode === '0000000') {
            this.chooseTargetSchoolData = res.bizData;
          };
        }
      });
    },
    chooseSchool(event) {
      this.submitParams.universityName = event.target.innerText;
      this.chooseTargetBatch(event);
      this.maskSchoolControl();
    },
    chooseTargetBatch(event) {
      $.ajax({
        url: 'http://alipaybackend.zhigaokao.cn/predict/batch',
        data: {
          areaId: this.submitParams.areaId,
          schoolId: $(event.target).attr('schoolid') === null ? $(event.target).find('.school-name').attr('schoolid') : $(event.target).attr('schoolid'),
          majorType: this.submitParams.type
        },
        success: (res) => {
          if (res.rtnCode === '0000000') {
            this.chooseTargetBatchData = res.bizData;
            this.submitParams.batch = res.bizData[0].dictId;
          };
        }
      });
    },
    chooseBatch(event) {
      this.submitParams.batch = $(event.target).attr('dictid') === null ? $(event.target).find('.batch-name').attr('dictid') : $(event.target).attr('dictid');
      this.maskBatchControl();
    },
    acceptForcasted() {

    }
  },
  filters: {
    batchFilter(v) {
      let foo;
      switch (v + '') {
        case '请选择批次':
          foo = v;
          break;
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
@import "style/accept-rate.scss";
</style>
