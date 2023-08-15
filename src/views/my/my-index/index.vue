<template>
  <div class="main">
    <div class="header">
      <img src="@/assets/img/my/touxiang.png" alt="touxiang">
      <div class="name">
        <div class="top"><span v-if="!isLogin" @click="login">点击登录</span><span v-else>{{phone}}</span> </div>
        <div class="center">
          <div class="center-left"><img src="../../../assets/img/yunyuicon.png" alt=""><span>云愈币 {{isLogin ?  yunyu_coins : '***'}}</span></div>
          <div class="center-right" v-if="userId"><span>ID：{{ userId }}</span><img @click="copy(userId)" src="@/assets/img/my/copy.png" alt=""></div>
        </div>
        <div class="under"><span class="round"><span>i</span> </span><span class="last"> <span>云愈币仅可在云愈心理App中消费，暂不支持网页消费</span> </span></div>
      </div>
    </div>
    <div class="content">
      <div class="get-coins">
        <div class="top">签到领云愈币</div>
        <div class="center">
          <div class="blocks" v-for="(item,index) in signInData" :key="index">
            <div class="block-top"><span>{{myDays[index]}}</span></div>
            <div class="block-center"><img v-if="!item.isSignIn" :src="urlData[index]" alt=""> <img v-if="item.isSignIn" src="../../../assets/img/签到后.png" alt=""> </div>
            <div class="block-under"> <span :class="{'ed': item.isSignIn}">+{{item.coin}}</span> </div>
          </div>
        </div>
        <div class="under"><van-button round type="success" :class="{'van-ed': todayIsSignIn}" @click="signCoins">{{todayIsSignIn ? '今天已签到，记得明天来啊' : '签到领云愈币'}}</van-button></div>
      </div>
      <div class="test-records">
        <div class="to-test" @click="jump('/cbt-record')">
          <div class="to-test-left">
            <div class="top">心理疏导记录</div>
            <div class="under">调节情绪 改善心境</div>
          </div>
          <div class="to-test-right">
            <img src="@/assets/img/my/go.png" alt="info">
          </div>
        </div>
        <div class="to-test" @click="jump('/my-record?type=1')">
          <div class="to-test-left">
            <div class="top">量表测试记录</div>
            <div class="under">专业测试 客观评估</div>
          </div>
          <div class="to-test-right">
            <img src="@/assets/img/my/go.png" alt="info">
          </div>
        </div>
      </div>
      <div class="cardList">
        <div class="card" @click="jump('/my-bind')">
          <img src="@/assets/img/my/bind.png" alt="bind">
          <div class="tip">机构绑定</div>
        </div>
        <div class="card" @click="jump('/my-star')">
          <img src="@/assets/img/my/star.png" alt="bind">
          <div class="tip">我的收藏</div>
        </div>
        <div class="card" @click="jump('/my-infos')">
          <img src="@/assets/img/my/info.png" alt="info">
          <div class="tip">个人信息</div>
        </div>
        <div class="card" @click="showKefu = true">
          <img src="@/assets/img/my/kefu.png" alt="kefu">
          <div class="tip">联系客服</div>
        </div>
        <div class="card" @click="skip">
          <img src="@/assets/img/my/app.png" alt="app">
          <div class="tip">下载App</div>
        </div>
      </div>
      <van-button class="login-out" :class="{'invisible ': !isLogin}" @click="loginOut">退出登录</van-button>
      <div class="footer">
        <div class="title">专业的心理服务平台</div>
        <van-row class="con">
          <van-col span="12">
            <icon-font name="#h5-a-zu4974" :width="19" :height="19" color="999"></icon-font>
            量表测试
          </van-col>
          <van-col span="12">
            <icon-font name="#h5-a-zu4975" :width="17" :height="17" color="999"></icon-font>
            心理疏导
          </van-col>
          <van-col span="12">
            <icon-font name="#h5-a-zu4977" :width="20" :height="20" color="999"></icon-font>
            心情记录
          </van-col>
          <van-col span="12">
            <icon-font name="#h5-a-zu4979" :width="19" :height="19" color="999"></icon-font>
            解压游戏
          </van-col>
        </van-row>
      </div>
    </div>
    <div style="height:50px"><MainTabbar></MainTabbar></div>
    <van-dialog v-model="showKefu" :showConfirmButton="false">
      <div class="close" @click="showKefu = false"><img  src="@/assets/img/my/close.png" alt="close"></div>
      <h4>关注公众号</h4>
      <div class="wx"><img  src="@/assets/img/my/account.png" alt="account"></div>
      <h4>联系微信</h4>
      <div class="wx"><img  src="@/assets/img/my/wx.png" alt="wx"></div>
      <h4>客服电话</h4>
      <div class="phone">
        <img  src="@/assets/img/my/phone.png" alt="phone">
        <span @click="phoneClick('0512-6856-5993')">0512-6856-5993</span>
      </div>
    </van-dialog>
    <div class="popout" v-if="showCoins">
    <div class="popout_box">
      <p>恭喜获得{{reward}}云愈币</p>
      <div class="btn">
        <van-button round type="success" @click="refreshshowCoins">明日继续</van-button>
      </div>
    </div>
    </div>
    <NewPersonGift :flag="newPersonFlag" type="main" @reloadCoins="reloadCoins" />
  </div>
