<template lang="html">
  <div class="footer">
    <p class="copy-right">全通教育旗下产品-<a href="/vip.html">智高考</a>提供技术支持</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/style/common.scss";
html {
    position: relative;
    min-height: 100%;
    body {
        margin: 0 0 rem($footerHeight);
        .footer {
            position: absolute;
            left: 0;
            bottom: 0;
            height: $footerHeight;
            line-height: $footerHeight;
            width: 100%;
            .copy-right {
                clear: both;
                text-align: center;
                color: #888;
                font-size: px2rem(10);
                a {
                    color: #108EE9;
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
