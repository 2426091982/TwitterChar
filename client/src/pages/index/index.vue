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
      <button class="sendBtn" @click="sendMsg">发送</button>
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
    // 判断是否登录 如果没有登录跳转到login
    if (!uni.getStorageSync('nickNmae')) {
      uni.navigateTo({
        url: '../login/index',
      })
    }

    this.nickName = uni.getStorageSync('nickNmae')

    // 连接websocket
    uni.connectSocket({
      url: 'ws://localhost:3000',
      complete: () => {},
    })

    // 连接websocket成功后执行
    uni.onSocketOpen(() => {
      this.socketOpen = true
      // 连接成功后 将消息队列中的消息发送给后端
      for (let i = 0; i < this.socketMsgQueue.length; i++) {
        this.sendSocketMessage(this.socketMsgQueue[i])
      }
      this.socketMsgQueue = []
    })

    // 连接websocket失败后执行
    uni.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！', res)
    })

    // 接受到消息后执行
    uni.onSocketMessage((res) => {
      console.log('收到服务器内容：' + res.data)
      // this.chatMessages.push(JSON.parse(res.data))
    })
  },
  methods: {
    // 发送消息
    sendSocketMessage(msg) {
      // 判断是否在线 在线则发送消息 否则将消息push到消息队列中
      if (this.socketOpen) {
        console.log('msg', msg)
        uni.sendSocketMessage({ data: JSON.stringify(msg) })
      } else {
        this.socketMsgQueue.push(JSON.stringify(msg))
      }
    },

    // 点击发送按钮
    sendMsg() {
      this.sendSocketMessage({
        id: Math.random(),
        time: Date.now(),
        name: this.nickName,
        msg: this.msg,
      })

      this.msg = ''
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

.sendBtn {
  
}
</style>
