<template lang="html">
  <div class="open-professional">
    <ul class="open-professional-tab">
      <li data-type="" v-for="(v,k,i) in majorData">{{k}}</li>
    </ul>
    <ul class="open-professional-content" v-for="(v,k,i) in majorData">
      <li v-for="(x,y,z) in majorData[k]">{{x.majorName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    majorData: {
      type: Object
    }
  }
};
</script>
<style lang="scss">
@import '../../assets/style/common.scss';
.open-professional {
    padding: px2rem(12);
    color: #333;
    font-size: 12px;
    background: #fff;
    margin-bottom: $footerHeight;
    .open-professional-tab {
        margin: 0 auto;
        text-align: center;
        li {
            display: inline-block;
            padding: 0 px2rem(10);
            border-radius: px2rem(3);
            margin-right: px2rem(14);
            border: 1px solid #108EE9;
            color: #108EE9;
        }
        .active {
            background: #108EE9;
            color: #fff;
        }
        li:last-of-type {
            margin-right: 0;
        }
    }
    .open-professional-content {
        overflow: hidden;
        text-align: justify;
        margin-top: px2rem(15);
        font-size: px2rem(14);
        color: #000;
        letter-spacing: 0;
        line-height: px2rem(30);
        li {
            color: #333;
            display: inline-block;
            margin-right: px2rem(20);
        }
    }
}
</style>