</template>

<script>
import { signInFind, signInCreate, newUserReward } from '@/api/modules/user'
import { postLogout } from '@/api/modules/login'
import wxShare from '@/utils/wxShare'
import MainTabbar from '@/components/MainTabbar'
import NewPersonGift from '@/components/newPerson'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      isLogin: false,
      showKefu: false,
      phone: '',
      myDays: ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '第七天'],
      signInData: [
        {
          isSignIn: false,
          coin: 0.2
        },
        {
          isSignIn: false,
          coin: 0.2
        },
        {
          isSignIn: false,
          coin: 0.36
        },
        {
          isSignIn: false,
          coin: 0.2
        },
        {
          isSignIn: false,
          coin: 0.2
        },
        {
          isSignIn: false,
          coin: 0.2
        },
        {
          isSignIn: false,
          coin: 0.56
        }
      ],
      urlData: [
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin1.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin1.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin2.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin1.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin1.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin1.png',
        'https://oss-fubian-yunyu.fubianmed.com/banner/coin2.png'
      ],
      todayIsSignIn: false,
      showCoins: false,
      reward: '',
      yunyu_coins: '',
      userId: '',
      newPersonFlag: false
    }
  },
  components: {
    MainTabbar,
    NewPersonGift
  },
  computed: {
    // 判断多个量表中是否有已经完成的量表
    hasFinish () {
      return (arr) => {
        const flag = arr.some(v => {
          return v.finishedAt !== 0
        })
        return flag
      }
    },
    // 判断多个量表中是否有他评量表
    second () {
      return (arr) => {
        const flag = arr.some(v => {
          return v.table.tableType === 2
        })
        // console.log(flag, this.configTables)
        return flag
      }
    }
  },
  mounted () {
    const phone = localStorage.getItem('phone')
    if (phone) {
      this.phone = phone
      this.isLogin = true
      this.getCoins()
      this.$store.dispatch('getInfo').then(res => {
        this.userId = res.data.userId
        this.yunyu_coins = res.data.yunyu_coins
        if (res.data.isNewUser && !res.data.isRxNUReward) {
          this.newPersonFlag = true
        }
      })
    }
    wxShare.share()
  },
  methods: {
    // 签到
    async getCoins () {
      const res = await signInFind()
      if (res.code === 0) {
        this.todayIsSignIn = res.data.todayIsSignIn
        this.signInData = res.data.signInData
      }
    },
    // 点了新人有礼刷新币
    reloadCoins () {
      // 刷新云愈币
      this.newPersonFlag = false
      newUserReward().then(res => {
        if (res.code === 0) {
          this.publicUse()
        }
      })
    },
    refreshshowCoins () {
      this.showCoins = false
      this.publicUse()
    },
    publicUse () {
      this.$store.dispatch('getInfo').then(res => {
        this.yunyu_coins = res.data.yunyu_coins
      })
    },
    // 签到的逻辑
    signCoins () {
      if (!this.isLogin) {
        this.login()
      } else {
        if (this.todayIsSignIn) {
        } else {
          signInCreate().then(res => {
            if (res.code === 0) {
              this.reward = res.data.reward
              this.showCoins = true
              this.getCoins()
            }
          })
        }
      }
    },
    jump (path) {
      if (this.isLogin) {
        this.$router.push(path)
      } else {
        this.$router.push('/login?url=/my-index')
      }
    },
    login () {
      if (!this.isLogin) {
        this.$router.push({
          path: '/login',
          query: {
            url: this.$route.path
          }
        })
      }
    },
    // 拨打手机号
    phoneClick (phoneNum) {
      window.location.href = 'tel:' + phoneNum
    },
    // 联系客服
    skip () {
      this.$router.push('/my-contact')
    },
    // 退出登录
    loginOut () {
      // 按钮位置调换
      Dialog.confirm({
        message: '是否要退出登录？',
        theme: 'round-button',
        className: 'dialog-confirm',
        confirmButtonText: '取消',
        confirmButtonColor: '#fff',
        cancelButtonText: '确定',
        cancelButtonColor: '#34B7B9'
      }).then(() => {
        console.log('取消')
      }).catch(async () => {
        await postLogout()
        localStorage.removeItem('phone')
        this.$router.push('/login?url=/my-index')
      })
    },
    copy (v) {
      const inputEle = document.createElement('input')
      inputEle.setAttribute('readonly', 'readonly')
      document.body.appendChild(inputEle)
      inputEle.value = v
      inputEle.select()
      document.execCommand('Copy')
      this.$toast('复制成功')
      document.body.removeChild(inputEle)
    }
  }
}
</script>

