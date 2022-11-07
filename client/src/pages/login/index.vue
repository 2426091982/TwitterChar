<template>
  <view class="content">
    <input type="text" placeholder="请输入昵称" v-model="nickName" />
    <button @click="login">登录</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nickName: "",
    };
  },
  onLoad() {
    if (uni.getStorageSync("nickNmae")) {
      uni.navigateTo({
        url: "../index/index",
      });
    }
  },
  methods: {
    login() {
      if (!this.nickName.trim()) return;
      uni.setStorageSync("nickNmae", this.nickName);
      uni.navigateTo({
        url: "../index/index",
      });
    },
  },
};
</script>

<style></style>
