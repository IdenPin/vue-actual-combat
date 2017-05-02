<template lang="html">
  <div class="rates-forecast">
    <div class="input-wrapper">
      <div class="group">
        <div class="input-name">
          分数
        </div>
        <div class="input-val">
          <input type="text" placeholder="输入总分">
        </div>
      </div>
      <div class="title">科目</div>
      <div class="group">
        <div class="input-name">
          文科
        </div>
        <div class="input-val">
          <i class="icon icon-right"></i>
        </div>
      </div>
      <div class="group">
        <div class="input-name">
          理科
        </div>
        <div class="input-val">
          <!-- <i class="icon icon-right"></i> -->
        </div>
      </div>
      <div class="group margin">
        <div class="input-name">
          选择目标院校
        </div>
        <div class="input-val">
          <div class="text">请选择目标院校</div>
          <i class="icon icon-arrow-right"></i>
        </div>
      </div>
      <div class="group margin">
        <div class="input-name">
          院校招生批次
        </div>
        <div class="input-val">
          <div class="text">请选择批次</div>
          <i class="icon icon-arrow-right"></i>
        </div>
      </div>
      <div class="start-forecast-btn">开始预测</div>
    </div>
    <div class="mask-wrapper" v-if="maskToggle">
      <div class="search-wrapper">
          <div class="search-input">
              <i class="icon icon-search-input"></i>
              <input type="text" placeholder="请输入目标大学名称" class="input-school">
              <i class="icon-close-icon hide" id="clear-input"></i>
          </div>
          <div class="cancel-btn" @click="maskControl">取消</div>
      </div>
      <ul class="school-list">
        <li class="border-image" dataschool="1:北京大学">
          <i class="icon icon-search-input"></i><span class="school-name">北京大学</span>
        </li>
        <li class="border-image" dataschool="2:中国人民大学">
          <i class="icon icon-search-input"></i><span class="school-name">中国人民大学</span>
        </li>
        <li class="border-image" dataschool="3:清华大学">
          <i class="icon icon-search-input"></i><span class="school-name">清华大学</span>
        </li>
        <li class="border-image" dataschool="4:北京交通大学">
          <i class="icon icon-search-input"></i><span class="school-name">北京交通大学</span>
        </li>
        <li class="border-image" dataschool="5:北京工业大学">
          <i class="icon icon-search-input"></i><span class="school-name">北京工业大学</span>
        </li>
      </ul>
    </div>
    <stickyFooter></stickyFooter>
  </div>
</template>

<script>
import stickyFooter from '../sticky-footer/sticky-footer';
export default {
  data() {
    return {
      maskToggle: false
    };
  },
  methods: {
    maskControl() {
      this.maskToggle = !this.maskToggle;
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