<style lang="less" scoped>
@w: 37.5;
.main{
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background: #F6F6F7;
  overflow: hidden;
  background: #F6F6F7;
  background-image:url('../../../assets/img/bg.png');
  background-repeat:no-repeat;
  background-size: contain;
  .header{
    height: 2.053333rem;
    display: flex;
    padding: .266667rem  .533333rem;
    padding-right: 0px;
    margin-right: .533333rem;
    box-sizing: border-box;
    img{
      width: 1.6rem;
      height: 1.6rem;
    }
    .name{
      margin-left: .4rem;
      height: 1.6rem;
      flex: 1;
      font-size: .426667rem;
      font-weight: 600;
      color: #333333;
      margin-bottom: .16rem;
      .top{
        height: .5867rem;
        line-height: 22px;
        font-size: 16px;
        margin-bottom: .0541rem;
        span{
          color: #333333;
          font-weight: 500;
        }
      }
      .center{
        height: .4267rem;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        margin-bottom: .16rem;
        .center-left{
          border-radius: .3784rem;
          display: inline-block;
          background: #FFFFFF;
          padding: 1px 4px 1px 2px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          img{
            width: .32rem;
            height: .32rem;
          }
          span{
            font-size: 12px;
            display: inline-block;
            height: .32rem;
            line-height: .32rem;
            scale: 0.83;
            color: #666666;
            font-weight: 500;
            padding-left: .1622rem;
          }
        }
        .center-right{
          display: flex;
          align-items: center;
          span{
            color: #666666;
            margin-right: .1067rem;
            font-size: 12px;
            scale: 0.83;
          }
          img{
            width: .32rem;
            height: .32rem;
          }
        }
      }
      .under{
        height: .3784rem;
        display: flex;
        margin-top: 2px;
        span{
          display: inline-block;
        }
        .round{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #34B7B9;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.83);
          span{
            font-size: 12px;
            transform: scale(0.83);
            color: #FFFFFF;
            text-align: center;
          }
        }
        .last{
          padding-left: 2px;
          position: relative;
          flex: 1;
          span{
            display: block;
            position: absolute;
            top: -1px;
            left: 0;
            width: 300px;
            font-size: 12px;
            color: #333333;
            transform: scale(0.83);
            transform-origin: left top;
            font-weight: 400;
          }
        }
      }
    }
  }
  .content{
    padding: .48rem .533333rem;
    height: inherit;
    overflow: hidden;
    .get-coins{
      position: relative;
      height: 5.7027rem;
      padding: .4324rem .2703rem;
      border-radius: .3243rem;
      background: #7ECECE;
      margin-bottom: .2667rem;
      box-sizing: border-box;
      .top{
        font-size: 14px;
        color: #FFFFFF;
        font-weight: 500;
        margin-bottom: .2703rem;
      }
      .center{
        display: flex;
        justify-content: space-around;
        .blocks{
          width: 1.0811rem;
          height: 2.027rem;
          font-size: 10px;
          border-radius: .2162rem;
          padding: .1622rem .1351rem;
          background: #FFFFFF;
          overflow: hidden;
          box-sizing: border-box;
          .block-top{
            width: 100%;
            display: flex;
            height: .3784rem;
            justify-content: center;
            margin-bottom: .1081rem;
            span{
              display: inline-block;
              font-size: 20px;
              transform: scale(0.5);
              word-break: keep-all;
              color: #666666;
            }
          }
          .block-center{
            text-align: center;
            img{
              width: .8108rem;
              height: .8108rem;
            }
          }
          .block-under{
            height: .3243rem;
            display: flex;
            justify-content: center;
            align-items: top;
            span{
              display: inline-block;
              color: #F19F38;
              font-size: .2703rem;
              transform: scale(0.83);
            }
            .ed{
              color: #999999;
            }
          }
        }
      }
      .under{
        position: absolute;
        bottom: .4865rem;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-ed{
          background: #D5D5D5 !important;
          color: #FFFFFF !important;
        }
        .van-button{
          width: 8.3784rem;
          height: 1.3514rem;
          border: none;
          background: #FFFFFF;
          font-size: 16px;
          color: #333333;
          font-weight: 500;
        }
      }
    }
    .test-records{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rem/@w;
    }
    .to-test{
      margin-right: 11rem/@w;
      flex: 1;
      height: 75rem/@w;
      background: #FFFFFF;
      border-radius: 12rem/@w;
      padding: 16rem/@w 10rem/@w 18rem/@w 20rem/@w;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .to-test-right{
        width: 20rem/@w;
        height: 20rem/@w;
        font-size: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .to-test-left{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top{
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          color: #000;
        }
        .under{
          font-size: 12px;
          line-height: 17px;
          color: #999;
        }
      }
    }
    .to-test:last-child{
      margin-right: 0;
    }
    .cardList{
      height: 2.213333rem;
      background: #FFFFFF;
      border-radius: .266667rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: .8rem;
          height: .8rem;
        }
        .tip{
          font-size: .32rem;
          color: #333333;
        }
      }
    }
  }
  .time{
    font-size: .32rem;
    color: #666;
    span:nth-child(2){
      margin-left: .266667rem;
    }
  }
  .more{
    .moreBox{
      width: 8.4rem;
      background: #FFFFFF;
      border-radius: .266667rem;
      padding: .4rem .266667rem;
      margin-bottom: .266667rem;
      .top{
        font-size: .373333rem;
        color: #333333;
        position: relative;
        .hiddenText {
          overflow: hidden;
          display: block;
        }
        .hiddenText:after {
          z-index: 3;
          content: "...";
          position: absolute;
          bottom: 2px;
          right: 1.28rem;
          width: .533333rem;
          padding-left: .48rem;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.1), #fff 45%);
        }
        .btnMore{
          color: #34B7B9;
          position: absolute;
          right: 0;
          bottom: 0;
          background-color: #fff;
        }
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        .moreTime{
          display: flex;
          flex-direction: column;
          span:nth-child(2){
            margin-left:0;
          }
        }
        .app{
          color: #34B7B9;
          font-size: .32rem;
        }
        .btnBox{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .van-button--info{
            width: 72rem/@w;
            height: 28rem/@w;
            border-radius: 15rem/@w;
            font-size: 12rem/@w;
            padding: 0;
          }
        }
      }
    }
  }
  .van-dialog{
    width: 7.786667rem;
    min-height: 6.48rem;
    background: #FFFFFF;
    border-radius: .533333rem;
    padding: .426667rem;
    .close{
      display: flex;
      justify-content: flex-end;
      img{
        width: .373333rem;
        height: .373333rem;
      }
    }
    h4{
      font-size: .373333rem;
      font-weight: 500;
      color: #333333;
      margin: 0;
      margin-bottom: .266667rem;
      text-align: center;
    }
    .wx{
      display: flex;
      justify-content:center;
      margin-bottom: .2rem;
      img{
        width: 3.2rem;
        height: 3.2rem;
      }
    }
    .phone{
      display: flex;
      justify-content:center;
      align-items: center;
      margin-bottom: .4rem;
      img{
        width: .293333rem;
        height: .293333rem;
      }
      span{
        color: #34B7B9;
        font-size: .373333rem;
        margin-left: 5px;
      }
    }
  }
  .popout{
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .popout_box{
      width: 8.7568rem;
      height: 6.5676rem;
      border-radius: .5405rem;
      background-color: #FFFFFF;
      position: relative;
      p{
        margin-top: 1.7027rem;
        font-size: .4324rem;
        color: #000000;
        font-weight: 600;
        text-align: center;
      }
      .btn{
        position: absolute;
        bottom: 1.0811rem;
        width: 100%;
        text-align: center;
        .van-button{
          border: none;
          background: #34B7B9;
          color: #FFFFFF;
        }
      }
    }
  }
}
.login-out {
  width: 100%;
  height: 1.3514rem;
  margin-top: .2667rem;
  margin-bottom: .2667rem;
  border-radius: 10px;
  font-size: 16px;
  color: #F31313;
}
.invisible {
  visibility: hidden;
}
.footer {
  text-align: center;
  color: #999999;
  font-size: .32rem;
  font-weight: 400;
  .title {
    margin-bottom: .32rem;
    font-size: .3733rem;
    font-weight: 600;
  }
  .iconfont {
    margin-right: 5px;
  }
  .con {
    padding: 0 .8rem;
    .van-col {
      line-height: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style lang="less">
.ceping{
   .van-tabs--line .van-tabs__wrap{
      height: .8rem;
      margin-top: .48rem;
      margin-bottom: .266667rem;
      .van-tabs__nav{
        background: transparent;
      }
      .van-tab{
        font-size: .373333rem;
        font-weight: 600;
        color: #000000;
        margin-right: .8rem;
        flex: inherit;
        padding: 0;
      }
      .van-tabs__line{
        background-color:#34B7B9;
      }
  }
}
</style>
