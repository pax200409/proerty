<template>
  <div class="not-found">
    <img
      src="../assets/img/404.gif"
      class="full-screen-image"
      alt="404 Not Found"
    />
    <div class="overlay"></div>
    <div class="not-found-content">
      <h1 class="not-found-title">OH~NO!!!</h1>
      <p class="not-found-message">
        很抱歉，你的页面被风吹走啦~~~~快检查是不是网页错啦，或者点击按钮
      </p>
      <el-button type="primary" @click="goBack">返回上一级</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一级页面
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0; /* 去掉默认的边距 */
  padding: 0; /* 去掉默认的内边距 */
  overflow: hidden; /* 禁用滚动条 */
  height: 100%; /* 确保 body 高度为 100% */
  width: 100%; /* 确保 body 宽度为 100% */
}

*,
*::before,
*::after {
  box-sizing: border-box; /* 使用 border-box 计算宽度和高度 */
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 使用视口高度 */
  width: 100vw; /* 使用视口宽度 */
  position: relative;
}

.full-screen-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* 使图片宽度占满整个视口 */
  height: 100%; /* 使图片高度占满整个视口 */
  object-fit: cover; /* 确保图片覆盖整个容器，同时保持比例 */
  z-index: 0; /* 确保图片位于最底层 */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0); /* 半透明白色覆盖层 */
  z-index: 1; /* 确保覆盖层在图片之上 */
}

.not-found-content {
  position: relative; /* 改为相对定位，以便在全屏背景上显示 */
  text-align: center;
  z-index: 2; /* 确保内容在覆盖层之上 */
}

.not-found-title {
  font-size: 6rem;
  color: #ff4757; /* 404颜色 */
  margin: 0;
}

.not-found-message {
  font-size: 1.5rem;
  color: #333;
}

.el-button {
  margin-top: 20px;
}
</style>
