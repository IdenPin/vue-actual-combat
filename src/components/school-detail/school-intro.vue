<template lang="html">
  <div class="school-info-li">
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
</template>

<script>
export default {
  props: {
    schoolBaseData: {
      type: Object,
      default () {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/style/common.scss';
@import "style/school-intro.scss";
</style>
