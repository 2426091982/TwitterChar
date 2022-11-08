<template>
  <view class="content">
    <view class="cahtMessageList">
      <view class="msg" v-for="item in chatMessages" id="item.id">
        <text>{{ item.name }}</text>
        <text>{{ new Date(item.time) }}</text>
        <text>{{ item.msg }}</text>
      </view>
    </view>

    <view class="sendBox">
      <input type="text" placeholder="请输入消息" v-model="msg" />
      <button @click="sendMsg">发送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      nickName: '',
      chatMessages: [],
      socketOpen: false, // 连接状态
      socketMsgQueue: [], // 消息队列
    }
  },
  onLoad() {
    if (!uni.getStorageSync('nickNmae')) {
      uni.navigateTo({
        url: '../login/index',
      })
    }

    this.nickName = uni.getStorageSync('nickNmae')

    // 连接websocket
    let socketTask = uni.connectSocket({
      url: 'ws://localhost:3000',
      complete: () => {},
    })
    socketTask.onMessage((data) => {
      console.log(data)
    })
    // 连接websocket成功后执行
    uni.onSocketOpen((res) => {
      console.log(res)
      uni.sendSocketMessage({
        data: '123123',
      })
    })
    uni.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！', res)
    })
  },
  methods: {
    // 发送消息
    sendSocketMessage(msg) {
      if (this.socketOpen) {
        uni.sendSocketMessage({ data: msg })
      } else {
        this.socketMsgQueue.push(msg)
      }
    },

    // 点击发送按钮
    sendMsg() {
      this.sendSocketMessage({
        id: Date.now(),
        time: Date.now(),
        name: this.nickName,
        msg: this.msg,
      })
    },
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cahtMessageList {
  width: 100vw;
}

.sendBox {
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid #ccc;
}
</style>
